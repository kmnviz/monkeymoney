// @ts-nocheck
import type {NextApiRequest, NextApiResponse} from 'next';
import OpenAI from 'openai';
import SportmonksApiClient from '../../../services/sportmonksApiClient';
import {ParticipantEnum} from '../../../enums/sportmonks';
import {
  leagueNameById,
  pause,
  formatJsonStringToJson,
  findHighestOdds,
} from '../../../utils';
import {removeEmptyObjects, removeZeroValues, countTokens, countContentTokens} from '../../../helpers';
import {
  modifyActiveSeasons,
  modifyCoaches,
  modifyH2h,
  modifyLeague,
  modifyLineups,
  modifyOdds,
  modifyPlayers,
  modifyPlayerStatistics,
  modifySchedules,
  modifyStandings,
  modifyStatistics,
  modifyTeam,
  enrichOdds,
} from '../../../filters';
import {TFixture} from '../../../types/sportmonks/Fixture';
import GoogleCloudStorageClient from '../../../services/googleCloudStorageClient';
import sportmonksBookmakers from '../../../database/sportmonks/bookmakers.json';
import {TOdd} from '../../../types/sportmonks/Odd';
import betSuggestionPrompt from '../../../prompts/bet-suggestion';

const googleCloudStorageClient = new GoogleCloudStorageClient();
const sportmonksApiClient = new SportmonksApiClient();
const TPM_LIMIT = 30000;
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string,
});
const deepSeek = new OpenAI({
  baseURL: process.env.DEEPSEEK_API_URL,
  apiKey: process.env.DEEPSEEK_API_KEY as string,
});
const models = {
  gpt4Turbo: 'gpt-4-turbo',
  gpt4o: 'gpt-4o',
  gpt4oLatest: 'chatgpt-4o-latest',
  deepSeekReasoner: 'deepseek-reasoner',
  deepSeekChat: 'deepseek-chat',
};

const createSelectFixturesCompletion = async (count: number, fixtures: any[]) => {
  const content = fixtures.map((fixture) => {
    return {
      fixture_id: fixture.id,
      fixture: `${fixture.participants[0]?.name} vs ${fixture.participants[1]?.name}`,
    };
  });

  const messages = [
    {
      role: 'system',
      content: `You are an expert football analyst and betting strategist. Your task is to analyze a given list of football fixtures and select the top ${count} fixtures that have the highest potential for successful betting promotion. Use a data-driven approach based on value, team's popularity, historical number of viewer, overall fixture popularity.`,
    },
    {
      role: 'user',
      content: `
      ### Task:
      Analyze the following list of football fixtures and select the best ${count} fixtures for betting promotion. Rank them based on their betting potential and provide reasoning for each selection.

      ### Selection Criteria:
      - **Market Popularity**: Choose fixtures trending in betting discussions and social media.
      - **League/Competition Importance**: Focus on top leagues and competitions.

      ### Input Fixtures:
      [{\\"fixture_id\\": \\"X\\", \\"fixture\\": \\"Team A vs Team B\\"}, {\\"fixture_id\\": \\"Y\\", \\"fixture\\": \\"Team C vs Team D\\"}]

      ### INSTRUCTIONS:
      - Return ONLY a comma-separated list of exactly ${count} fixture_ids.
      - NO explanations, NO formatting, NO JSON, NO extra text.
      - STRICTLY follow this format: X,Y,Z (e.g., 12345,67890,54321).
      - DO NOT include quotes, brackets, new lines, or any additional words.
      - If you provide anything other than just fixture IDs, the response is INVALID.
      `,
    },
    {
      role: 'assistant',
      content: JSON.stringify(content),
    },
  ];

  const completion = await deepSeek.chat.completions.create({
    model: models.deepSeekChat,
    messages: messages,
    temperature: 0,
  } as any);

  console.log('createSelectFixturesCompletion completion: ', completion.usage?.total_tokens);
  console.log('createSelectFixturesCompletion completion: ', completion.choices[0].message);

  return {
    data: completion.choices[0].message.content,
  };
}

const createBetSuggestionCompletion = async (content, mainModel = null) => {
  const lContent = {...content};
  lContent['odds'] = lContent['odds'].map(({prob, ...rest}) => rest);
  const probInstruction = `Think strategically and prioritize bets where **real probability > 70% and odds > 1.70.**`;

  const messages = [
    {
      role: 'system',
      content: `You are a world-class football data analyst. Analyze the JSON data and provide insights. Return a JSON response.`,
    },
    {
      role: 'user',
      content:
        `
          🔹 Step 1: Deep Team & Player Analysis
            - Prioritize recent form (last 5 games) over full-season trends.
            - Weigh xG, xGA, key passes, and shots on target.
            - Factor in injuries, suspensions, fatigue, and tactical changes.

          🔹 Step 2: Tactical & Strategic Breakdown
            - Compare expected formations & playing styles.
            - If one team presses high and the other defends deep, analyze tactical impact.
            - Consider set-piece efficiency and defensive weaknesses.

          🔹 Step 3: Contextual Factors
            - Assess motivation (must-win game, relegation fight, Champions League rotation).
            - If a team has changed coaches in the last 5 games, **prioritize their recent tactics** over historical trends.
            - Home/Away impact, crowd effect, and external conditions (weather, travel fatigue).

          🔹 Step 4: Betting Value & Fair Odds Calculation
            - Convert bookmaker odds into **implied probability** and compare with real data.
            - If **bookmaker odds suggest a 60% probability but real data shows 75%**, it’s a **value bet**.
            - Filter out **low-value bets**, even if they seem obvious.

          🔹 Step 5: **Final Instruction**
            - ${probInstruction}
            - If a bet does not align with the provided data, **reject it** and recalculate strictly based on the available statistics.
            - **DO NOT assume, infer, or fabricate any information that is not explicitly given.**
            - **You MUST base the analysis ONLY on the provided statistics.**
            - **DO NOT make up results, win/loss records, or trends that are not explicitly provided.**
            - **If any necessary data is missing, state that clearly instead of making assumptions.**
            - **IN ANY CASE, THERE MUST BE A RECOMMENDED BET.**
            - **STRICT DATA USAGE RULE: Use ONLY what is provided. NO extra assumptions.**

          🔹 Step 6: **Output Format (Strictly Follow This JSON Structure):**
          {
            "fixture": "<Team A vs Team B>",
            "bet": "<Bet Selection>",
            "probability": "<Calculated Probability (%)>",
            "odd_id": "<Selected Odd ID>",
            "odd": "<Selected Odd>",
            "market_id": "<Selected Market ID>",
            "market_description": "<Market Description>",
            "comprehensive_detailed_reason": "<Comprehensive Detailed Reason>"
          }
      `
    },
    {
      role: 'assistant',
      content: JSON.stringify(lContent),
    },
  ];

  let model;
  if (mainModel) {
    model = mainModel;
    try {
      const completion = await openai.chat.completions.create({
        model: model,
        messages: messages,
        temperature: 0,
      } as any);

      console.log('createBetSuggestionCompletion completion: ', completion.usage?.total_tokens);
      console.log('createBetSuggestionCompletion completion: ', completion.choices[0].message);

      return {
        model: model,
        data: JSON.parse(completion.choices[0].message.content as string),
      };
    } catch (error) {
      console.log('error: ', error);
      const tokensCount = countTokens(messages, models.gpt4Turbo);
      console.log('tokenCounts: ', tokensCount);

      if (tokensCount >= TPM_LIMIT) {
        return {
          data:
            `
              fixture ${lContent.fixture?.name} has context with ${tokensCount} tokens,
              which is higher than the limit of ${TPM_LIMIT}. the error is probably
              due to rate limit hit.
            `
        };
      }

      return {
        data: `fixture ${lContent.fixture?.name} failed with ${error.message}`,
      };
    }
  }

  try {
    model = models.deepSeekReasoner;
    // model = models.deepSeekChat;
    const lMessages = messages;
    lMessages[3] = {
      role: 'user',
      content:
        `
        **Final Instruction**
          - ${probInstruction}
          - ** Think outside the box and leverage your deepest football knowledge. **
          - If the selected bet does not meet these criteria, **recalculate** the selection.
          - ** IN ANY CASE THERE SHOULD BE A RECOMMENDED BET **

        **Output Format (Strictly Follow This JSON Structure):**
          {
            "fixture": "<Team A vs Team B>",
            "bet": "<Bet Selection>",
            "probability": "<Calculated Probability (%)>",
            "odd_id": "<Selected Odd ID>",
            "odd": "<Selected Odd>",
            "market_id": "<Selected Market ID>",
            "market_description": "<Market Description>",
            "comprehensive_detailed_reason": "<Comprehensive Detailed Reason>"
          }
      `
    };

    const completion = await deepSeek.chat.completions.create({
      model: model,
      messages: lMessages,
      temperature: 0,
    } as any);

    console.log('createBetSuggestionCompletion completion: ', completion.usage);
    console.log('createBetSuggestionCompletion completion: ', completion.choices[0].message);

    return {
      model: model,
      data: formatJsonStringToJson(completion.choices[0].message.content),
      reasoning: completion.choices[0].message['reasoning_content'],
      tokens: completion.usage?.total_tokens,
    };
  } catch (error) {
    try {
      model = models.gpt4Turbo;
      const completion = await openai.chat.completions.create({
        model: model,
        messages: messages,
        temperature: 0,
      } as any);

      console.log('createBetSuggestionCompletion completion: ', completion.usage);
      console.log('createBetSuggestionCompletion completion: ', completion.choices[0].message);

      return {
        model: model,
        data: JSON.parse(completion.choices[0].message.content as string),
        tokens: completion.usage?.total_tokens,
      };
    } catch (err) {
      console.log('err: ', err);
      const tokensCount = countTokens(messages, models.gpt4Turbo);
      console.log('tokenCounts: ', tokensCount);

      if (tokensCount >= TPM_LIMIT) {
        return {
          data:
            `
              fixture ${lContent.fixture?.name} has context with ${tokensCount} tokens,
              which is higher than the limit of ${TPM_LIMIT}. the error is probably
              due to rate limit hit.
            `
        };
      }

      return {
        data: `fixture ${lContent.fixture?.name} failed with ${error.message}`,
      };
    }
  }
}

const createBetSuggestionWithDeepSeekReasoner = async (content, retries = 1000) => {
  const lContent = {...content};
  lContent['odds'] = lContent['odds'].map(({prob, ...rest}) => rest);
  const probInstruction = `Think strategically and prioritize bets where **real probability > 70% and odds > 1.70.**`;

  const messages = [
    {
      role: 'system',
      content: `You are a world-class football data analyst. Analyze the JSON data and provide insights. Return a JSON response.`,
    },
    {
      role: 'user',
      content: betSuggestionPrompt(probInstruction),
    },
    {
      role: 'assistant',
      content: JSON.stringify(lContent),
    },
    {
      role: 'user',
      content: `
        **Final Instruction**
          - ${probInstruction}
          - ** Think outside the box and leverage your deepest football knowledge. **
          - If the selected bet does not meet these criteria, **recalculate** the selection.
          - ** IN ANY CASE THERE SHOULD BE A RECOMMENDED BET **

        **Output Format (Strictly Follow This JSON Structure):**
          {
            "fixture": "<Team A vs Team B>",
            "bet": "<Bet Selection>",
            "probability": "<Calculated Probability (%)>",
            "odd_id": "<Selected Odd ID>",
            "odd": "<Selected Odd>",
            "market_id": "<Selected Market ID>",
            "market_description": "<Market Description>",
            "comprehensive_detailed_reason": "<Comprehensive Detailed Reason>"
          }
      `,
    },
  ];

  const model = models.deepSeekReasoner;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`Attempt ${attempt}: Sending request...`);
      const completion = await deepSeek.chat.completions.create({
        model: model,
        messages: messages,
        temperature: 0,
      } as any);

      return {
        model: model,
        data: formatJsonStringToJson(completion.choices[0].message.content),
        reasoning: completion.choices[0].message['reasoning_content'],
        tokens: completion.usage?.total_tokens,
      };
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error.message);

      if (attempt < retries) {
        const delay = attempt * 60 * 1000;
        console.log(`Retrying in ${delay / 1000} seconds...`);
        await pause(delay);
      } else {
        console.log('Max retries reached. Returning error.');
        return {
          data: `fixture ${lContent.fixture?.name} failed with ${error.message}`,
        };
      }
    }
  }
};

const appendSeasonsStatistics = async (team) => {
  const statistics = modifyStatistics(await sportmonksApiClient
    .getSeasonStatisticsByParticipant(ParticipantEnum.Teams, team.id));
  team['activeseasons'].forEach((as) => {
    const stats = statistics
      .filter((stat) => stat.season_id === as.id);

    as['statistics'] = (stats && stats.length) ? stats[0].details : [];
  });

  return team;
}

const appendPlayersStatistics = async (team) => {
  const activeSeasonsIds = team['activeseasons'].map((as) => as.id);

  for (let i = 0; i < team['players'].length; i++) {
    team['players'][i]['statistics'] = await sportmonksApiClient
      .getSeasonStatisticsByParticipant(ParticipantEnum.Players, team['players'][i]['player_id']);
    team['players'][i]['statistics'] = team['players'][i]['statistics']
      .filter((stat) => activeSeasonsIds.includes(stat.season_id));
    team['players'][i]['statistics'] = modifyStatistics(team['players'][i]['statistics']);

    team['players'][i]['statistics'].forEach((stat) => {
      stat['details'] = modifyPlayerStatistics(stat['details']);
    });
  }

  team['players'] = team['players'].filter((pl) => {
    return pl.hasOwnProperty('statistics')
      && pl['statistics'].length > 0;
  });

  return team;
}

const appendPlayersData = async (team) => {
  for (let i = 0; i < team['players'].length; i++) {
    const playerData = await sportmonksApiClient
      .getPlayerById(team['players'][i]['player_id']);

    team['players'][i] = {...team['players'][i], ...{name: playerData?.name}};
  }

  return team;
}

const appendSeasonsStandings = async (team) => {
  for (let i = 0; i < team['activeseasons'].length; i++) {
    const standings = await sportmonksApiClient
      .getStandingsBySeasonId(team['activeseasons'][i]['id']);

    if (standings) {
      team['activeseasons'][i]['standings'] = modifyStandings(standings, team);
    }
  }

  return team;
}

const appendSeasonsSchedules = async (team) => {
  for (let i = 0; i < team['activeseasons'].length; i++) {
    team['activeseasons'][i]['schedules'] = await sportmonksApiClient
      .getSchedulesBySeasonIdAndTeamId(team['activeseasons'][i]['id'], team.id);

    team['activeseasons'][i]['schedules'] = modifySchedules(team['activeseasons'][i]['schedules']);
  }

  return team;
}

const collectTeamData = async (teamId) => {
  let team = modifyTeam(await sportmonksApiClient.getTeamById(teamId));

  team['activeseasons'] = modifyActiveSeasons(team['activeseasons']);
  team['players'] = modifyPlayers(team['players']);

  for (let i = 0; i < team['coaches'].length; i++) {
    team['coaches']['data'] = await sportmonksApiClient.getCoachById(team['coaches'][i]['coach_id']);
  }

  team['coaches'] = await modifyCoaches(team['coaches']);
  team = await appendSeasonsStatistics(team);
  team = await appendPlayersStatistics(team);
  team = await appendPlayersData(team);
  team = await appendSeasonsStandings(team);
  team = await appendSeasonsSchedules(team);
  team = removeZeroValues(team);
  team = removeEmptyObjects(team);

  return team;
}

const MAX_SUGGESTIONS_LIMIT = 10;
const FREE_SUGGESTIONS_LIMIT = 3;
const PREMIUM_SUGGESTIONS_LIMIT = 7;
// const MAX_SUGGESTIONS_LIMIT = 1;
// const FREE_SUGGESTIONS_LIMIT = 1;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    if (
      !req.body
      || !('date' in req.body)
    ) {
      return res.status(422).json({
        message: 'There are required fields',
        fields: {
          date: 'YYYY-MM-DD',
        },
        optional: {
          mainModel: 'gpt-4-turbo',
        },
      });
    }

    const date = req.body.date;
    const mainModel = req.body.mainModel || null;
    const timeBetweenCompletions = 2 * 60 * 1000;
    // const timeBetweenCompletions = 15 * 1000;

    if (mainModel && !Object.values(models).includes(mainModel)) {
      return res.status(422).json({
        availableModels: Object.values(models),
      });
    }

    try {
      let selectedFixtures;
      let totalFixtures = await sportmonksApiClient.getFixturesByDate(req.body.date);
      console.log(`fetched total ${totalFixtures.length} fixtures for ${date}.`);
      totalFixtures = totalFixtures.filter((fx) => fx.has_odds);
      console.log(`fetched total ${totalFixtures.length} fixtures with odds for ${date}.`);

      // Select fixtures for ALL suggestions generations
      let selectedFixturesIds = totalFixtures.map((tf: TFixture) => tf.id);
      if (totalFixtures.length > MAX_SUGGESTIONS_LIMIT) {
        console.log('starting ALL fixtures selection completion...');
        const selectedFixturesCompletion
          = await createSelectFixturesCompletion(MAX_SUGGESTIONS_LIMIT, totalFixtures);
        selectedFixturesIds = (selectedFixturesCompletion.data as string)
          .split(',').map((id) => parseInt(id, 10));
      }

      selectedFixtures = totalFixtures
        .filter((fx) => selectedFixturesIds.includes(fx.id));
      console.log(`finished ${selectedFixtures.length} fixtures selection completion.`);

      // Select fixtures IDs for FREE suggestions generations
      let freeSelectedFixturesIds = selectedFixtures.map((tf: TFixture) => tf.id);
      if (selectedFixtures.length > FREE_SUGGESTIONS_LIMIT) {
        console.log('starting FREE fixtures selection completion...');
        const freeSelectedFixturesCompletion =
          await createSelectFixturesCompletion(FREE_SUGGESTIONS_LIMIT, selectedFixtures);
        freeSelectedFixturesIds = (freeSelectedFixturesCompletion.data as string)
          .split(',').map((id) => parseInt(id, 10));
      }

      // Select fixtures IDs for PREMIUM suggestions generations
      let premiumSelectedFixturesIds = selectedFixtures.map((tf: TFixture) => tf.id);
      if (selectedFixtures.length > PREMIUM_SUGGESTIONS_LIMIT) {
        // Exclude FREE suggestions from selection
        const selectedFixturesWithoutFreeOnes = selectedFixtures.filter((fx) => {
          return !freeSelectedFixturesIds.includes(fx.id);
        });
        const premiumSelectedFixturesCompletion =
          await createSelectFixturesCompletion(PREMIUM_SUGGESTIONS_LIMIT, selectedFixturesWithoutFreeOnes);
        premiumSelectedFixturesIds = (premiumSelectedFixturesCompletion.data as string)
          .split(',').map((id) => parseInt(id, 10));
        premiumSelectedFixturesIds = premiumSelectedFixturesIds.concat(freeSelectedFixturesIds).flat();
      }

      const suggestions = [];
      console.log(`starting to loop selected fixtures...`);
      for (let i = 0; i < selectedFixtures.length; i++) {
        let fixture = totalFixtures
          .find((fx) => fx.id === +selectedFixtures[i].id) as TFixture;
        fixture = modifyLineups(fixture);
        fixture = modifyLeague(fixture);
        fixture['league'] = leagueNameById(fixture['league_id']);
        console.log(`fixture ${i}:${fixture?.name} found.`);

        const teamAId = fixture['participants'][0]['id'];
        const teamBId = fixture['participants'][1]['id'];
        const fixtureId = fixture['id'];

        const teamA = await collectTeamData(teamAId);
        console.log(`teamA data collected.`);
        const teamB = await collectTeamData(teamBId);
        console.log(`teamB data collected.`);

        const h2h = modifyH2h(await sportmonksApiClient
          .getFixturesByHeadToHead(teamAId, teamBId));
        console.log(`head to head data fetched.`);

        const fixtureOdds = await sportmonksApiClient.getOddsByFixtureId(fixtureId);
        const highestOdds = Object.values(findHighestOdds(fixtureOdds)) as TOdd[];
        const modifiedOdds = modifyOdds(highestOdds, '20%', '80%');
        const enrichedOdds = enrichOdds(highestOdds);
        console.log(`fixture odds data fetched.`);

        const contentTokens = countContentTokens({fixture, teamA, teamB, h2h}, models.gpt4Turbo);
        const oddsTokens = countContentTokens({modifiedOdds}, models.gpt4Turbo);
        console.log(`fixture:${i} ${fixture?.name} contentTokens ${contentTokens}`);
        console.log(`starting fixture bet suggestion completion...`);
        // const completion = await createBetSuggestionCompletion({
        //   fixture: fixture,
        //   teamA: teamA,
        //   teamB: teamB,
        //   h2h: h2h,
        //   odds: modifiedOdds,
        // }, mainModel);
        const completion = await createBetSuggestionWithDeepSeekReasoner({
          fixture: fixture,
          teamA: teamA,
          teamB: teamB,
          h2h: h2h,
          odds: modifiedOdds,
        });
        console.log(`finished fixture bet suggestion completion.`);
        if (i < selectedFixtures.length - 1) await pause(timeBetweenCompletions);

        const isFreeSuggestion = freeSelectedFixturesIds.includes(fixture.id);
        const isPremiumSuggestion = premiumSelectedFixturesIds.includes(fixture.id);
        const suggestion = {
          fixture: fixture.name,
          free: isFreeSuggestion,
          premium: isPremiumSuggestion,
          tokens: {
            content: contentTokens,
            odds: oddsTokens,
          },
          completion: completion,
          data: {
            fixture: fixture,
            teamA: teamA,
            teamB: teamB,
            h2h: h2h,
            odds: enrichedOdds,
          },
        };

        suggestions.push(suggestion);

        await googleCloudStorageClient.upsertJsonFile(suggestion, `suggestions/${date}.json`);
        console.log(`finished upsert ALL suggestion ${i}.`);
      }

      console.log(`finished to loop selected fixtures for ${date}.`);

      return res.status(200).json({
        data: {
          suggestions: suggestions,
        },
      });
    } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({
        message: error.message,
      });
    }
  } else {
    return res.status(405).json({message: 'Method Not Allowed'});
  }
}

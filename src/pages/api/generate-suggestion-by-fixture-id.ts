// @ts-nocheck
import type {NextApiRequest, NextApiResponse} from 'next';
import OpenAI from 'openai';
import SportmonksApiClient from '../../services/sportmonksApiClient';
import {ParticipantEnum} from '../../enums/sportmonks';
import {
  leagueNameById,
  formatJsonStringToJson,
  pause,
} from '../../utils';
import sportmonksBookmakers from '../../database/sportmonks/bookmakers.json';
import betSuggestionPrompt from '../../prompts/bet-suggestion';
import {removeEmptyObjects, removeZeroValues} from '../../helpers';
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
} from '../../filters';

const sportmonksApiClient = new SportmonksApiClient();
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
            "bet": "<Detailed Bet Selection>",
            "probability": "<Calculated Probability (%)>",
            "odd_id": "<Selected Odd ID>",
            "odd": "<Selected Odd>",
            "market_id": "<Selected Market ID>",
            "market_description": "<Brief Explanation of the Market>",
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
          data: `fixture ${lContent.fixture.name} failed with ${error.message}`,
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

    team['players'][i] = {...team['players'][i], ...{name: playerData.name}};
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
  team['coaches'] = modifyCoaches(team['coaches']);

  team = await appendSeasonsStatistics(team);
  team = await appendPlayersStatistics(team);
  team = await appendPlayersData(team);
  team = await appendSeasonsStandings(team);
  team = await appendSeasonsSchedules(team);
  team = removeZeroValues(team);
  team = removeEmptyObjects(team);

  return team;
}

const findAlternativeBookmakerOdds = async (fixture, bookmakerId, enoughOdds = 200) => {
  console.log(`fixture ${fixture.name} has no odds within main bookmaker:${bookmakerId} odds.`);

  let alternativeOdds, alternativeBookmakerId;
  for (let i = 0 ; i < sportmonksBookmakers.length; i++) {
    console.log(`fixture ${fixture.name} check for odds within bookmaker:${sportmonksBookmakers[i].id}.`);
    if (sportmonksBookmakers[i].id === bookmakerId) continue;

    const lAlternativeOdds = await sportmonksApiClient
      .getOddsByFixtureIdAndBookmakerId(fixture.id, sportmonksBookmakers[i].id);

    if (i === 0) {
      alternativeOdds = lAlternativeOdds;
      alternativeBookmakerId = sportmonksBookmakers[i].id;
      if (alternativeOdds && alternativeOdds.length) {
        console.log(`fixture ${fixture.name} found ${alternativeOdds.length} odds within alternative bookmaker:${sportmonksBookmakers[i].id}.`);
      }
    } else {
      if (lAlternativeOdds && lAlternativeOdds.length > 0) {
        if (!alternativeOdds) {
          alternativeOdds = lAlternativeOdds;
          console.log(`fixture ${fixture.name} found ${alternativeOdds.length} odds within alternative bookmaker:${sportmonksBookmakers[i].id}.`);
        } else if (lAlternativeOdds.length > alternativeOdds.length) {
          alternativeOdds = lAlternativeOdds;
          console.log(`fixture ${fixture.name} found ${alternativeOdds.length} odds within alternative bookmaker:${sportmonksBookmakers[i].id}.`);
        }
      }
    }

    if (alternativeOdds && alternativeOdds.length >= enoughOdds) break;
  }

  return {
    odds: alternativeOdds,
    bookmakerId: alternativeBookmakerId,
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    if (
      !req.body
      || !('fixtureId' in req.body)
      || !('bookmakerId' in req.body)
    ) {
      return res.status(422).json({
        message: 'There are required fields',
        fields: {
          fixtureId: 'X',
          bookmakerId: 'X',
        },
        optional: {
          mainModel: 'gpt-4-turbo',
        },
      });
    }

    const fixtureId = +req.body.fixtureId;
    let bookmakerId = +req.body.bookmakerId;
    const mainModel = req.body.mainModel || null;

    if (mainModel && !Object.values(models).includes(mainModel)) {
      return res.status(422).json({
        availableModels: Object.values(models),
      });
    }

    try {
      let fixture = await sportmonksApiClient.getFixtureById(fixtureId, 'participants;scores;statistics');

      fixture = modifyLineups(fixture);
      fixture = modifyLeague(fixture);
      fixture['league'] = leagueNameById(fixture['league_id']);
      console.log(`fixture ${fixture.name} found.`);

      const teamAId = fixture['participants'][0]['id'];
      const teamBId = fixture['participants'][1]['id'];

      const teamA = await collectTeamData(teamAId);
      console.log(`teamA data collected.`);
      const teamB = await collectTeamData(teamBId);
      console.log(`teamB data collected.`);

      const h2h = modifyH2h(await sportmonksApiClient
        .getFixturesByHeadToHead(teamAId, teamBId));
      console.log(`head to head data fetched.`);

      let fixtureOdds = await sportmonksApiClient
        .getOddsByFixtureIdAndBookmakerId(fixtureId, bookmakerId);

      if (!fixtureOdds || fixtureOdds?.length < 10) {
        const allFixtureOdds = await sportmonksApiClient.getOddsByFixtureId(fixtureId);
        if (!allFixtureOdds) {
          console.log(`fixture ${fixture.name} has no odds.`);
          return res.status(400).json({
            message: 'Fixture has no odd within any bookmaker',
            fixture: fixture,
          });
        }

        const alternativeBookmakerOdds = await findAlternativeBookmakerOdds(fixture, bookmakerId);
        if (alternativeBookmakerOdds.odds && alternativeBookmakerOdds.odds?.length > 0) {
          fixtureOdds = alternativeBookmakerOdds.odds;
          bookmakerId = alternativeBookmakerOdds.bookmakerId;
        } else {
          return res.status(400).json({
            message: 'Fixture has no odd within any bookmaker',
            fixture: fixture,
          });
        }
      }

      const odds = modifyOdds(fixtureOdds, '20%', '80%');
      console.log(`fixture odds data fetched.`);

      console.log(`starting fixture bet suggestion completion...`);
      const completionParams = {
        fixture: fixture,
        teamA: teamA,
        teamB: teamB,
        h2h: h2h,
        odds: odds,
      };
      const completion = await createBetSuggestionWithDeepSeekReasoner(completionParams);
      console.log(`finished fixture bet suggestion completion.`);

      const suggestion = {
        fixture: fixture.name,
        completion: completion,
        bookmakerId: bookmakerId,
        data: {
          fixture: fixture,
          teamA: teamA,
          teamB: teamB,
          h2h: h2h,
          odds: odds,
        },
      };

      console.log('suggestion: ', suggestion);
      return res.status(200).json({
        data: {
          suggestion: suggestion,
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

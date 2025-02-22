// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import SportmonksApiClient from '../../services/sportmonksApiClient';
import { ParticipantEnum } from '../../enums/sportmonks';
import { pause } from '../../utils';
import {
  filterTeams,
  filterOdds,
  filterStatistics,
} from '../../filters';
import { TFixture } from '../../types/sportmonks/Fixture';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string,
});

type TSelectedFixture = {
  fixture_id: string,
  fixture: string,
  score: number,
  reason: string,
};

const createSelectFixturesCompletion = async (count: number, fixtures: any[]): Promise<TSelectedFixture[]> => {
  const content = fixtures.map((fixture) => {
    return {
      fixture_id: fixture.id,
      fixture: `${fixture.participants[0].name} vs ${fixture.participants[1].name}`,
    };
  });
  const wrappingKey = 'selected_fixtures';

  const messages = [
    {
      role: "system",
      // content: `You are an expert football analyst and betting strategist. Your task is to analyze a given list of football fixtures and select the top ${count} fixtures that have the highest potential for successful betting promotion. Use a data-driven approach based on team form, odds value, historical performance, and market popularity.`,
      content: `You are an expert football analyst and betting strategist. Your task is to analyze a given list of football fixtures and select the top ${count} fixtures that have the highest potential for successful betting promotion. Use a data-driven approach based on value, team's popularity, historical number of viewer, overall fixture popularity.`,
    },
    {
      role: "user",
      content: `
      ### Task:
      Analyze the following list of football fixtures and select the best ${count} fixtures for betting promotion. Rank them based on their betting potential and provide reasoning for each selection.

      ### Selection Criteria:
      - **Market Popularity**: Choose fixtures trending in betting discussions and social media.
      - **League/Competition Importance**: Focus on top leagues and competitions.

      ### Input Fixtures:
      [{\\"fixture_id\\": \\"X\\", \\"fixture\\": \\"Team A vs Team B\\"}, {\\"fixture_id\\": \\"Y\\", \\"fixture\\": \\"Team C vs Team D\\"}]

      ### Expected Output Format:
      A structured JSON response containing the top X selected fixtures **with wrapping key "${wrappingKey}"**:
      [
        {
          \\"fixture_id\\": \\"X\\",
          \\"fixture\\": \\"Team A vs Team B\\",
          \\"score\\": 92,
          \\"reason\\": \\"Fixture between Team A and Team B has high popularity, rich history of head to head matches, historically millions of viewers.\\"
        },
        {
          \\"fixture_id\\": \\"Y\\",
          \\"fixture\\": \\"Team C vs Team D\\",
          \\"score\\": 88,
          \\"reason\\": \\"Fixture between Team A and Team B has high popularity, rich history of head to head matches, historically millions of viewers.\\"
        }
      ]

      Select and rank the best fixtures based on the criteria.`,
    },
    {
      role: "assistant",
      content: JSON.stringify(content),
    },
  ];

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: messages,
    response_format: { type: 'json_object' },
    temperature: 0,
  } as any);

  return (JSON.parse(completion.choices[0].message.content as string))?.selected_fixtures ?? [];
}

const createBetSuggestionCompletion = async (content: object, probabilityFrom: string = '0%', oddFrom: string = '0.00', temperature: number = 0) => {
  // Remove probabilities from the content to avoid bias
  const lContent = { ...content };
  lContent['odds'] = lContent['odds'].map(({ probability, ...rest }) => rest);

  const messages = [
    {
      role: 'system',
      content:  `
        You are an AI specialized in sports betting analysis. Your task is to provide a single betting prediction with the highest risk-reward-probability ratio based strictly on the provided content.

        The provided content contains:
        - A **list of odds** with corresponding betting markets.
        - **Statistics for both teams** involved in the match.
        - **Historical performance, recent form, head-to-head records, goal statistics, and other key metrics.**

        **Key Constraints for the Prediction:**
        - The **suggested odd MUST be at least ${oddFrom}** (odds below ${oddFrom} are invalid and must be discarded).
        - The **probability of the selected outcome MUST be at least ${probabilityFrom}**.
        - The probability must be **calculated based on the provided statistics** and **not assumed arbitrarily**.

        **How to Process the Provided Content:**
        1. **Analyze the list of odds** and their corresponding betting markets.
        2. **Evaluate the statistical data** for both teams, focusing on form, scoring trends, defensive strength, injuries, and any other relevant factors.
        3. **Select the best betting option** that meets the probability and odds criteria while ensuring a high-value prediction.
        4. **Calculate the probability of the selected bet** using a data-driven approach.
        5. **Ensure consistency**: If a previous prediction for the same match was made, do not contradict it.

        **Output Format (Strictly Follow This JSON Structure):**
        {
          "bet": "<Bet Selection>",
          "probability": "<Calculated Probability (%)>",
          "odd": "<Selected Odd>",
          "market_description": "<Brief Explanation of the Market>",
          "reasoning": "<Justification based on the provided statistics>"
        }

        **⚠️ CRITICAL RULES for the Prediction:**
        - The **selected odd MUST be at least ${oddFrom}**. **(Predictions with odds below ${oddFrom} are INVALID and must be rejected immediately.)**
        - The **probability of success MUST be at least ${probabilityFrom}**.
        - The **probability MUST be calculated** based on the provided statistics, NOT assumed.
        - The prediction **MUST be based on available data**—DO NOT make assumptions.
        - The bet **MUST be the Bet Selection of the bet**.

        **Validation Rules (Must Be Enforced Before Returning a Prediction):**
        - If no valid bet meets the criteria (**odd >= ${oddFrom} and probability >= ${probabilityFrom}**), return:
          {
            "error": "No valid prediction available based on the provided data."
          }
        - Do not speculate. All conclusions must be drawn from the provided statistics.
        - Ensure that the reasoning includes **key statistics** that justify the probability and odd selection.
      `
    },
    {
      role: "user",
      content: `Provide a betting prediction for the upcoming match between the participants.`,
    },
    {
      role: "assistant",
      content: JSON.stringify(lContent),
    },
  ];

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: messages,
    response_format: { type: 'json_object' },
    temperature: temperature,
  } as any);

  return JSON.parse(completion.choices[0].message.content as string);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    if (
      !req.body
      || !('date' in req.body)
      || !('bookmakerId' in req.body)
      || !('suggestionsCount' in req.body)
      || !('probabilityFrom' in req.body)
      || !('oddFrom' in req.body)
    ) {
      return res.status(422).json({
        message: 'There are required fields',
        fields: {
          date: 'YYYY-MM-DD',
          bookmakerId: 'X',
          suggestionsCount: 'X',
          probabilityFrom: 'X%',
          oddFrom: 'X.XX',
        },
      });
    }

    try {
      const sportmonksApiClient = new SportmonksApiClient();
      const totalFixtures = await sportmonksApiClient.getFixturesByDate(req.body.date);
      console.log(`fetched ${totalFixtures.length} fixtures.`);

      console.log('starting fixtures selection completion...');
      const selectedFixtures = await createSelectFixturesCompletion(req.body.suggestionsCount, totalFixtures);
      if (!selectedFixtures || !selectedFixtures.length) {
        return res.status(400).json({
          message: `There are no selected fixtures`,
          data: {
            fixtures: totalFixtures,
          },
        });
      }
      console.log('finished fixtures selection completion.');

      const fixtures = totalFixtures.filter((fixture: TFixture) => {
        return selectedFixtures.map((sf: TSelectedFixture) => sf.fixture_id).includes(fixture.id.toString());
      });
      console.log(`filtered ${fixtures.length} fixtures.`);

      const temperature: number = Number.isFinite(+req.body?.temperature)
        ? +req.body.temperature
        : 0;
      for (let i = 0; i < fixtures.length; i++) {
        if (fixtures[i].participants.length === 2) {
          fixtures[i].participants = filterTeams(fixtures[i].participants);

          fixtures[i].participants[0]['statistics'] = await sportmonksApiClient
            .getSeasonStatisticsByParticipant(ParticipantEnum.Teams, fixtures[i].participants[0].id);
          fixtures[i].participants[1]['statistics'] = await sportmonksApiClient
            .getSeasonStatisticsByParticipant(ParticipantEnum.Teams, fixtures[i].participants[1].id);

          fixtures[i].participants[0]['statistics'] =
            filterStatistics(fixtures[i].participants[0]['statistics'], fixtures[i].season_id);
          fixtures[i].participants[1]['statistics'] =
            filterStatistics(fixtures[i].participants[1]['statistics'], fixtures[i].season_id);

          fixtures[i]['head_to_head'] = await sportmonksApiClient
            .getFixturesByHeadToHead(fixtures[i].participants[0].id, fixtures[i].participants[1].id);

          console.log(`fetched fixture ${i} participants statistics...`);
          // await pause(1500);

          fixtures[i]['odds'] = await sportmonksApiClient.getOddsByFixtureIdAndBookmakerId(fixtures[i].id, req.body.bookmakerId);
          fixtures[i]['odds'] = filterOdds(fixtures[i]['odds'], req.body.probabilityFrom);
          console.log(`fetched fixture ${i} odds...`);

          console.log(`starting bet suggestion completion...`);
          fixtures[i]['completion'] = await createBetSuggestionCompletion(fixtures[i], req.body.probabilityFrom, req.body.oddFrom, temperature);
          console.log(`finished bet suggestion completion.`);

          // await pause(1500);
        }
      }
      console.log(`enrich fixtures finished.`);

      return res.status(200).json({
        data: {
          total_fixtures_count: totalFixtures.length,
          fixtures_count: fixtures.length,
          completions: fixtures.map((fixture) => {
            return {
              name: fixture.name,
              completion: fixture['completion'],
            };
          }),
          fixtures: fixtures.map(({ completion, ...rest }: Omit<TFixture, any>) => {
            return rest;
          }),
        },
      });
    } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({
        message: error.message,
      });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

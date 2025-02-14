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

const createCompletion = async (content: object) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY as string,
  });

  const messages = [
    {
      role: "system",
      content: "You are an AI specialized in sports betting analysis. Your task is to provide a single betting prediction with the highest risk-reward-probability ratio, ensuring that the probability is at least 80%. Your response must be formatted as JSON.\n" +
        "\n" +
        "**Requirements for predictions:**\n" +
        "- Ensure consistency: If a previous prediction for the same match was made, do not contradict it.\n" +
        "- Base predictions on statistical analysis, recent player and team performances, and historical trends.\n" +
        "- Avoid speculation or contradicting outcomes for the same match.\n" +
        "- Use real-world probability estimates grounded in verifiable data.\n" +
        "\n" +
        "**Response Format (JSON):**\n" +
        "```json\n" +
        "{\n" +
        "  \"prediction\": \"<bet_type>\",  \n" +
        "  \"probability\": \"<percentage>\",  \n" +
        "  \"odd\": \"<odd>\",  \n" +
        "  \"reasoning\": \"<detailed reasoning including team and player performance, recent form, head-to-head records, and other key statistics>\"\n" +
        "}",
    },
    {
      role: "user",
      content: `Provide a betting prediction for the upcoming match between the participants.`,
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

  return JSON.parse(completion.choices[0].message.content as string);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    if (
      !req.body
      || !('date' in req.body)
      || !('bookmakerId' in req.body)
      || !('probability' in req.body)
    ) {
      return res.status(422).json({
        message: 'There are required fields',
        fields: {
          date: 'YYYY-MM-DD',
          bookmakerId: 'X',
          probability: 'XX.XX'
        },
      });
    }

    try {
      const sportmonksApiClient = new SportmonksApiClient();
      const fixtures = await sportmonksApiClient.getFixturesByDate(req.body.date);
      console.log(`fetched ${fixtures.length} fixtures...`);
      // for (let i = 0; i < fixtures.length; i++) {
      for (let i = 0; i < 1; i++) {
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

          console.log(`fetched fixture ${i} participants statistics...`);
          await pause(1500);

          fixtures[i]['odds'] = await sportmonksApiClient.getOddsByFixtureIdAndBookmakerId(fixtures[i].id, req.body.bookmakerId);
          fixtures[i]['odds'] = filterOdds(fixtures[i]['odds'], req.body.probability);

          console.log(`fetched fixture ${i} odds...`);
          await pause(1500);
        }
      }
      console.log(`enrich fixtures finished.`);

      console.log(`starting chat completion...`);
      const completion = await createCompletion(fixtures[0]);
      console.log(`finished chat completion.`);

      return res.status(200).json({
        data: {
          // count: fixtures.length,
          // fixtures: fixtures,
          fixtures: [fixtures[0]],
          completion: completion,
          // count_odds: fixtures[0]['odds'].length,
          // counts: {
          //   odds: fixtures[0]['odds'].length,
          //   team_a_stats: fixtures[0].participants[0]['statistics'].length,
          //   team_b_stats: fixtures[0].participants[1]['statistics'].length,
          // },
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

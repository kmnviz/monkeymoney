// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import SportmonksApiClient from '../../services/sportmonksApiClient';
import { TFixture } from '../../types/sportmonks/Fixture';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string,
});

const generateMatchRecap = async (fixtureData: any) => {
  const messages = [
    {
      role: 'system',
      content: `You are a professional sports journalist. Your task is to write a concise and engaging match recap based on the provided data. Include key moments like goals and final result.`
    },
    {
      role: 'user',
      content: `Match Recap Task:
      - Home team: ${fixtureData.home_team}
      - Away team: ${fixtureData.away_team}
      - Scores: ${fixtureData.scores}
      - Match Summary: ${fixtureData.summary}

      Write a short, professional recap of the match. Strictly max 3 sentences.`
    }
  ];

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: messages,
    response_format: { type: 'text' },
    temperature: 0.7,
  } as any);

  return completion.choices[0].message.content;
}

const state_finished = 5;
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    if (
      !req.body
      || !('fixtureId' in req.body)
    ) {
      return res.status(422).json({
        message: 'There are required fields',
        fields: {
          fixtureId: 'X',
        },
      });
    }

    try {
      const sportmonksApiClient = new SportmonksApiClient();
      const fixture: TFixture = await sportmonksApiClient.getFixtureById(req.body.fixtureId);

      if (!fixture || fixture.state_id !== state_finished) {
        return res.status(404).json({ message: 'Fixture not found or not completed yet.' });
      }

      const matchDetails = {
        home_team: fixture.participants[0],
        away_team: fixture.participants[1],
        scores: fixture.scores,
        summary: fixture.result_info || 'No detailed match summary available.',
      };

      const recap = await generateMatchRecap(matchDetails);

      return res.status(200).json({
        data: {
          fixture_id: fixture.id,
          recap: recap,
        }
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

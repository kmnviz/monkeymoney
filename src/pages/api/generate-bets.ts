// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next';
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';
import SportmonksApiClient from '../../services/sportmonksApiClient';
import { ParticipantEnum } from '../../enums/sportmonks';
import { pause } from '../../utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    if (
      !req.body
      || !('date' in req.body)
      || !('bookmakerId' in req.body)
    ) {
      return res.status(422).json({
        message: 'date and bookmakerId are required (YYYY-MM-DD format)'
      });
    }
    const sportmonksApiClient = new SportmonksApiClient();
    const fixtures = await sportmonksApiClient.getFixturesByDate(req.body.date);
    console.log(`fetched ${fixtures.length} fixtures...`);
    // for (let i = 0; i < fixtures.length; i++) {
    for (let i = 0; i < 1; i++) {
      if (fixtures[i].participants.length === 2) {
        fixtures[i].participants[0]['statistics'] = await sportmonksApiClient
          .getSeasonStatisticsByParticipant(ParticipantEnum.Teams, fixtures[i].participants[0].id);
        fixtures[i].participants[1]['statistics'] = await sportmonksApiClient
          .getSeasonStatisticsByParticipant(ParticipantEnum.Teams, fixtures[i].participants[1].id);
        console.log(`fetched fixture ${i} participants statistics...`);
        await pause(1500);

        fixtures[i]['odds'] = await sportmonksApiClient.getOddsByFixtureIdAndBookmakerId(fixtures[i].id, req.body.bookmakerId);
        console.log(`fetched fixture ${i} odds...`);
        await pause(1500);
      }
    }
    console.log(`enrich fixtures finished.`);

    return res.status(200).json({
      data: {
        count: fixtures.length,
        fixtures: fixtures,
      },
    });
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

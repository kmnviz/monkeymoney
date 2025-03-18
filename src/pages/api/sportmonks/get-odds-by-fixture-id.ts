// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next';
import SportmonksApiClient from '../../../services/sportmonksApiClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
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
      const fixtureId = +req.body.fixtureId;
      const sportmonksApiClient = new SportmonksApiClient();
      const odds = await sportmonksApiClient.getOddsByFixtureId(fixtureId);
      console.log('odds: ', odds);
      return res.status(200).json({
        data: {
          count: odds.length,
          odds: odds,
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

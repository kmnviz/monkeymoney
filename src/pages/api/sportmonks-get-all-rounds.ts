// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next';
import SportmonksApiClient from '../../services/sportmonksApiClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const sportmonksApiClient = new SportmonksApiClient();
      const rounds = await sportmonksApiClient.getAllRounds();
      return res.status(200).json({
        data: {
          count: rounds.length,
          rounds: rounds,
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

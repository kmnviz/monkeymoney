// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next';
import SportmonksApiClient from '../../services/sportmonksApiClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const sportmonksApiClient = new SportmonksApiClient();
    const bookmakers = await sportmonksApiClient.getAllBookmakers();
    return res.status(200).json({
      data: {
        count: bookmakers.length,
        bookmakers: bookmakers,
      },
    });
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

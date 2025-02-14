// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next';
import SportmonksApiClient from '../../services/sportmonksApiClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const sportmonksApiClient = new SportmonksApiClient();
    const types = await sportmonksApiClient.getAllTypes();
    return res.status(200).json({
      data: {
        count: types.length,
        types: types,
      },
    });
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

// @ts-nocheck
import type {NextApiRequest, NextApiResponse} from 'next';
import WebflowService from '../../../services/webflowService';

const webflowService = new WebflowService();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      return res.status(200).json({
        data: {
          collections: await webflowService.collectionsList(),
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

// @ts-nocheck
import type {NextApiRequest, NextApiResponse} from 'next';
import WebflowService from '../../../services/webflowService';

const webflowService = new WebflowService();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    if (
      !req.body
      || !('collectionId' in req.body)
    ) {
      return res.status(422).json({
        message: 'There are required fields',
        fields: {
          collectionId: '67dfcb0b6d470ef8671570d9',
        },
      });
    }

    try {
      const collectionId = req.body.collectionId;
      return res.status(200).json({
        data: {
          items: await webflowService.collectionsItemsListItemsLive(collectionId),
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

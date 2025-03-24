// @ts-nocheck
import type {NextApiRequest, NextApiResponse} from 'next';
import FixtureService from '../../services/fixtureService';
import OddsService from '../../services/oddsService';

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
      const fixtureId = +req.body.fixtureId;
      const fixtureService = new FixtureService();
      const oddsService = new OddsService();

      const fixtureData = await fixtureService.collectData(fixtureId);
      const oddsData = await oddsService.collectData(fixtureId);

      return res.status(200).json({
        data: {
          fixture: fixtureData,
          odds: oddsData,
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

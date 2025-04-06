// @ts-nocheck
import type {NextApiRequest, NextApiResponse} from 'next';
import Decimal from 'decimal.js';
import OddsService from '../../../services/oddsService';

const oddsService = new OddsService();

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
        optional: {
          marketsIds: [0],
          bookmakersIds: [0],
          totals: ['2.5']
        },
      });
    }

    const fixtureId = +req.body.fixtureId;
    const marketsIds = req.body?.marketsIds || [];
    const bookmakersIds = req.body?.bookmakersIds || [];
    const totals = req.body?.totals || [];

    try {
      const odds = await oddsService.fixtureGroupedOdds(fixtureId, marketsIds, bookmakersIds, totals);
      return res.status(200).json({
        odds: odds,
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

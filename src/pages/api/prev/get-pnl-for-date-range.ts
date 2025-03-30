// @ts-nocheck
import type {NextApiRequest, NextApiResponse} from 'next';
import Decimal from 'decimal.js';
import GoogleCloudStorageClient from '../../../services/googleCloudStorageClient';
import {getDatesInRange} from '../../../utils';

const googleCloudStorageClient = new GoogleCloudStorageClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    if (
      !req.body
      || !('dateFrom' in req.body)
      || !('dateTo' in req.body)
    ) {
      return res.status(422).json({
        message: 'There are required fields',
        fields: {
          dateFrom: 'XXXX.XX.XX',
          dateTo: 'XXXX.XX.XX',
        },
      });
    }

    const dateFrom = req.body.dateFrom;
    const dateTo = req.body.dateTo;
    try {
      const dates = getDatesInRange(dateFrom, dateTo);
      console.log('dates: ', dates);
      const result = {
        free: {
          pnl: new Decimal(0),
          guessed: 0,
          total: 0,
        },
        premium: {
          pnl: new Decimal(0),
          guessed: 0,
          total: 0,
        },
        total: {
          pnl: new Decimal(0),
          guessed: 0,
          total: 0,
        },
      }

      for (let i = 0; i < dates.length; i++) {
        const date = dates[i];

        const dailyRecaps = (await googleCloudStorageClient.readJsonFile(`recaps/${date}.json`) as object[]);
        if (!dailyRecaps) {
          return res.status(404).json({
            message: `${date} recaps not found`,
          });
        }
        const freeRecaps = dailyRecaps.filter((r) => r.suggestion.free);
        const premiumRecaps = dailyRecaps.filter((r) => r.suggestion.premium);

        const allGuessed = dailyRecaps.filter((r) => r.result.is_guessed === 'YES');
        const freeGuessed = dailyRecaps.filter((r) => r.result.is_guessed === 'YES' && r.suggestion.free);
        const premiumGuessed = dailyRecaps.filter((r) => r.result.is_guessed === 'YES' && r.suggestion.premium);

        let winTotal = new Decimal(0);
        for (let i = 0; i < allGuessed.length; i++)
          winTotal = winTotal.plus(new Decimal(allGuessed[i].suggestion.odd));
        const pnlTotal = winTotal.minus(new Decimal(dailyRecaps.length)).toFixed(3);

        let winFree = new Decimal(0);
        for (let i = 0; i < freeGuessed.length; i++)
          winFree = winFree.plus(new Decimal(freeGuessed[i].suggestion.odd));
        const pnlFree = winFree.minus(new Decimal(freeRecaps.length)).toFixed(3);

        let winPremium = new Decimal(0);
        for (let i = 0; i < premiumGuessed.length; i++)
          winPremium = winPremium.plus(new Decimal(premiumGuessed[i].suggestion.odd));
        const pnlPremium = winPremium.minus(new Decimal(premiumRecaps.length)).toFixed(3);

        result.total.guessed += allGuessed.length;
        result.total.total += dailyRecaps.length;
        result.total.pnl = result.total.pnl.plus(pnlTotal);

        result.free.guessed += freeGuessed.length;
        result.free.total += freeRecaps.length;
        result.free.pnl = result.free.pnl.plus(pnlFree);

        result.premium.guessed += premiumGuessed.length;
        result.premium.total += premiumRecaps.length;
        result.premium.pnl = result.premium.pnl.plus(pnlPremium);
      }

      return res.status(200).json({
        data: result,
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

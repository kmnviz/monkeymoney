// @ts-nocheck
import type {NextApiRequest, NextApiResponse} from 'next';
import Decimal from 'decimal.js';
import GoogleCloudStorageClient from '../../../services/googleCloudStorageClient';

const googleCloudStorageClient = new GoogleCloudStorageClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    if (
      !req.body
      || !('date' in req.body)
    ) {
      return res.status(422).json({
        message: 'There are required fields',
        fields: {
          date: 'XXXX.XX.XX',
        },
      });
    }

    const date = req.body.date;
    try {
      const allRecaps = (await googleCloudStorageClient.readJsonFile(`recaps/stats/${date}.json`) as object[]);
      if (!allRecaps) {
        return res.status(404).json({
          message: `${date} recaps not found`,
        });
      }
      const freeRecaps = allRecaps.filter((r) => r.plan === 'free');
      const premiumRecaps = allRecaps.filter((r) => r.plan === 'premium');

      const allGuessed = allRecaps.filter((r) => r.is_guessed === 'YES');
      const freeGuessed = allRecaps.filter((r) => r.is_guessed === 'YES' && r.plan === 'free');
      const premiumGuessed = allRecaps.filter((r) => r.is_guessed === 'YES' && r.plan === 'premium');

      let winTotal = new Decimal(0);
      for (let i = 0; i < allGuessed.length; i++)
        winTotal = winTotal.plus(new Decimal(allGuessed[i].suggestion.odd));
      const pnlTotal = winTotal.minus(new Decimal(allRecaps.length)).toFixed(3);

      let winFree = new Decimal(0);
      for (let i = 0; i < freeGuessed.length; i++)
        winFree = winFree.plus(new Decimal(freeGuessed[i].suggestion.odd));
      const pnlFree = winFree.minus(new Decimal(freeRecaps.length)).toFixed(3);

      let winPremium = new Decimal(0);
      for (let i = 0; i < premiumGuessed.length; i++)
        winPremium = winPremium.plus(new Decimal(premiumGuessed[i].suggestion.odd));
      const pnlPremium = winPremium.minus(new Decimal(premiumRecaps.length)).toFixed(3);

      return res.status(200).json({
        data: {
          free: {
            count: `${freeGuessed.length}/${freeRecaps.length}`,
            pnl: pnlFree,
          },
          premium: {
            count: `${premiumGuessed.length}/${premiumRecaps.length}`,
            pnl: pnlPremium,
          },
          total: {
            count: `${allGuessed.length}/${allRecaps.length}`,
            pnl: pnlTotal,
          },
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

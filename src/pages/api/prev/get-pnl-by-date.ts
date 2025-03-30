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
      const recapTotal = (await googleCloudStorageClient.readJsonFile(`recaps/${date}.json`) as object[]);
      if (!recapTotal) {
        return res.status(404).json({
          message: `${date} recap not found`,
        });
      }
      const recapFree = recapTotal.filter((r) => r.suggestion.free);
      const recapPremium = recapTotal.filter((r) => r.suggestion.premium);

      const guessedTotal = recapTotal.filter((r) => r.result.is_guessed === 'YES');
      const guessedFree = recapTotal.filter((r) => r.result.is_guessed === 'YES' && r.suggestion.free);
      const guessedPremium = recapTotal.filter((r) => r.result.is_guessed === 'YES' && r.suggestion.premium);

      let winTotal = new Decimal(0);
      for (let i = 0; i < guessedTotal.length; i++)
        winTotal = winTotal.plus(new Decimal(guessedTotal[i].suggestion.odd));
      const pnlTotal = winTotal.minus(new Decimal(recapTotal.length)).toFixed(3);

      let winFree = new Decimal(0);
      for (let i = 0; i < guessedFree.length; i++)
        winFree = winFree.plus(new Decimal(guessedFree[i].suggestion.odd));
      const pnlFree = winFree.minus(new Decimal(recapFree.length)).toFixed(3);

      let winPremium = new Decimal(0);
      for (let i = 0; i < guessedPremium.length; i++)
        winPremium = winPremium.plus(new Decimal(guessedPremium[i].suggestion.odd));
      const pnlPremium = winPremium.minus(new Decimal(recapPremium.length)).toFixed(3);

      return res.status(200).json({
        data: {
          free: {
            count: `${guessedFree.length}/${recapFree.length}`,
            pnl: pnlFree,
          },
          premium: {
            count: `${guessedPremium.length}/${recapPremium.length}`,
            pnl: pnlPremium,
          },
          total: {
            count: `${guessedTotal.length}/${recapTotal.length}`,
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

// @ts-nocheck
import type {NextApiRequest, NextApiResponse} from 'next';
import Decimal from 'decimal.js';
import GoogleCloudStorageClient from '../../services/googleCloudStorageClient';

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

      const allGuessed = allRecaps.filter((r) => r.is_guessed === 'YES');

      let winTotal = new Decimal(0);
      for (let i = 0; i < allGuessed.length; i++)
        winTotal = winTotal.plus(new Decimal(allGuessed[i].suggestion.odd));
      const pnlTotal = winTotal.minus(new Decimal(allRecaps.length)).toFixed(3);

      const result = {
        date: date,
        data: {
          total: {
            count: `${allGuessed.length}/${allRecaps.length}`,
            pnl: pnlTotal,
          },
          suggestions: allRecaps.map((r) => {
            return {
              fixture: r.fixture,
              bet: `${r.suggestion.bet} - ${r.suggestion.market_description}`,
              odd: r.suggestion.odd,
              is_guessed: r.is_guessed,
            };
          })
        },
      };

      return res.status(200).json(result);
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

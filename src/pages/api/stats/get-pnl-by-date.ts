// @ts-nocheck
import type {NextApiRequest, NextApiResponse} from 'next';
import Decimal from 'decimal.js';
import GoogleCloudStorageClient from '../../../services/googleCloudStorageClient';
import TelegramBotClient from '../../../services/telegramBotClient';
import SportmonksClient from '../../../services/sportmonksApiClient';
import {groupByNestedKey, marketNameById} from '../../../utils';

const googleCloudStorageClient = new GoogleCloudStorageClient();
const telegramBotClient = new TelegramBotClient();
const sportmonksApiClient = new SportmonksClient();

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
        optional: {
          post: false,
        },
      });
    }

    const date = req.body.date;
    const post = req.body.post;
    try {
      const allRecaps = (await googleCloudStorageClient.readJsonFile(`recaps/stats/${date}.json`) as object[]);
      if (!allRecaps) {
        return res.status(404).json({
          message: `${date} recaps not found`,
        });
      }

      const allGuessed = allRecaps.filter((r) => r.is_guessed === 'YES');
      const allRecapsGroupedByMarket = groupByNestedKey(allRecaps, 'suggestion.market_id');
      const allGuessedGroupedByMarket = groupByNestedKey(allGuessed, 'suggestion.market_id');

      let winTotal = new Decimal(0);
      for (let i = 0; i < allGuessed.length; i++)
        winTotal = winTotal.plus(new Decimal(allGuessed[i].suggestion.odd));
      const pnlTotal = winTotal.minus(new Decimal(allRecaps.length)).toFixed(3);

      const pnlByMarket = {};
      Object.keys(allGuessedGroupedByMarket).map((key) => {
        let pnl = new Decimal(0);
        allGuessedGroupedByMarket[key].forEach((r) => {
          pnl = pnl.plus(new Decimal(r.suggestion.odd));
        });

        const market = +key ? marketNameById(+key) : key.toString();
        pnlByMarket[market] = pnl.minus(new Decimal(allRecapsGroupedByMarket[key].length)).toFixed(2);
      });

      const result = {
        type: 'Statistics',
        date: date,
        data: {
          count: `${allGuessed.length}/${allRecaps.length}`,
          pnl: pnlTotal,
          by_market: Object.keys(allRecapsGroupedByMarket).map((key) => {
            const market = +key ? marketNameById(+key) : key.toString();
            const total = `${allGuessedGroupedByMarket[key] ? allGuessedGroupedByMarket[key]?.length : 0}/${allRecapsGroupedByMarket[key]?.length}`;
            const pnl = pnlByMarket[market] || `-${new Decimal(allRecapsGroupedByMarket[key]?.length).toFixed(2)}`;

            return `${market} - ${total} | PnL: ${new Decimal(pnl).gt(0) ? `+${pnl}` : pnl})`;
          }),
        },
      };

      if (post) await telegramBotClient.sendMessageToProjectMars(JSON.stringify(result, null, 2));

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

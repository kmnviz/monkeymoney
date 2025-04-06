// @ts-nocheck
import type {NextApiRequest, NextApiResponse} from 'next';
import Decimal from 'decimal.js';
import GoogleCloudStorageClient from '../../../services/googleCloudStorageClient';
import {marketNameById, groupByNestedKey} from '../../../utils';

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
        optional: {
          showSuggestions: false,
        },
      });
    }

    const date = req.body.date;
    const showSuggestions = req.body.showSuggestions;
    try {
      const suggestions = (await googleCloudStorageClient.readJsonFile(`suggestions/stats/${date}.json`) as object[]);
      const groupedByMarket = groupByNestedKey(suggestions, 'completion.data.market_id');

      let totalTokens = new Decimal(0);
      suggestions.forEach((s) => {
        totalTokens = totalTokens.plus(new Decimal(s.tokens.total));
      });

      const result = {
        date: date,
        count: `${suggestions.length}`,
        by_market: Object.keys(groupedByMarket).map((key) => {
          return {[marketNameById(+key)]: groupedByMarket[key].length};
        }),
        tokens: totalTokens,
      };

      if (showSuggestions) result['suggestions'] = suggestions.map((s) => {
        return {
          fixture: `${s.completion.data.fixture} - ${s.fixture.id}`,
          bet: s.completion.data.bet,
          odd: s.completion.data.odd,
          bookmaker: s.odds.find((o) => o.id === +s.completion.data.odd_id)?.bookmaker,
        }
      });

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

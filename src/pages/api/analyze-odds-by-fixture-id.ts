// @ts-nocheck
import type {NextApiRequest, NextApiResponse} from 'next';
import Decimal from 'decimal.js';
import SportmonksApiClient from '../../services/sportmonksApiClient';
import {findHighestOdds, findLowestOdds, bookmakerNameById} from '../../utils';

const sportmonksApiClient = new SportmonksApiClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    if (
      !req.body
      || !('fixtureId' in req.body)
    ) {
      return res.status(422).json({
        message: 'There are required fields',
        fields: {
          fixtureId: '',
        },
      });
    }

    const fixtureId = +req.body.fixtureId;
    try {
      const allOdds = await sportmonksApiClient.getOddsByFixtureId(fixtureId);
      const highestOdds = findHighestOdds(allOdds);
      const lowestOdds = findLowestOdds(allOdds);
      const oddsMargins = [];
      Object.keys(highestOdds).forEach((key) => {
        const value = new Decimal(highestOdds[key]['value']);
        const margin = value.minus(new Decimal(lowestOdds[key]['value']));
        oddsMargins.push({
          key: key,
          margin: margin.toFixed(3),
          bookmaker_h: {
            id: highestOdds[key]['bookmaker_id'],
            name: bookmakerNameById(highestOdds[key]['bookmaker_id']),
            value: highestOdds[key]['value'],
          },
          bookmaker_l: {
            id: lowestOdds[key]['bookmaker_id'],
            name: bookmakerNameById(lowestOdds[key]['bookmaker_id']),
            value: lowestOdds[key]['value'],
          },
        });
      });

      return res.status(200).json({
        data: {
          oddsMargins: oddsMargins
            .filter((odd) => odd.margin !== '0.000'),
          // highestOdds: highestOdds,
          // lowestOdds: lowestOdds,
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

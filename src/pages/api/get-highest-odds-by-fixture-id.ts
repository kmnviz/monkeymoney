// @ts-nocheck
import type {NextApiRequest, NextApiResponse} from 'next';
import SportmonksApiClient from '../../services/sportmonksApiClient';
import sportmonksMarkets from '../../database/sportmonks/markets.json';
import {findHighestOdds, findLowestOdds} from '../../utils';

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
      const marketsIds = sportmonksMarkets.map((market) => market.id);
      const allOdds = await sportmonksApiClient.getOddsByFixtureId(fixtureId);

      return res.status(200).json({
        data: {
          marketsIds: marketsIds,
          highestOdds: findHighestOdds(allOdds),
          lowestOdds: findLowestOdds(allOdds),
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

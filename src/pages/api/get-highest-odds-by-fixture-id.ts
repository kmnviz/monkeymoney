// @ts-nocheck
import type {NextApiRequest, NextApiResponse} from 'next';
import Decimal from 'decimal.js';
import SportmonksApiClient from '../../services/sportmonksApiClient';
import sportmonksMarkets from '../../database/sportmonks/markets.json';

const sportmonksApiClient = new SportmonksApiClient();

const keepLowestAndHighest = (data) => {
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            const values = data[key].map(item => new Decimal(item.value));
            const lowest = values.reduce((min, current) => current.lt(min) ? current : min, values[0]);
            const highest = values.reduce((max, current) => current.gt(max) ? current : max, values[0]);
            
            data[key] = [
                { value: lowest.toString() },
                { value: highest.toString() }
            ];
        }
    }
}

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

	    const groupedOdds = allOdds.reduce((acc, obj) => {
    const key = `market_id:${obj.market_id || "null"}-label:${obj.label || "null"}-total:${obj.total || "null"}-handicap:${obj.handicap || "null"}-name:${obj.name || "null"}`;
	    // const highestAndLowestOdds = findHighestAndLowest(groupedOdds[3]);

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(obj);
    return acc;
  }, {});

            return res.status(200).json({
                data: {
                    marketsIds: marketsIds,
		    groupedOdds: Object.values(groupedOdds).slice(0, 10),
		    lowestAndHighest: keepLowestAndHighest(groupedOdds),
		    // highestAndLowestOdds: highestAndLowestOdds,
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

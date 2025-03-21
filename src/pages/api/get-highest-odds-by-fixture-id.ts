// @ts-nocheck
import type {NextApiRequest, NextApiResponse} from 'next';
import Decimal from 'decimal.js';
import SportmonksApiClient from '../../services/sportmonksApiClient';
import sportmonksMarkets from '../../database/sportmonks/markets.json';

const sportmonksApiClient = new SportmonksApiClient();

const akeepLowestAndHighest = (data) => {
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

const bkeepLowestAndHighest = (data) => {
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            const values = data[key].map(item => new Decimal(item.value));

            // Find the lowest and highest values
            const lowest = values.reduce((min, current) => current.lt(min) ? current : min, values[0]);
            const highest = values.reduce((max, current) => current.gt(max) ? current : max, values[0]);

            // Filter to include only the objects with lowest and highest values
            data[key] = [
                { value: lowest.toString() },
                { value: highest.toString() }
            ];
        }
    }
}

const ckeepLowestAndHighest = (data) => {
    return data.map(array => {
        // Convert values to Decimal for accurate comparison
        const values = array.map(item => new Decimal(item.value));

        // Find the lowest and highest values
        const lowest = values.reduce((min, current) => current.lt(min) ? current : min, values[0]);
        const highest = values.reduce((max, current) => current.gt(max) ? current : max, values[0]);

        // Filter and keep the objects with the lowest and highest values
        return array.filter(item =>
            new Decimal(item.value).equals(lowest) || new Decimal(item.value).equals(highest)
        );
    });
}

const dkeepLowestAndHighest = (data) => {
    return data.map(array => {
        // Ensure we are working with an array
        if (Array.isArray(array)) {
            if (array.length === 1) {
                // If there's only one object, keep it as is
                return array;
            } else if (array.length === 2) {
                // If there are exactly two objects, compare their values
                const values = array.map(item => new Decimal(item.value));
                const lowest = values.reduce((min, current) => current.lt(min) ? current : min, values[0]);
                const highest = values.reduce((max, current) => current.gt(max) ? current : max, values[0]);

                // If the lowest and highest values are the same, return only one of them
                if (lowest.equals(highest)) {
                    return [array.find(item => new Decimal(item.value).equals(lowest))];
                } else {
                    // Otherwise, return the lowest and highest objects
                    return array.filter(item => new Decimal(item.value).equals(lowest) || new Decimal(item.value).equals(highest));
                }
            }
        }
        return array; // If it's not an array, return the element as it is
    });
}

const keepLowestAndHighest = (data) => {
    const result = {};

    for (const marketKey in data) {
        const marketData = data[marketKey];

        if (Array.isArray(marketData)) {
            if (marketData.length === 1) {
                result[marketKey] = marketData; // Keep as is if there's only one object
            } else if (marketData.length === 2) {
                // If exactly two objects, compare values
                const values = marketData.map(item => new Decimal(item.value));
                const lowest = values.reduce((min, current) => current.lt(min) ? current : min, values[0]);
                const highest = values.reduce((max, current) => current.gt(max) ? current : max, values[0]);

                // If the lowest and highest values are the same, return only one object
                if (lowest.equals(highest)) {
                    result[marketKey] = [marketData.find(item => new Decimal(item.value).equals(lowest))];
                } else {
                    // Otherwise, keep only the lowest and highest objects
                    result[marketKey] = marketData.filter(item => new Decimal(item.value).equals(lowest) || new Decimal(item.value).equals(highest));
                }
            }
        }
    }

    return result;
}

const findHighestOdds = (data) => {
    const result = {};

    for (const marketKey in data) {
        const marketData = data[marketKey];

        if (Array.isArray(marketData)) {
            if (marketData.length > 0) {
                const highest = marketData.reduce((max, current) => {
                    return new Decimal(current.value).gt(new Decimal(max.value)) ? current : max;
                });

                result[marketKey] = [highest];
            }
        }
    }

    return result;
};

const findLowestOdds = (data) => {
    const result = {};

    for (const marketKey in data) {
        const marketData = data[marketKey];

        if (Array.isArray(marketData)) {
            if (marketData.length > 0) {
                const lowest = marketData.reduce((min, current) => {
                    return new Decimal(current.value).lt(new Decimal(min.value)) ? current : min;
                });

                result[marketKey] = [lowest];
            }
        }
    }

    return result;
};

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
		    groupedOdds: groupedOdds,
		    // lowestAndHighest: keepLowestAndHighest(groupedOdds),
		    // highestAndLowestOdds: highestAndLowestOdds,
		    highestOdds: findHighestOdds(groupedOdds),
		    lowestOdds: findLowestOdds(groupedOdds),
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

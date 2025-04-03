import Decimal from 'decimal.js';
import SportmonksApiClient from '../services/sportmonksApiClient';
import {TOdd} from '../types/sportmonks/Odd';
import sportmonksMarkets from '../database/sportmonks/markets.json';
import {countContentTokens} from '../helpers';
import {bookmakerNameById} from "../utils";

const sportmonksApiClient = new SportmonksApiClient();

const groupOdds = (allOdds) => {
  return allOdds.reduce((acc, obj) => {
    const key = `market_id:${obj.market_id || ':'}-label:${obj.label || ':'}-total:${obj.total || ':'}-handicap:${obj.handicap || ':'}-name:${obj.name || ':'}`;

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(obj);
    return acc;
  }, {});
};

const findHighestOdds = (allOdds) => {
  const groupedOdds = groupOdds(allOdds);
  const result = {};

  for (const marketKey in groupedOdds) {
    const marketData = groupedOdds[marketKey];

    if (Array.isArray(marketData)) {
      if (marketData.length > 0) {
        result[marketKey] = marketData.reduce((max, current) => {
          return new Decimal(current.value).gt(new Decimal(max.value)) ? current : max;
        });
      }
    }
  }

  return result;
};

const findLowestOdds = (allOdds) => {
  const groupedOdds = groupOdds(allOdds);
  const result = {};

  for (const marketKey in groupedOdds) {
    const marketData = groupedOdds[marketKey];

    if (Array.isArray(marketData)) {
      if (marketData.length > 0) {
        result[marketKey] = marketData.reduce((min, current) => {
          return new Decimal(current.value).lt(new Decimal(min.value)) ? current : min;
        });
      }
    }
  }

  return result;
};

const formatOdds = (odds: TOdd[], minProbability = '0%', maxProbability = '100%') => {
  const markets = sportmonksMarkets;
  const marketsIds = markets.map((m) => m.id);

  return odds
    .filter((odd) => marketsIds.includes(odd.market_id))
    .map((odd) => {
      const newOdd = {
        id: odd.id,
        label: odd.label,
        market: odd.market_description,
        prob: odd.probability,
        odd: odd.dp3,
        market_id: odd.market_id,
      };

      if (odd.handicap) newOdd['handicap'] = odd.handicap;
      if (odd.total) newOdd['total'] = odd.total;
      if (odd.name) newOdd['name'] = odd.name;

      return newOdd;
    })
    .filter((odd) => {
      const prob = odd.prob
        .replace('%', '');

      return Decimal(prob).gt(minProbability.replace('%', ''));
    })
    .filter((odd) => {
      const prob = odd.prob
        .replace('%', '');

      return Decimal(prob).lt(maxProbability.replace('%', ''));
    });
}

const withBookmakerName = (odds: TOdd[]) => {
  return odds.map((o) => {
    return {
      ...o,
      bookmaker: bookmakerNameById(o.bookmaker_id),
    };
  });
};

class OddsService {

  async collectData(fixtureId: number) {
    const allOdds = await sportmonksApiClient.getOddsByFixtureId(fixtureId);
    const highestOdds = Object.values(findHighestOdds(allOdds)) as TOdd[];
    // const lowestOdds = Object.values(findLowestOdds(allOdds)) as TOdd[];

    // const formattedAll = formatOdds(allOdds, '20%', '80%');
    const formattedHighest = formatOdds(highestOdds, '20%', '80%');
    // const formattedLowest = formatOdds(lowestOdds, '20%', '80%');

    return {
      // all: {
      //   tokens: countContentTokens(formattedAll, 'gpt-4-turbo'),
      //   data: formattedAll,
      // },
      // highest: {
      //   tokens: countContentTokens(formattedHighest, 'gpt-4-turbo'),
      //   data: formattedHighest,
      // },
      // lowest: {
      //   tokens: countContentTokens(formattedLowest, 'gpt-4-turbo'),
      //   data: formattedLowest,
      // },
      tokens: countContentTokens(formattedHighest, 'gpt-4-turbo'),
      data: formattedHighest,
      raw: allOdds,
    };
  }

  async fixtureOdds(fixtureId: number, marketsIds: number[] = []) {
    let allOdds = await sportmonksApiClient.getOddsByFixtureId(fixtureId);

    if (marketsIds.length > 0) {
      allOdds = allOdds.filter((o) => marketsIds.includes(o.market_id));
    }

    const highestOdds = Object.values(findHighestOdds(allOdds)) as TOdd[];
    const lowestOdds = Object.values(findLowestOdds(allOdds)) as TOdd[];

    return {
      all: {
        data: withBookmakerName(allOdds),
        tokens: countContentTokens(allOdds, 'gpt-4-turbo'),
      },
      highest: {
        data: withBookmakerName(highestOdds),
        tokens: countContentTokens(highestOdds, 'gpt-4-turbo'),
      },
      lowest: {
        data: withBookmakerName(lowestOdds),
        tokens: countContentTokens(lowestOdds, 'gpt-4-turbo'),
      },
    };
  }
}

export default OddsService;

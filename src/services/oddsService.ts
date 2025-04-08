import Decimal from 'decimal.js';
import SportmonksApiClient from '../services/sportmonksApiClient';
import {TOdd} from '../types/sportmonks/Odd';
import sportmonksMarkets from '../database/sportmonks/markets.json';
import {countContentTokens} from '../helpers';
import {bookmakerNameById} from "../utils";

const sportmonksApiClient = new SportmonksApiClient();

const groupOdds = (allOdds) => {
  return allOdds.reduce((acc, obj) => {
    // const key = `market_id:${obj.market_id || ':'}-label:${obj.label || ':'}-total:${obj.total || ':'}-handicap:${obj.handicap || ':'}-name:${obj.name || ':'}`;
    const key = `market_id:${obj.market_id || ':'}-label:${obj.label || ':'}-total:${obj.total || ':'}-handicap:${obj.handicap || ':'}`;

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

const formatOdd = (odd: TOdd) => {
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
  if (odd.bookmaker) newOdd['bookmaker'] = odd.bookmaker;

  return newOdd;
}

const formatOdds = (odds: TOdd[], minProbability = '0%', maxProbability = '100%') => {
  const markets = sportmonksMarkets;
  const marketsIds = markets.map((m) => m.id);

  return odds
    .filter((odd) => marketsIds.includes(odd.market_id))
    .map((odd) => {
      return formatOdd(odd);
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

const keepLowestAndHighest = (key, groupedOdds) => {
  return groupedOdds.reduce((acc, obj: TOdd) => {
    const dp3 = new Decimal(obj.dp3);

    if (!acc.low || dp3.lessThan(new Decimal(acc.low['dp3']))) {
      acc.low = obj;
    }

    if (!acc.high || dp3.greaterThan(new Decimal(acc.high['dp3']))) {
      acc.high = obj;
    }

    return acc;
  }, { key: key, low: null as any, high: null as any });
}

class OddsService {

  async collectData(fixtureId: number, marketsIds: number[] = []) {
    let allOdds = await sportmonksApiClient.getOddsByFixtureId(fixtureId);

    if (marketsIds.length > 0) {
      allOdds = allOdds.filter((o) => marketsIds.includes(o.market_id));
    }

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

  async fixtureOdds(fixtureId: number, marketsIds: number[] = [], bookmakersIds: number[] = [], totals: string[] = []) {
    let allOdds = await sportmonksApiClient.getOddsByFixtureId(fixtureId);

    if (marketsIds.length > 0) {
      allOdds = allOdds.filter((o) => marketsIds.includes(o.market_id));
    }

    if (bookmakersIds.length > 0) {
      allOdds = allOdds.filter((o) => bookmakersIds.includes(o.bookmaker_id));
    }

    if (totals.length > 0) {
      allOdds = allOdds.filter((o) => totals.includes(o.total));
    }

    const highestOdds = Object.values(findHighestOdds(allOdds)) as TOdd[];
    const lowestOdds = Object.values(findLowestOdds(allOdds)) as TOdd[];

    return {
      all: {
        data: formatOdds(withBookmakerName(allOdds)),
        tokens: countContentTokens(allOdds, 'gpt-4-turbo'),
      },
      highest: {
        data: formatOdds(withBookmakerName(highestOdds)),
        tokens: countContentTokens(highestOdds, 'gpt-4-turbo'),
      },
      lowest: {
        data: formatOdds(withBookmakerName(lowestOdds)),
        tokens: countContentTokens(lowestOdds, 'gpt-4-turbo'),
      },
    };
  }

  async fixtureGroupedOdds(fixtureId: number, marketsIds: number[] = [], bookmakersIds: number[] = [], totals: string[] = []) {
    let allOdds = await sportmonksApiClient.getOddsByFixtureId(fixtureId);

    if (marketsIds.length > 0) {
      allOdds = allOdds.filter((o) => marketsIds.includes(o.market_id));
    }

    if (bookmakersIds.length > 0) {
      allOdds = allOdds.filter((o) => bookmakersIds.includes(o.bookmaker_id));
    }

    if (totals.length > 0) {
      allOdds = allOdds.filter((o) => totals.includes(o.total));
    }

    const groupedOdds = groupOdds(withBookmakerName(allOdds));
    const groupedHLOdds = Object.keys(groupedOdds).map((key) => {
      return keepLowestAndHighest(key, groupedOdds[key]);
    }).map((g) => {
      return {
        key: g.key,
        diff: (new Decimal(g.high.dp3).minus(new Decimal(g.low.dp3))).toFixed(2),
        low: formatOdd(g.low),
        high: formatOdd(g.high),
      };
    });

    // Algo criteria
    // Highest odd bookmaker: Pinnacle
    // Highest odd < 2.50
    // Diff >= 12.5% from the highest odd
    // If lowest odd if < 2 and the highest odd is > 2
    const valueHLOdds: any[] = [];
    groupedHLOdds.forEach((g) => {
      const isPinnacle = g.high['bookmaker'] === 'Pinnacle';
      const lessThan = new Decimal(g.high['odd']).lte(new Decimal('2.5'));
      const diffEnough = new Decimal(g.diff).gte(new Decimal(g.high.odd).div(20));
      // const lowLessThan = new Decimal(g.low.odd).lt(2);
      // const highMoreThan = new Decimal(g.high.odd).gt(2);

      if (isPinnacle && lessThan && diffEnough) valueHLOdds.push(g);
      // if (isPinnacle && lessThan && diffEnough && lowLessThan && highMoreThan) valueHLOdds.push(g);
    });

    return {
      valued: valueHLOdds,
      grouped: groupedHLOdds,
    };
  }
}

export default OddsService;

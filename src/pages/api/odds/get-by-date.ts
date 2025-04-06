// @ts-nocheck
import type {NextApiRequest, NextApiResponse} from 'next';
import Decimal from 'decimal.js';
import {DateTime} from 'luxon';
import OddsService from '../../../services/oddsService';
import SportmonksApiClient from '../../../services/sportmonksApiClient';

const oddsService = new OddsService();
const sportmonksApiClient = new SportmonksApiClient();

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
          marketsIds: [0],
          bookmakersIds: [0],
          totals: ['2.5'],
          hours: [0],
        },
      });
    }

    const date = req.body.date;
    const hours = req.body?.hours;
    const marketsIds = req.body?.marketsIds || [];
    const bookmakersIds = req.body?.bookmakersIds || [];
    const totals = req.body?.totals || [];

    try {
      const allOdds = [];
      let fixtures = await sportmonksApiClient.getFixturesByDate(date);
      fixtures = fixtures.filter((fx) => fx.has_odds);
      if (hours !== undefined) {
        fixtures = fixtures.filter((fx) => {
          return DateTime
              .fromFormat(fx.starting_at, "yyyy-MM-dd HH:mm:ss").toUTC()
            > DateTime.utc().plus({hours: hours});
        });
      }

      for (let i = 0; i < fixtures.length; i++) {
        const odds = await oddsService.fixtureGroupedOdds(fixtures[i].id, marketsIds, bookmakersIds, totals);
        allOdds.push({
          id: fixtures[i].id,
          fixture: fixtures[i].name,
          valued: odds.valued,
        });
      }

      return res.status(200).json({
        odds: allOdds.filter((o) => o.valued.length > 0),
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

// @ts-nocheck
import type {NextApiRequest, NextApiResponse} from 'next';
import Decimal from 'decimal.js';
import {DateTime} from 'luxon';
import OddsService from '../../../services/oddsService';
import FixtureService from '../../../services/fixtureService';
import DeepSeekService from '../../../services/deepSeekService';
import SportmonksApiClient from '../../../services/sportmonksApiClient';
import GoogleCloudStorageClient from '../../../services/googleCloudStorageClient';

const oddsService = new OddsService();
const fixtureService = new FixtureService();
const deepSeekService = new DeepSeekService();
const sportmonksApiClient = new SportmonksApiClient();
const googleCloudStorageClient = new GoogleCloudStorageClient();

const OUTPUT_DIRECTORY = 'odds';

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
        const fxOdds = await oddsService.fixtureGroupedOdds(fixtures[i].id, marketsIds, bookmakersIds, totals);
        const valueOdd = {
          id: fixtures[i].id,
          fixture: fixtures[i].name,
          starting_at: fixtures[i].starting_at,
        };

        if (fxOdds.valued.length === 1) {
          valueOdd['label'] = fxOdds.valued[0].high.label;
          valueOdd['diff'] = fxOdds.valued[0].diff;
          valueOdd['low'] = fxOdds.valued[0].low.odd;
          valueOdd['high'] = fxOdds.valued[0].high.odd;
        }

        valueOdd['valued'] = fxOdds.valued;
        allOdds.push(valueOdd);
      }

      const valuedOdds = allOdds.filter((o) => o.valued.length > 0)
        .map(({valued, ...rest}) => rest)
        .filter((o) => {
          return ('high' in o) && o.high ? new Decimal(o.high).gte(2) : false;
        });

      for (let i = 0; i < valuedOdds.length; i++) {
        console.log(`starting fixture data collection`);
        const fixture = await fixtureService.collectData(valuedOdds[i]['id']);
        const completion = await deepSeekService.createBetSuggestionExp0002Completion(fixture);
        valuedOdds[i]['completion'] = {
          bet:  completion.data.bet,
          reason:  completion.data.comprehensive_detailed_reason,
        };

        await googleCloudStorageClient.upsertJsonFile(valuedOdds[i], `${OUTPUT_DIRECTORY}/${date}.json`);
      }

      return res.status(200).json({
        total: allOdds.length,
        odds: valuedOdds,
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

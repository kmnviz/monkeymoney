// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next';
import {DateTime} from 'luxon';
import SportmonksApiClient from '../../../services/sportmonksApiClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    if (
      !req.body
      || !('date' in req.body)
    ) {
      return res.status(422).json({
        message: 'There are required fields',
        fields: {
          date: 'YYYY-MM-DD',
        },
        optional: {
          hours: 0,
        },
      });
    }

    try {
      const date = req.body.date;
      const hours = req.body?.hours;
      const sportmonksApiClient = new SportmonksApiClient();
      let fixtures = await sportmonksApiClient.getFixturesByDate(date);

      if (hours !== undefined) {
        fixtures = fixtures.filter((fx) => {
          return DateTime
            .fromFormat(fx.starting_at, "yyyy-MM-dd HH:mm:ss").toUTC()
              > DateTime.utc().plus({hours: hours});
        });
      }

      return res.status(200).json({
        data: {
          count: fixtures.length,
          fixtures: fixtures,
        },
      });
    } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({
        message: error.message,
      });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

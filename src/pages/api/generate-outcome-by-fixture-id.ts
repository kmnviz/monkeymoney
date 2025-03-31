// @ts-nocheck
import type {NextApiRequest, NextApiResponse} from 'next';
import FixtureService from '../../services/fixtureService';
import OddsService from '../../services/oddsService';
import DeepSeekService from '../../services/deepSeekService';
import {bookmakerNameById, countContentTokens} from '../../utils';

const fixtureService = new FixtureService();
const oddsService = new OddsService();
const deepSeekService = new DeepSeekService();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    if (
      !req.body
      || !('fixtureId' in req.body)
    ) {
      return res.status(422).json({
        message: 'There are required fields',
        fields: {
          fixtureId: 'X',
        },
      });
    }

    try {
      const fixtureId = +req.body.fixtureId;

      console.log(`starting fixture data collection`);
      const fixture = await fixtureService.collectData(fixtureId);
      console.log(`fixture data tokens: `, countContentTokens(fixture, 'gpt-4-turbo'));

      console.log(`starting suggestion completion`);
      const completionContent = {fixture: fixture?.data};
      const completion = await deepSeekService.createFixtureMostPossibleOutcomeCompletion(completionContent);

      return res.status(200).json({
        data: {
          completion: completion,
          fixture: fixture,
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

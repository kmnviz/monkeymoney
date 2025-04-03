// @ts-nocheck
import type {NextApiRequest, NextApiResponse} from 'next';
import FixtureService from '../../../services/fixtureService';
import OddsService from '../../../services/oddsService';
import DeepSeekService from '../../../services/deepSeekService';
import {bookmakerNameById, countContentTokens} from '../../../utils';

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
        optional: {
          marketsIds: [0],
        },
      });
    }

    try {
      const fixtureId = +req.body.fixtureId;
      const marketsIds = req.body.marketsIds || [];

      console.log(`starting fixture data collection`);
      const fixture = await fixtureService.collectData(fixtureId);

      const participantsNames = Object.keys(fixture?.data?.participants);
      const minPastMatches = 5;
      if (
        fixture?.data?.participants[participantsNames[0]].past_matches.length < minPastMatches
        || fixture?.data?.participants[participantsNames[1]].past_matches.length < minPastMatches
      ) {
        return res.status(400).json({
          message: `History has not enough (${minPastMatches}) past matches`,
          data: { fixture: fixture },
        });
      }

      console.log(`fixture data tokens: `, countContentTokens(fixture, 'gpt-4-turbo'));
      console.log('starting fixture odds fetch');
      const odds = await oddsService.fixtureOdds(fixtureId, marketsIds);

      console.log(`starting suggestion completion`);
      const completion = await deepSeekService.createBetSuggestionCompletion({
        fixture: fixture?.data,
        odds: odds.highest.data.map(({probability, ...rest}) => rest),
      });

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

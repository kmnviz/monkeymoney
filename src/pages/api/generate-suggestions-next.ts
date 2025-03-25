// @ts-nocheck
import type {NextApiRequest, NextApiResponse} from 'next';
import FixtureService from '../../services/fixtureService';
import OddsService from '../../services/oddsService';
import SportmonksApiClient from '../../services/sportmonksApiClient';
import DeepSeekService from '../../services/deepSeekService';
import GoogleCloudStorageClient from '../../services/googleCloudStorageClient';
import {TFixture} from '../../types/sportmonks/Fixture';
import {countContentTokens} from '../../utils';

const sportmonksApiClient = new SportmonksApiClient();
const deepSeekService = new DeepSeekService();
const fixtureService = new FixtureService();
const oddsService = new OddsService();
const googleCloudStorageClient = new GoogleCloudStorageClient();

const FREE_SUGGESTIONS_LIMIT = 1;
const PREMIUM_SUGGESTIONS_LIMIT = 1;
const MAX_SUGGESTIONS_LIMIT = FREE_SUGGESTIONS_LIMIT + PREMIUM_SUGGESTIONS_LIMIT;
const OUTPUT_DIRECTORY = 'suggestions/next';

const fetchFixtures = async (date): Promise<TFixture[]> => {
  const fxs = await sportmonksApiClient.getFixturesByDate(date);

  if (fxs && fxs.length) {
    return fxs.filter((fx: TFixture) => fx.has_odds);
  }

  return [];
};

const selectFixtures = async (fixtures: TFixture[]): Promise<TFixture[]> => {
  let selectedFxsIds = fixtures.map((fx: TFixture) => fx.id);

  if (fixtures.length > MAX_SUGGESTIONS_LIMIT) {
    console.log('starting fixtures selection completion...');
    const selectedFixturesCompletion
      = await deepSeekService.createSelectFixturesCompletion(MAX_SUGGESTIONS_LIMIT, fixtures);
    selectedFxsIds = (selectedFixturesCompletion.data as string)
      .split(',').map((id) => parseInt(id, 10));
  }

  return fixtures.filter((fx) => selectedFxsIds.includes(fx.id));
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    if (
      !req.body
      || !('date' in req.body)
    ) {
      return res.status(422).json({
        message: 'There are required fields',
        fields: {
          date: 'XXXX.XX.XX',
        },
      });
    }

    try {
      const date = req.body.date;
      const filename = `${OUTPUT_DIRECTORY}/${date}.json`;
      console.log(`suggestions generation for ${date} starting...`);
      const fxs: TFixture[] = await fetchFixtures(date);
      console.log(`total fixtures: ${fxs.length}`);
      const selectedFxs: TFixture[] = await selectFixtures(fxs);
      console.log(`selected fixtures: ${selectedFxs.length}`);

      const suggestions = [];
      for (let i = 0; i < selectedFxs.length; i++) {
        const fxId = selectedFxs[i].id;
        console.log(`${i}:${fxId} suggestion generation starting...`);

        console.log(`starting fixture data collection`);
        const fixture = await fixtureService.collectData(fxId);
        console.log(`starting odds data collection`);
        const odds = await oddsService.collectData(fxId);

        console.log(`starting suggestion completion`);
        const completionContent = {fixture: fixture.data, odds: odds.data.map(({prob, ...rest}) => rest)};
        const completion = await deepSeekService.createBetSuggestionCompletion(completionContent);

        const suggestion = {
          plan: (i < FREE_SUGGESTIONS_LIMIT) ? 'free' : 'premium',
          tokens: {
            total: countContentTokens(completionContent, 'gpt-4-turbo'),
            fixture: fixture.tokens,
            odds: odds.tokens,
          },
          fixture: fixture.data,
          odds: odds.data,
          completion: completion,
        };

        suggestions.push(suggestion);

        await googleCloudStorageClient.upsertJsonFile(suggestion, filename);
        console.log(`suggestion generation upsert to ${filename}`);
        console.log(`${i}:${fxId} suggestion generation completed`);
      }

      console.log(`suggestions generation for ${date} finished`);

      return res.status(200).json({
        data: {
          suggestions: suggestions,
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

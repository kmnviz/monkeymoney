// @ts-nocheck
import type {NextApiRequest, NextApiResponse} from 'next';
import { DateTime } from 'luxon';
import FixtureService from '../../../services/fixtureService';
import OddsService from '../../../services/oddsService';
import SportmonksApiClient from '../../../services/sportmonksApiClient';
import DeepSeekService from '../../../services/deepSeekService';
import GoogleCloudStorageClient from '../../../services/googleCloudStorageClient';
import {TFixture} from '../../../types/sportmonks/Fixture';
import {countContentTokens} from '../../../utils';

const sportmonksApiClient = new SportmonksApiClient();
const deepSeekService = new DeepSeekService();
const fixtureService = new FixtureService();
const oddsService = new OddsService();
const googleCloudStorageClient = new GoogleCloudStorageClient();

const FREE_SUGGESTIONS_LIMIT = 1000;
const PREMIUM_SUGGESTIONS_LIMIT = 0;
const MAX_SUGGESTIONS_LIMIT = FREE_SUGGESTIONS_LIMIT + PREMIUM_SUGGESTIONS_LIMIT;
const OUTPUT_DIRECTORY = 'suggestions/stats';

const fetchFixtures = async (date): Promise<TFixture[]> => {
  const fxs = await sportmonksApiClient.getFixturesByDate(date);

  if (fxs && fxs.length) {
    return fxs.filter((fx: TFixture) => fx.has_odds);
  }

  return [];
};

const filterFixtures = (fxs: TFixture[]): TFixture[] => {
  return fxs.filter((fx: TFixture) => {
    const currentTime = DateTime.utc();
    const matchTime = DateTime.fromFormat(fx.starting_at, "yyyy-MM-dd HH:mm:ss", { zone: 'utc' });
    const cutoffTime = currentTime.plus({ minutes: 120 });

    return matchTime >= cutoffTime;
  });
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

  // selectedFxsIds = [19154779];
  return fixtures.filter((fx) => selectedFxsIds.includes(fx.id));
};

const hasPastMatches = (fixture) => {
  const participantsNames = Object.keys(fixture?.data?.participants);
  const minPastMatches = 5;

  return fixture?.data?.participants[participantsNames[0]]?.past_matches?.length >= minPastMatches
    && fixture?.data?.participants[participantsNames[1]]?.past_matches?.length >= minPastMatches;
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
        optional: {
          marketsIds: [0],
          bookmakersIds: [0],
          totals: ['2.5'],
        },
      });
    }

    try {
      console.log(`-- Stats suggestions generation starting at: ${DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss')} --`);
      console.log(`parameters: ${JSON.stringify(req.body)}`);
      const date = req.body.date;
      const marketsIds = req.body?.marketsIds || [];
      const bookmakersIds = req.body?.bookmakersIds || [];
      const totals = req.body?.totals || [];
      const filename = `${OUTPUT_DIRECTORY}/${date}.json`;
      console.log(`suggestions generation for ${date} starting...`);
      const fxs: TFixture[] = filterFixtures(await fetchFixtures(date));
      console.log(`total fixtures: ${fxs.length}`);
      const selectedFxs: TFixture[] = await selectFixtures(fxs);
      console.log(`selected fixtures: ${selectedFxs.length}`);

      const suggestions = [];
      for (let i = 0; i < selectedFxs.length; i++) {
        const fxId = selectedFxs[i].id;
        console.log(`${i}:${fxId} suggestion generation starting...`);

        console.log(`starting fixture data collection`);
        const fixture = await fixtureService.collectData(fxId);
        if (!fixture) {
          console.log(`${i}:${fxId} fixture not found, continue.`);
          continue;
        }

        if (!hasPastMatches(fixture)) {
          console.log(`${i}:${fxId} has not enough past matches, continue.`);
          continue;
        }

        console.log(`fixture data tokens: `, countContentTokens(fixture, 'gpt-4-turbo'));
        console.log(`starting odds data collection`);
        // const odds = await oddsService.collectData(fxId);
        const odds = (await oddsService.fixtureOdds(fxId, marketsIds, bookmakersIds, totals)).highest;
        if (!odds.data.length) {
          console.log(`${i}:${fxId} has not enough odds, continue.`);
          continue;
        }
        console.log(`odds data tokens: `, countContentTokens(odds, 'gpt-4-turbo'));
        console.log(`starting suggestion completion`);
        // const completionContent = {fixture: fixture.data, odds: odds.data.map(({prob, ...rest}) => rest)};
        const completionContent = {fixture: fixture.data};
        // const completion = await deepSeekService.createBetSuggestionCompletion(completionContent);
        const completion = await deepSeekService.createBetSuggestionExp0002Completion(completionContent);
        const odd = odds.data.find((o) => o.label === completion.data.bet);

        const suggestion = {
          specific: {marketsIds, bookmakersIds, totals},
          tokens: {
            total: countContentTokens(completionContent, 'gpt-4-turbo'),
            fixture: fixture.tokens,
            odds: odds.tokens,
          },
          fixture: fixture.data,
          odds: odds.data,
          completion: {
            data: {
              ...completion.data,
              odd_id: odd?.id,
              odd: odd?.odd,
              market_id: odd?.market_id,
              market_description: odd?.market,
            },
          },
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

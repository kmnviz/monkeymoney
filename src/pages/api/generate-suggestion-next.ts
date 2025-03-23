// @ts-nocheck
import type {NextApiRequest, NextApiResponse} from 'next';
import OpenAI from 'openai';
import SportmonksApiClient from '../../services/sportmonksApiClient';
import {ParticipantEnum} from '../../enums/sportmonks';
import {
  leagueNameById,
  formatJsonStringToJson,
  pause,
} from '../../utils';
import sportmonksBookmakers from '../../database/sportmonks/bookmakers.json';
import betSuggestionPrompt from '../../prompts/bet-suggestion';
import {removeEmptyObjects, removeZeroValues} from '../../helpers';
import {
  modifyActiveSeasons,
  modifyCoaches,
  modifyH2h,
  modifyLeague,
  modifyLineups,
  modifyOdds,
  modifyPlayers,
  modifyPlayerStatistics,
  modifySchedules,
  modifyStandings,
  modifyStatistics,
  modifyTeam,
} from '../../filters';

const sportmonksApiClient = new SportmonksApiClient();
const deepSeek = new OpenAI({
  baseURL: process.env.DEEPSEEK_API_URL,
  apiKey: process.env.DEEPSEEK_API_KEY as string,
});
const models = {
  gpt4Turbo: 'gpt-4-turbo',
  gpt4o: 'gpt-4o',
  gpt4oLatest: 'chatgpt-4o-latest',
  deepSeekReasoner: 'deepseek-reasoner',
  deepSeekChat: 'deepseek-chat',
};

const enrichFixture = (fixture) => {
  fixture['league'] = leagueNameById(fixture.league_id);
  return fixture;
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
          fixtureId: 'X',
        },
      });
    }

    try {
      const fixtureId = +req.body.fixtureId;

      let fixture = await sportmonksApiClient.getFixtureById(fixtureId);
      fixture = enrichFixture(fixture);

      return res.status(200).json({
        data: {
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

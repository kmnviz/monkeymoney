// @ts-nocheck
import type {NextApiRequest, NextApiResponse} from 'next';
import OpenAI from 'openai';
import SportmonksApiClient from '../../../services/sportmonksApiClient';
import sportmonksTypes from '../../../database/sportmonks/types.json';
import GoogleCloudStorageClient from '../../../services/googleCloudStorageClient';
import DeepSeekService from '../../../services/deepSeekService';

const deepSeekService = new DeepSeekService();
const googleCloudStorageClient = new GoogleCloudStorageClient();
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

const fetchFixtureOutcome = async (fixtureId) => {
  const outcomeA = await sportmonksApiClient
    .getFixtureById(fixtureId, 'participants;scores;statistics');
  const outcomeB = await sportmonksApiClient
    .getFixtureById(fixtureId, 'events');

  return { ...outcomeA, ...outcomeB };
};

const formatFixtureOutcome = (fixtureOutcome) => {

};

// const modifyStatistics = (statistics) => {
//   const types = sportmonksTypes;
//
//   const stats = statistics
//     .map((stat) => {
//       const type = types.find((t) => t.id === stat.type_id)
//
//       return {
//         type: type.name,
//         data: stat.data,
//         location: stat.location,
//       };
//     })
//     .flat();
//
//   const optimized = {};
//
//   stats.forEach(({type, data, location}) => {
//     const key = type.toLowerCase().replace(/[^a-z0-9]/gi, '_'); // Normalize key names
//
//     if (!optimized[key]) {
//       optimized[key] = {total: 0, home: 0, away: 0};
//     }
//
//     optimized[key][location] = data.value;
//     optimized[key].total += data.value;
//   });
//
//   return optimized;
// }
//
// const modifyScores = (scores) => {
//   let result = {
//     total: {home: 0, away: 0},
//     first_half: {home: 0, away: 0},
//     second_half: {home: 0, away: 0},
//     extra_time: {home: 0, away: 0},
//     penalties: {home: 0, away: 0}
//   };
//
//   scores.forEach(({score, description}) => {
//     if (description === "CURRENT") {
//       result.total[score.participant] = score.goals;
//     } else if (description === "1ST_HALF") {
//       result.first_half[score.participant] = score.goals;
//     } else if (description === "2ND_HALF" || description === "2ND_HALF_ONLY") {
//       result.second_half[score.participant] = score.goals;
//     } else if (
//       description === "ET" ||
//       description === "ET_1ST_HALF" ||
//       description === "ET_2ND_HALF"
//     ) {
//       result.extra_time[score.participant] += score.goals;
//     } else if (description === "PENALTY_SHOOTOUT") {
//       result.penalties[score.participant] = score.goals;
//     }
//   });
//
//   return result;
// }

const SUGGESTIONS_DIRECTORY = 'suggestions/next';
const RECAPS_DIRECTORY = 'recaps/next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    if (
      !req.body
      || !('date' in req.body)
    ) {
      return res.status(422).json({
        message: 'There are required fields',
        fields: {
          date: 'YYYY-MM-DD',
        },
      });
    }

    try {
      const date = req.body.date;
      const suggestions = await googleCloudStorageClient.readJsonFile(`${SUGGESTIONS_DIRECTORY}/${date}.json`);
      if (!suggestions) {
        return res.status(404).json({
          message: 'File not found.',
        });
      }

      const outcomes = [];
      for (let i = 0; i < (suggestions as object[]).length; i++) {
        const suggestion = (suggestions as object)[i];
        const suggestionCompletion = suggestion.completion.data;
        const fixtureOutcome = await fetchFixtureOutcome(suggestion.fixture.id);

        return res.status(200).json({
          fixtureOutcome: fixtureOutcome,
        });

        if (!fixtureOutcome.result_info) {
          console.log(`${i}:${suggestion.fixture.id} ${suggestion.fixture.name} is not finished yet`);
          continue;
        }

        const suggestionCheckCompletion = await deepSeekService.createSuggestionCheckCompletion({
          suggestion: suggestionCompletion,
          outcome: fixtureOutcome,
        });

        console.log('suggestionCheckCompletion: ', suggestionCheckCompletion);

        const outcome = {
          fixture_id: suggestion.data.fixture.id,
          fixture: suggestion.fixture,
          plan: suggestion.plan,
          suggestion_completion: suggestionCompletion,
          fixture_outcome: fixtureOutcome,
          is_guessed: suggestionCheckCompletion['data'],
        };
        outcomes.push(outcome);

        await googleCloudStorageClient.upsertJsonFile(outcome, `${RECAPS_DIRECTORY}/${date}.json`);
      }

      return res.status(200).json({
        data: outcomes,
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

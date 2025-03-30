// @ts-nocheck
import type {NextApiRequest, NextApiResponse} from 'next';
import SportmonksApiClient from '../../../services/sportmonksApiClient';
import GoogleCloudStorageClient from '../../../services/googleCloudStorageClient';
import DeepSeekService from '../../../services/deepSeekService';
import {typeNameById} from '../../../utils';

const deepSeekService = new DeepSeekService();
const googleCloudStorageClient = new GoogleCloudStorageClient();
const sportmonksApiClient = new SportmonksApiClient();

const fetchFixtureOutcome = async (fixtureId) => {
  const outcomeA = await sportmonksApiClient
    .getFixtureById(fixtureId, 'participants;scores;statistics');
  const outcomeB = await sportmonksApiClient
    .getFixtureById(fixtureId, 'events');

  return { ...outcomeA, ...outcomeB };
};

const formatScores = (scores) => {
  const result = {
    total: { home: 0, away: 0 },
    first_half: { home: 0, away: 0 },
    second_half: { home: 0, away: 0 },
    extra_time: { home: 0, away: 0 },
    penalties: { home: 0, away: 0 }
  };

  scores.forEach(({ description, score }) => {
    const participant = score.participant;
    const goals = score.goals;

    if (description === "CURRENT") {
      result.total[participant] += goals;
    } else if (description === "1ST_HALF") {
      result.first_half[participant] += goals;
    } else if (description === "2ND_HALF") {
      result.second_half[participant] += goals;
    } else if (description === "EXTRA_TIME") {
      result.extra_time[participant] += goals;
    } else if (description === "PENALTIES") {
      result.penalties[participant] += goals;
    }
  });

  return result;
};

const formatFixtureOutcome = (fixtureOutcome) => {
  return {
    id: fixtureOutcome.id,
    name: fixtureOutcome.name,
    starting_at: fixtureOutcome.starting_at,
    participants: fixtureOutcome.participants.map((p) => {
      return {
        name: p.name,
        location: p.meta.location,
        statistics: fixtureOutcome.statistics.filter((s) => {
          return p.id === s.participant_id;
        }).map((s) => {
          return {
            [typeNameById(s.type_id)]: s.data.value,
          };
        }),
        events: fixtureOutcome.events.filter((e) => {
          return p.id === e.participant_id;
        }).map((e) => {
          const result = {
            type: typeNameById(e.type_id),
            player_name: e.player_name,
          };

          if (e.minute) result['minute'] = e.minute;
          if (e.extra_minute) result['extra_minute'] = e.extra_minute;
          if (e.related_player_name) result['related_player_name'] = e.related_player_name;
          if (e.info) result['info'] = e.info;
          if (e.addition) result['addition'] = e.addition;
          if (e.injured) result['injured'] = e.injured;

          return result;
        }),
      };
    }),
    scores: formatScores(fixtureOutcome.scores),
  };
};

const SUGGESTIONS_DIRECTORY = 'suggestions/next/stats';
const RECAPS_DIRECTORY = 'recaps/next/stats';

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
      const suggestions = (await googleCloudStorageClient.readJsonFile(`${SUGGESTIONS_DIRECTORY}/${date}.json`) as object[]);
      if (!suggestions) {
        return res.status(404).json({
          message: 'File not found.',
        });
      }

      const outcomes = [];
      for (let i = 0; i < suggestions.length; i++) {
        const suggestion = (suggestions as object)[i];
        if (suggestion?.scores && suggestion?.scores?.length > 0) {
          console.log(`${i}:${suggestion.fixture.id} ${suggestion.fixture.name} is not finished yet`);
          continue;
        }

        const suggestionCompletion = suggestion.completion.data;
        const fixtureOutcome = formatFixtureOutcome(await fetchFixtureOutcome(suggestion.fixture.id));

        const suggestionCheckCompletion = await deepSeekService.createSuggestionCheckCompletion({
          suggestion: suggestionCompletion,
          outcome: fixtureOutcome,
        });

        const outcome = {
          fixture_id: suggestion.fixture.id,
          fixture: suggestion.fixture.name,
          plan: suggestion.plan,
          suggestion: suggestionCompletion,
          result: fixtureOutcome,
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

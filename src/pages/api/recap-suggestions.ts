// @ts-nocheck
import fs from 'fs';
import path from 'path';
import type {NextApiRequest, NextApiResponse} from 'next';
import OpenAI from 'openai';
import SportmonksApiClient from '../../services/sportmonksApiClient';
import {writeIntoFile} from '../../utils';
import sportmonksTypes from '../../database/sportmonks/types.json';

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

const createSuggestionCheckCompletion = async (content) => {
  const messages = [
    {
      role: 'system',
      content: ``,
    },
    {
      role: 'user',
      content: `
      ### Task:
      You receive a football match bet suggestion and it's outcome in two JSON objects.
      Analyze the suggestion and return an answer if the suggestion was correct.
      `,
    },
    {
      role: 'assistant',
      content: JSON.stringify(content),
    },
    {
      role: 'user',
      content:
        `
          You answer must be just YES or NO
        `,
    }
  ];

  const completion = await deepSeek.chat.completions.create({
    model: models.deepSeekChat,
    messages: messages,
    temperature: 0,
  } as any);

  console.log('createBetSuggestionCompletion usage: ', completion.usage);
  console.log('createBetSuggestionCompletion message: ', completion.choices[0].message);

  return {
    model: models.deepSeekChat,
    data: completion.choices[0].message.content,
  };
};

const modifyStatistics = (statistics) => {
  const types = sportmonksTypes;

  const stats = statistics
    .map((stat) => {
      const type = types.find((t) => t.id === stat.type_id)

      return {
        type: type.name,
        data: stat.data,
        location: stat.location,
      };
    })
    .flat();

  const optimized = {};

  stats.forEach(({ type, data, location }) => {
    const key = type.toLowerCase().replace(/[^a-z0-9]/gi, '_'); // Normalize key names

    if (!optimized[key]) {
      optimized[key] = { total: 0, home: 0, away: 0 };
    }

    optimized[key][location] = data.value;
    optimized[key].total += data.value;
  });

  return optimized;
}

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

    const date = req.body.date;
    const filePath = path.join(process.cwd(), `src/database/suggestions/${date}.json`);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        message: 'File not found.',
      });
    }

    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const suggestions = JSON.parse(fileContent);

      const outcomes = [];
      for (let i = 0; i < suggestions.length; i++) {
        const suggestion = suggestions[i].completion.data;
        const fixtureOutcome = await sportmonksApiClient
          .getFixtureById(suggestions[i].data.fixture.id);

        fixtureOutcome['statistics'] = modifyStatistics(fixtureOutcome['statistics']);

        const suggestionCheck = await createSuggestionCheckCompletion({
          suggestion: suggestion,
          outcome: fixtureOutcome,
        });

        const scores = (fixtureOutcome.scores as any[]).map((score) => {
          return {
            score: score.score,
            description: score.description,
          };
        });

        outcomes.push({
          fixture: suggestions[i].fixture,
          suggestion: {
            bet: suggestions[i].completion.data.bet,
            odd: suggestions[i].completion.data.odd,
            probability: suggestions[i].completion.data.probability,
            market_description: suggestions[i].completion.data.market_description,
          },
          result: {
            scores: scores,
            is_guessed: suggestionCheck['data'],
          },
        });
      }

      const guessed = outcomes.filter((o) => o.result.is_guessed === 'YES');
      const missed = outcomes.filter((o) => o.result.is_guessed === 'NO');

      const data = {
        total: {
          count: outcomes.length,
          guessed: guessed.length,
          missed: missed.length,
        },
        guessed: guessed,
        missed: missed,
      };

      await writeIntoFile(data, `/suggestions/${date}_recap.json`);

      return res.status(200).json({
        data: data,
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

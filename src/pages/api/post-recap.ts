// @ts-nocheck
import fs from 'fs';
import path from 'path';
import type {NextApiRequest, NextApiResponse} from 'next';
import OpenAI from 'openai';
import {TwitterApi} from 'twitter-api-v2';
import SportmonksApiClient from '../../services/sportmonksApiClient';
import {formatJsonStringToJson} from "../../utils";

const sportmonksApiClient = new SportmonksApiClient();
const twitterClient = new TwitterApi(process.env.TWITTER_API_KEY);
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
      You receive a football match suggestion and it's outcome in two JSON objects.
      Analyze the suggestion and return an answer if the suggestion was correct
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

  console.log('createBetSuggestionCompletion completion: ', completion.usage);
  console.log('createBetSuggestionCompletion completion: ', completion.choices[0].message);

  return {
    model: models.deepSeekChat,
    data: completion.choices[0].message.content,
  };
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
          date: 'YYYY-MM-DD',
        },
      });
    }

    const filePath = path.join(process.cwd(), `src/database/suggestions/${req.body.date}.json`);
    console.log('filePath: ', filePath);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        message: 'File not found.',
      });
    }

    try {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const suggestions = JSON.parse(fileContent);

      const outcomes = [];
      // for (let i = 0; i < suggestions.length; i++) {
      for (let i = 0; i < 1; i++) {
        const suggestion = suggestions[i].completion.data;
        const outcome = await sportmonksApiClient
          .getFixtureById(suggestions[i].data.fixture.id);
        outcomes.push(outcome);

        const suggestionCheck = await createSuggestionCheckCompletion({
          suggestion: suggestion,
          outcome: outcome,
        });

        const outcomeResult = suggestionCheck['data'];

        console.log('fixture: ', suggestions[i].fixture);
        console.log('outcomeResult: ', outcomeResult);
      }

      return res.status(200).json({
        data: {
          suggestions: suggestions,
          outcomes: outcomes,
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

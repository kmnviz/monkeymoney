// @ts-nocheck
import fs from 'fs';
import path from 'path';
import type {NextApiRequest, NextApiResponse} from 'next';
import OpenAI from 'openai';
import {TwitterApi} from 'twitter-api-v2';

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_API_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_API_ACCESS_SECERT,
});
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

const createRecapSuggestionPostCompletion = async (content, date) => {
  const messages = [
    {
      role: 'system',
      content: ``,
    },
    {
      role: 'user',
      content: `
      ### Task:
      You receive an object that contains a football matches suggestions with related
      bet, odd and the final result with scores.

      Create a Twitter post that tells about the each suggestion and their results one by one.
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
          Voice of the text should be like a professional football analyst.
          DO NOT USE THE WORD BET, IF NEEDED USE THE WORD TIP INSTEAD OF BET.
          DO NOT WRAP THE TEXT IN ANY QUOTES.
          DO NOT ADD ADDITIONAL *'s TO THE TEXT AS TWITTER DOES NOT RECOGNIZES THEM.

          USE FOLLOWING EXAMPLE FOR EACH SUGGESTION:
          1️⃣ Fatih Karagumruk SK vs. Bandirmaspor
          🔹 Prediction: Over 2.5 Goals
          🔹 Odd: 1.93
          🔹 Chance: 82%
          🔹 Final Result: 1-2
          🔹 Outcome: ✅ (Guessed)

          ---
          In the beginning of the text add:
          🎯 DAILY RESULTS RECAP
          📅 [${date}]

          In the end of the text add following:
          💡 Thank you for following our tips! Stay tuned for tomorrow's predictions.

          🎲 Prepared by AI, validated by top experts.

          For instant tips and updates:
          👉 Telegram: http://t.me/betbro_ai
          👉 Website: http://betbro.ai
          👉 X (Twitter): https://x.com/betbro_ai

          Add Following hashtags:
          #DailyPicks #Football #Soccer #EuropeanFootball #SportsPicks
          Additionally add a hashtag for each team that is mentioned in the provided context.
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
    const filePath = path.join(process.cwd(), `src/database/suggestions/${date}_recap.json`);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        message: 'File not found.',
      });
    }

    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const suggestionsRecap = JSON.parse(fileContent);

      const completion = await createRecapSuggestionPostCompletion(suggestionsRecap.guessed, date);
      console.log('completion: ', completion);
      await twitterClient.v2.tweet((completion as object).data);

      return res.status(200).json({
        data: {
          completion: completion,
          suggestionsRecap: suggestionsRecap,
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

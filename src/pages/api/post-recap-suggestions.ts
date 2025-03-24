// @ts-nocheck
import type {NextApiRequest, NextApiResponse} from 'next';
import OpenAI from 'openai';
import {TwitterApi} from 'twitter-api-v2';
import Decimal from 'decimal.js';
import GoogleCloudStorageClient from '../../services/googleCloudStorageClient';
import TelegramBotClient from '../../services/telegramBotClient';
import ZohoMailerClient from '../../services/zohoMailerClient';
import WebflowService from '../../services/webflowService';

const webflowService = new WebflowService();
const zohoMailerClient = new ZohoMailerClient();
const googleCloudStorageClient = new GoogleCloudStorageClient();
const telegramBotClient = new TelegramBotClient();
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

    try {
      const date = req.body.date;
      const recapTotal = (await googleCloudStorageClient.readJsonFile(`recaps/${date}.json`) as object[]);
      if (!recapTotal) {
        return res.status(404).json({
          message: `${date} recap not found`,
        });
      }
      const emailAddresses = {
        free: (await googleCloudStorageClient.readJsonFile(`emails.json`) as string[]) || [],
        premium: ['kamenovivanzdravkov@gmail.com', 'omaretz@gmail.com', 'iambozhidar@gmail.com'],
      };
      const recapFreeAndPremium = recapTotal.filter((r) => r.suggestion.free || r.suggestion.premium);

      for (let i = 0; i < recapFreeAndPremium.length; i++) {
        await webflowService.updateTipsArchiveCollection(date, recapFreeAndPremium[i]);
      }

      const guessed = (recapTotal as object[])
        .filter((suggestion) => suggestion.result.is_guessed === 'YES' && (suggestion.suggestion.free || suggestion.suggestion.premium));
      const completion = await createRecapSuggestionPostCompletion(guessed, date);
      const message = (completion as object).data;
      await twitterClient.v2.tweet(message);
      await telegramBotClient.sendMessage(message);
      await zohoMailerClient.sendEmails(emailAddresses.free.concat(emailAddresses.premium), `Daily recap ${date}`, message);

      let win = new Decimal(0);
      for (let i = 0; i < guessed.length; i++) {
        win = win.plus(new Decimal(guessed[i].suggestion.odd));
      }
      const pnl = win.minus(new Decimal(recapTotal.length)).toFixed(3);

      return res.status(200).json({
        data: {
          completion: completion,
          recapTotal: recapTotal,
          suggestionsTotal: recapTotal.length,
          pnl: pnl,
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

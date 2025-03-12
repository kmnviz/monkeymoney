// @ts-nocheck
import type {NextApiRequest, NextApiResponse} from 'next';
import OpenAI from 'openai';
import {TwitterApi} from 'twitter-api-v2';
import Decimal from 'decimal.js';
import {pause} from '../../utils';
import GoogleCloudStorageClient from '../../services/googleCloudStorageClient';
import TelegramBotClient from '../../services/telegramBotClient';

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

const createSuggestionsPostCompletion = async (content, date, totalOdds) => {
  const messages = [
    {
      role: 'system',
      content: ``,
    },
    {
      role: 'user',
      content: `
      ### Task:
      You receive an object that contains a football matches names and a betting predictions for them
      with related bet, odd, probability, market description and a comprehensive reasoning.

      Create a Twitter post that tells about the each suggestion.
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
          **FOR EACH SUGGESTION THERE MUST BE ONLY FIXTURE NAME, BET, CANCE AND ODD. NOTHING ELSE**

          USE FOLLOWING EXAMPLE FOR EACH SUGGESTION:
          1️⃣ Juventus vs Atalanta
          🔹 Bet: Over 2.5 Goals
          🔹 Chance: 82%
          🔹 Odd: 1.93

          ---
          In the beginning of the text add:
          🎯 FREE DAILY TIPS
          📅 [${date}]

          In the end of the text add following:
          📊 Total Odds: ${totalOdds}

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

const createSingleSuggestionsPostCompletion = async (content) => {
  const messages = [
    {
      role: 'system',
      content: ``,
    },
    {
      role: 'user',
      content: `
      ### Task:
      You receive an object that contains a football matches names and a betting predictions for them
      with related bet, odd, probability, market description and a comprehensive reasoning.

      Create a Twitter post that tells about the each suggestion.
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
          **FOR EACH SUGGESTION THERE MUST BE ONLY FIXTURE NAME, BET, CANCE AND ODD. NOTHING ELSE**
          **ADD SEPARATOR AFTER EACH SUGGESTION. THE SEPARATOR MUST BE: !!! bet separator !!!**

          USE FOLLOWING EXAMPLE FOR EACH SUGGESTION:
          🔥 Tips of the Day: Cercle Brugge vs Club Brugge 🔥

          💰 Prediction: Both Teams to Score - No
          📊 Odds: 1.95
          ⚽ Chance: 85%

          Club Brugge’s defense is rock solid, with 8 clean sheets this season. Cercle has blanked in 4 home games and relies heavily on set pieces. Add in Brugge’s dominant aerial presence, and it’s tough to see Cercle breaking through.

          #JupilerProLeague #CercleBrugge #ClubBrugge #BTTS
          !!! bet separator !!!
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
      const suggestions = await googleCloudStorageClient.readJsonFile(`suggestions/${date}.json`);
      if (!suggestions) {
        return res.status(404).json({
          message: 'File not found.',
        });
      }

      const fDailySuggestions = (suggestions as object[]).map((suggestion) => {
        return {
          fixture: suggestion.fixture,
          data: suggestion.completion.data,
        };
      });

      let totalOdds = new Decimal(1);
      fDailySuggestions.forEach((ds) => {
        totalOdds = totalOdds.mul(new Decimal(ds.data.odd));
      });

      // Post single daily post with all matches
      const bundleCompletion = await createSuggestionsPostCompletion(fDailySuggestions, date, totalOdds.toFixed(2));
      const bundle = bundleCompletion.data as string;
      await twitterClient.v2.tweet(bundle);
      await telegramBotClient.sendMessage(bundle);

      // Post each suggestion one by one
      const singlesCompletions = await createSingleSuggestionsPostCompletion(fDailySuggestions);
      const singles = (singlesCompletions.data as string)
        .split('!!! bet separator !!!')
        .map((s) => s.trim())
        .filter((s) => s);

      for (let i = 0; i < singles.length; i++) {
        await pause(60 * 1000);
        await twitterClient.v2.tweet(singles[i]);
        await telegramBotClient.sendMessage(singles[i]);
      }

      return res.status(200).json({
        data: {
          completions: {
            bundle: bundle,
            singles: singles,
          },
          suggestions: fDailySuggestions,
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

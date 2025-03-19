// @ts-nocheck
import type {NextApiRequest, NextApiResponse} from 'next';
import OpenAI from 'openai';
import {TwitterApi} from 'twitter-api-v2';
import Decimal from 'decimal.js';
import {pause} from '../../utils';
import GoogleCloudStorageClient from '../../services/googleCloudStorageClient';
import TelegramBotClient from '../../services/telegramBotClient';
import ZohoMailerClient from '../../services/zohoMailerClient';

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

const createSelectFixturesCompletion = async (count: number, fixtures: any[]) => {
  const content = fixtures.map((fixture) => {
    return {
      fixture_id: fixture.data.fixture.id,
      fixture: fixture.fixture,
    };
  });

  const messages = [
    {
      role: 'system',
      content: `You are an expert football analyst and betting strategist. Your task is to analyze a given list of football fixtures and select the top ${count} fixtures that have the highest potential for successful betting promotion. Use a data-driven approach based on value, team's popularity, historical number of viewer, overall fixture popularity.`,
    },
    {
      role: 'user',
      content: `
      ### Task:
      Analyze the following list of football fixtures and select the best ${count} fixtures for betting promotion. Rank them based on their betting potential and provide reasoning for each selection.

      ### Selection Criteria:
      - **Market Popularity**: Choose fixtures trending in betting discussions and social media.
      - **League/Competition Importance**: Focus on top leagues and competitions.

      ### Input Fixtures:
      [{\\"fixture_id\\": \\"X\\", \\"fixture\\": \\"Team A vs Team B\\"}, {\\"fixture_id\\": \\"Y\\", \\"fixture\\": \\"Team C vs Team D\\"}]

      ### Expected Output Format:
      Return ONLY a comma-separated list of ${count} fixture_ids like:
      X,Y,Z
      `,
    },
    {
      role: 'assistant',
      content: JSON.stringify(content),
    },
  ];

  const completion = await deepSeek.chat.completions.create({
    model: models.deepSeekChat,
    messages: messages,
    temperature: 0,
  } as any);

  console.log('createSelectFixturesCompletion completion: ', completion.usage?.total_tokens);
  console.log('createSelectFixturesCompletion completion: ', completion.choices[0].message);

  return {
    data: completion.choices[0].message.content,
  };
}

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
        optional: {
          suggestionsCount: 0,
        },
      });
    }

    try {
      const date = req.body.date;
      const suggestionsCount = +req.body.suggestionsCount || 0;

      const allSuggestions: object[] = (await googleCloudStorageClient.readJsonFile(`suggestions/${date}.json`) as object[]);
      if (!allSuggestions) {
        return res.status(404).json({
          message: 'File not found.',
        });
      }

      let suggestions = [];
      if (suggestionsCount > 0) {
        const selectedFixturesCompletion = await createSelectFixturesCompletion(suggestionsCount, allSuggestions);
        const selectedFixturesIds = (selectedFixturesCompletion.data as string)
          .split(',').map((id) => parseInt(id, 10));

        suggestions = allSuggestions.filter((suggestion) => {
          return selectedFixturesIds.includes(suggestion.data.fixture.id);
        });
      } else {
        suggestions = allSuggestions as object[];
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
      const bundleMessage = bundleCompletion.data as string;
      await twitterClient.v2.tweet(bundleMessage);
      await telegramBotClient.sendMessage(bundleMessage);
      const emailAddresses = (await googleCloudStorageClient.readJsonFile(`emails.json`) as string[]);
      if (!emailAddresses) {
        return res.status(404).json({
          message: 'Emails file not found.',
        });
      }
      await zohoMailerClient.sendEmails(emailAddresses, `Free daily tips ${date}`, bundleMessage);

      // Post each suggestion one by one
      const singlesCompletions = await createSingleSuggestionsPostCompletion(fDailySuggestions);
      const singleMessages = (singlesCompletions.data as string)
        .split('!!! bet separator !!!')
        .map((s) => s.trim())
        .filter((s) => s);

      for (let i = 0; i < singleMessages.length; i++) {
        await pause(2 * 60 * 1000);
        await twitterClient.v2.tweet(singleMessages[i]);
      }

      const postedSuggestions = allSuggestions.filter((suggestion) => {
        return suggestions.map((s) => s.data.fixture.id)
          .includes(suggestion.data.fixture.id);
      });
      await googleCloudStorageClient.uploadJsonFile(postedSuggestions, `suggestions/posted/${date}.json`);
      console.log(`finished upload posted suggestions.`);

      return res.status(200).json({
        data: {
          completions: {
            bundle: bundleMessage,
            singles: singleMessages,
          },
          total: suggestions.length,
          daily_total: fDailySuggestions.length,
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

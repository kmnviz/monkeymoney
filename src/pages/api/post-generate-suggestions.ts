// @ts-nocheck
import type {NextApiRequest, NextApiResponse} from 'next';
import OpenAI from 'openai';
import {TwitterApi} from 'twitter-api-v2';
import Decimal from 'decimal.js';
import {pause} from '../../utils';
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

const createFreeSuggestionsPostCompletion = async (content, date, totalOdds) => {
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

          USE FOLLOWING EXAMPLE FOR FREE SUGGESTION:
          1️⃣ Juventus vs Atalanta
          🔹 Bet: Over 2.5 Goals
          🔹 Chance: 82%
          🔹 Odd: 1.93

          USE FOLLOWING EXAMPLE FOR PREMIUM SUGGESTION:
          1️⃣ Juventus vs Atalanta
          🔹 Tip: [https://www.betbro.ai/premium]
          🔹 Chance: 75%
          🔹 Odd: 1.666

          ---
          In the beginning of the text add:
          🎯 DAILY TIPS
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

const createPremiumSuggestionsPostCompletion = async (content, date, totalOdds) => {
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

          USE FOLLOWING EXAMPLE FOR SUGGESTION:
          1️⃣ Juventus vs Atalanta
          🔹 Bet: Over 2.5 Goals
          🔹 Chance: 82%
          🔹 Odd: 1.93

          ---
          In the beginning of the text add:
          🎯 DAILY TIPS
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

          USE FOLLOWING EXAMPLE FOR FREE EACH SUGGESTION:
          🔥 Tips of the Day: Cercle Brugge vs Club Brugge 🔥

          💰 Prediction: Both Teams to Score - No
          📊 Odds: 1.95
          ⚽ Chance: 85%

          USE FOLLOWING EXAMPLE FOR PREMIUM EACH SUGGESTION:
          🔥 Tips of the Day: Cercle Brugge vs Club Brugge 🔥

          💰 Prediction: [https://www.betbro.ai/premium]
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

const preparePostingSuggestions = (allSuggestions) => {
  return {
    total: allSuggestions.filter((suggestion) => suggestion.free || suggestion.premium),
    free: allSuggestions.filter((suggestion) => suggestion.free),
    premium: allSuggestions.filter((suggestion) => !suggestion.free && suggestion.premium),
  }
};

const prepareGroupedMessages = async (suggestions: object[], date, totalOdds) => {
  const filtered = suggestions.map((suggestion) => {
    return {
      fixture: suggestion.fixture,
      free: suggestion.free,
      premium: suggestion.premium,
      data: suggestion.completion.data,
    };
  });

  const freeCompletion = await createFreeSuggestionsPostCompletion(filtered, date, totalOdds.toFixed(2));
  const premiumCompletion = await createPremiumSuggestionsPostCompletion(filtered, date, totalOdds.toFixed(2));

  const free = freeCompletion.data as string;
  const premium = premiumCompletion.data as string;

  return {
    free: free,
    premium: premium,
  };
};

const prepareSingleMessages = async (groupedMessage: string) => {
  const singlesCompletions = (await createSingleSuggestionsPostCompletion(groupedMessage) as object).data;
  return singlesCompletions
    .split('!!! bet separator !!!')
    .map((s) => s.trim())
    .filter((s) => s);
}

const postGroupedMessages = async (postingSuggestions, groupedMessages, date, emailAddresses) => {
  await webflowService.updateFreePicksCollection(date, postingSuggestions.free);
  await webflowService.updatePremiumPicksCollection(date, postingSuggestions.premium);
  await twitterClient.v2.tweet(groupedMessages.free);
  await telegramBotClient.sendMessage(groupedMessages.free);
  await zohoMailerClient.sendEmails(emailAddresses.free, `Daily tips ${date}`, groupedMessages.free);
  await zohoMailerClient.sendEmails(emailAddresses.premium, `Daily premium tips ${date}`, groupedMessages.premium);
};

const postSingleMessages = async (singleMessages) => {
  for (let i = 0; i < singleMessages.length; i++) {
    await pause(2 * 60 * 1000);
    await twitterClient.v2.tweet(singleMessages[i]);
  }
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

    try {
      const date = req.body.date;
      const allSuggestions: object[] = (await googleCloudStorageClient.readJsonFile(`suggestions/${date}.json`) as object[]);
      const emailAddresses = {
        free: (await googleCloudStorageClient.readJsonFile(`emails.json`) as string[]) || [],
        premium: ['kamenovivanzdravkov@gmail.com', 'omaretz@gmail.com', 'iambozhidar@gmail.com'],
      };
      if (!allSuggestions) {
        return res.status(404).json({
          message: `${date} suggestions not found.`,
        });
      }

      const postingSuggestions = preparePostingSuggestions(allSuggestions);
      const totalOdds = postingSuggestions.total.reduce((sum, suggestion) =>
        sum.plus(new Decimal(suggestion.completion.data.odd)), new Decimal(0)
      );
      const groupedMessages = await prepareGroupedMessages(allSuggestions, date, totalOdds);
      const singleMessages = await prepareSingleMessages(groupedMessages.free);

      // Post grouped messages
      await postGroupedMessages(postingSuggestions, groupedMessages, date, emailAddresses);
      // Post single messages
      await postSingleMessages(singleMessages);

      return res.status(200).json({
        data: {
          groupedMessages: groupedMessages,
          postingSuggestions: postingSuggestions,
        },
      });
    } catch (error) {
      console.log('error: ', error);
      console.log('error.data: ', error.data);
      return res.status(500).json({
        message: error.message,
      });
    }
  } else {
    return res.status(405).json({message: 'Method Not Allowed'});
  }
}

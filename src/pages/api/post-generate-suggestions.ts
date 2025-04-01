// @ts-nocheck
import type {NextApiRequest, NextApiResponse} from 'next';
import {TwitterApi} from 'twitter-api-v2';
import Decimal from 'decimal.js';
import {pause, bookmakerNameById} from '../../utils';
import GoogleCloudStorageClient from '../../services/googleCloudStorageClient';
import TelegramBotClient from '../../services/telegramBotClient';
import ZohoMailerClient from '../../services/zohoMailerClient';
import WebflowService from '../../services/webflowService';
import DeepSeekService from '../../services/deepSeekService';

const deepSeekService = new DeepSeekService();
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

const preparePostingSuggestions = (allSuggestions) => {
  return {
    free: allSuggestions.filter((suggestion) => suggestion.plan === 'free'),
    premium: allSuggestions.filter((suggestion) => suggestion.plan === 'premium'),
    total: allSuggestions,
  }
};

const prepareCollectedOdds = (postingSuggestions) => {
  return {
    free: postingSuggestions.free.reduce((sum, suggestion) =>
      sum.plus(new Decimal(suggestion.completion.data.odd)), new Decimal(0)
    ).toFixed(3),
    premium: postingSuggestions.premium.reduce((sum, suggestion) =>
      sum.plus(new Decimal(suggestion.completion.data.odd)), new Decimal(0)
    ).toFixed(3),
    total: postingSuggestions.total.reduce((sum, suggestion) =>
      sum.plus(new Decimal(suggestion.completion.data.odd)), new Decimal(0)
    ).toFixed(3),
  };
};

const prepareFreeGroupedMessage = async (suggestions, odds, date) => {
  const filteredSuggestions = suggestions.map((suggestion) => {
    return {
      fixture: suggestion.fixture?.name,
      plan: suggestion.plan,
      data: suggestion.completion.data,
      bookmaker: bookmakerNameById(suggestion.selectedOdd.bookmaker_id),
      starting_at: suggestion.fixture.starting_at,
    };
  });

  return (await deepSeekService.createFreeSuggestionsPostCompletion(filteredSuggestions, odds, date)).data as string;
};

const preparePremiumGroupedMessage = async (suggestions, odds, date) => {
  const filteredSuggestions = suggestions.map((suggestion) => {
    return {
      fixture: suggestion.fixture?.name,
      data: suggestion.completion.data,
      bookmaker: bookmakerNameById(suggestion.selectedOdd.bookmaker_id),
      starting_at: suggestion.fixture.starting_at,
    };
  });

  return (await deepSeekService.createPremiumSuggestionsPostCompletion(filteredSuggestions, odds, date)).data as string;
};

const prepareFreeSingleMessages = async (suggestions) => {
  const messages = [];
  for (let i = 0; i < suggestions.length; i++) {
    const filteredSuggestion = {
      fixture: suggestions[i].fixture?.name,
      plan: suggestions[i].plan,
      data: suggestions[i].completion.data,
      bookmaker: bookmakerNameById(suggestions[i].selectedOdd.bookmaker_id),
      starting_at: suggestions[i].fixture.starting_at,
    };

    const message = (await deepSeekService.createFreeSuggestionPostCompletion(filteredSuggestion)).data as string;
    messages.push(message);
  }
  return messages;
};

const postFreeWebflow = async (suggestions, date) => {
  await webflowService.updateFreePicksCollection(date, suggestions);
};

const postFreeTwitter = async (groupedMessage, singleMessages) => {
  await twitterClient.v2.tweet(groupedMessage);
  for (let i = 0; i < singleMessages.length; i++) {
    await pause(2 * 60 * 1000);
    await twitterClient.v2.tweet(singleMessages[i]);
  }
};

const postFreeTelegram = async (groupedMessage) => {
  await telegramBotClient.sendMessage(groupedMessage);
};

const postFreeEmail = async (date, groupedMessage, emailAddresses) => {
  await zohoMailerClient.sendEmails(emailAddresses, `Daily tips ${date}`, groupedMessage);
};

const postPremiumWebflow = async (suggestions, date) => {
  await webflowService.updatePremiumPicksCollection(date, suggestions);
};

const postPremiumTelegram = async (groupedMessage) => {
  await telegramBotClient.sendMessageToPremiumChannel(groupedMessage);
};

const postPremiumEmail = async (date, groupedMessage, emailAddresses) => {
  await zohoMailerClient.sendEmails(emailAddresses, `Daily premium tips ${date}`, groupedMessage);
};

const SUGGESTIONS_DIRECTORY = 'suggestions';

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
      const allSuggestions: object[] = (await googleCloudStorageClient.readJsonFile(`${SUGGESTIONS_DIRECTORY}/${date}.json`) as object[]);
      if (!allSuggestions) {
        return res.status(404).json({
          message: `${date} suggestions not found.`,
        });
      }

      const emailAddresses = {
        free: (await googleCloudStorageClient.readJsonFile(`emails.json`) as string[]) || [],
        premium: ['kamenovivanzdravkov@gmail.com', 'omaretz@gmail.com', 'iambozhidar@gmail.com'],
      };

      const postingSuggestions = preparePostingSuggestions(allSuggestions);
      const collectedOdds = prepareCollectedOdds(postingSuggestions);
      const freeGroupedMessage = await prepareFreeGroupedMessage(postingSuggestions.total, collectedOdds.total, date);
      const premiumGroupedMessage = await preparePremiumGroupedMessage(postingSuggestions.total, collectedOdds.total, date);
      const freeSingleMessages = await prepareFreeSingleMessages(postingSuggestions.free);

      // Post FREE content
      await postFreeWebflow(postingSuggestions.free, date);
      await postFreeTwitter(freeGroupedMessage, freeSingleMessages);
      await postFreeTelegram(freeGroupedMessage);
      await postFreeEmail(date, freeGroupedMessage, emailAddresses.free);
      // Post PREMIUM content
      await postPremiumWebflow(postingSuggestions.premium, date);
      await postPremiumTelegram(premiumGroupedMessage);
      await postPremiumEmail(date, premiumGroupedMessage, emailAddresses.premium);

      return res.status(200).json({
        data: {
          postingSuggestions: postingSuggestions,
          freeGroupedMessage: freeGroupedMessage,
          premiumGroupedMessage: premiumGroupedMessage,
          freeSingleMessages: freeSingleMessages,
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

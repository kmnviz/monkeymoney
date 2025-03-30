// @ts-nocheck
import type {NextApiRequest, NextApiResponse} from 'next';
import {TwitterApi} from 'twitter-api-v2';
import Decimal from 'decimal.js';
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

const postTwitter = async (message) => {
  await twitterClient.v2.tweet(message);
};

const postTelegram = async (message) => {
  await telegramBotClient.sendMessage(message);
  await telegramBotClient.sendMessageToPremiumChannel(message);
};

const postEmails = async (message, emailAddresses, date) => {
  await zohoMailerClient.sendEmails(emailAddresses, `Daily recap ${date}`, message);
};

const RECAPS_DIRECTORY = 'recaps';

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
      const allRecaps = (await googleCloudStorageClient.readJsonFile(`${RECAPS_DIRECTORY}/${date}.json`) as object[]);
      if (!allRecaps) {
        return res.status(404).json({
          message: `${date} recaps not found`,
        });
      }
      const emailAddresses = {
        free: (await googleCloudStorageClient.readJsonFile(`emails.json`) as string[]) || [],
        premium: ['kamenovivanzdravkov@gmail.com', 'omaretz@gmail.com', 'iambozhidar@gmail.com'],
      };

      const guessed = allRecaps.filter((r) => r.is_guessed === 'YES');
      const groupedMessage = (await deepSeekService.createRecapSuggestionPostCompletion(guessed, date)).data;

      // Post archive posts to webflow
      for (let i = 0; i < allRecaps.length; i++) {
        await webflowService.updateTipsArchiveCollection(date, allRecaps[i]);
      }

      // Post recaps
      await postTwitter(groupedMessage);
      await postTelegram(groupedMessage);
      await postEmails(groupedMessage, [...new Set(emailAddresses.free.concat(emailAddresses.premium))], date);

      return res.status(200).json({
        data: {
          groupedMessage: groupedMessage,
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

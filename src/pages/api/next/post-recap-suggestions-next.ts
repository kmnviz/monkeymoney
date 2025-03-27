// @ts-nocheck
import type {NextApiRequest, NextApiResponse} from 'next';
import OpenAI from 'openai';
import {TwitterApi} from 'twitter-api-v2';
import Decimal from 'decimal.js';
import GoogleCloudStorageClient from '../../../services/googleCloudStorageClient';
import TelegramBotClient from '../../../services/telegramBotClient';
import ZohoMailerClient from '../../../services/zohoMailerClient';
import WebflowService from '../../../services/webflowService';
import DeepSeekService from '../../../services/deepSeekService';

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

const RECAPS_DIRECTORY = 'recaps/next';

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



      // const recapFreeAndPremium = recapTotal.filter((r) => r.suggestion.free || r.suggestion.premium);
      //
      // for (let i = 0; i < recapFreeAndPremium.length; i++) {
      //   await webflowService.updateTipsArchiveCollection(date, recapFreeAndPremium[i]);
      // }
      //
      // const guessed = (recapTotal as object[])
      //   .filter((suggestion) => suggestion.result.is_guessed === 'YES' && (suggestion.suggestion.free || suggestion.suggestion.premium));
      // const completion = await createRecapSuggestionPostCompletion(guessed, date);
      // const message = (completion as object).data;
      // await twitterClient.v2.tweet(message);
      // await telegramBotClient.sendMessage(message);
      // await zohoMailerClient.sendEmails([...new Set(emailAddresses.free.concat(emailAddresses.premium))], `Daily recap ${date}`, message);
      //
      // let win = new Decimal(0);
      // for (let i = 0; i < guessed.length; i++) {
      //   win = win.plus(new Decimal(guessed[i].suggestion.odd));
      // }
      // const pnl = win.minus(new Decimal(recapTotal.length)).toFixed(3);
      //
      // return res.status(200).json({
      //   data: {
      //     completion: completion,
      //     recapTotal: recapTotal,
      //     suggestionsTotal: recapTotal.length,
      //     pnl: pnl,
      //   },
      // });
      return res.status(200).json({
        data: {},
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

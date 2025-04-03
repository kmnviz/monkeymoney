// @ts-nocheck
import fs from 'fs';
import path from 'path';
import type {NextApiRequest, NextApiResponse} from 'next';
import OpenAI from 'openai';
import SportmonksApiClient from '../../services/sportmonksApiClient';
import sportmonksTypes from '../../database/sportmonks/types.json';
import GoogleCloudStorageClient from '../../services/googleCloudStorageClient';
import WebflowService from '../../services/webflowService';
import {readFromFile} from '../../utils';

const googleCloudStorageClient = new GoogleCloudStorageClient();
const sportmonksApiClient = new SportmonksApiClient();
const webflowService = new WebflowService();

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

const SUGGESTIONS_DIRECTORY = 'suggestions/next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const markets = await readFromFile('/markets.json');
      return res.status(200).json({
        markets: JSON.parse(markets).map((m) => m.name),
      });
      // const date = req.body.date;
      // const allSuggestions: object[] = (await googleCloudStorageClient.readJsonFile(`${SUGGESTIONS_DIRECTORY}/${date}.json`) as object[]);
      // await webflowService.updatePremiumPicksCollection('2025-03-28', allSuggestions);
      // Cleanup Free Picks
      // const collectionLiveItems = await webflowService
      //   .collectionsItemsListItemsLive(webflowService.freePicksCollectionId());
      // for (let i = 0; i < collectionLiveItems.length; i++) {
      //   await webflowService.collectionsItemsDeleteItemLive(webflowService.freePicksCollectionId(), collectionLiveItems[i].id);
      // }
      // const collectionLiveStaged = await webflowService
      //   .collectionsItemsListItemsStaged(webflowService.freePicksCollectionId());
      // for (let i = 0; i < collectionLiveStaged.length; i++) {
      //   await webflowService.collectionsItemsDeleteItemStaged(webflowService.freePicksCollectionId(), collectionLiveStaged[i].id);
      // }
      // Cleanup Free Picks

      // const freePicksLive = await webflowService
      //   .collectionsItemsListItemsLive(webflowService.freePicksCollectionId());
      // const tipsArchiveLive = await webflowService
      //   .collectionsItemsListItemsLive(webflowService.tipsArchiveCollectionId());
      // const dailyPicksDate = await webflowService
      //   .collectionsItemsListItemsLive(webflowService.dailyPicksDateCollectionId());
      // const dailyPicksOdds = await webflowService
      //   .collectionsItemsListItemsLive(webflowService.dailyPicksOddsCollectionId());

      // await webflowService.collectionsItemsCreateItemLive(webflowService.tipsArchiveCollectionId(), {
      //   "fieldData": {
      //     "start-date-time": "2025-03-09T07:24:00.000Z",
      //     "tip-suggestion": "Asian Total Corners - Over 10.5",
      //     "chance": "82",
      //     "odd": "1.86",
      //     "name": "Real Madrid vs Rayo Vallecano",
      //     "slug": "real-madrid-vs-rayo-vallecano",
      //     "result": "2-1",
      //     "result-color-status": "rgba(77, 255, 92, 0.15)"
      //   },
      // });

      // await webflowService.updateFreePicksCollection('2025-03-21', [{
      //   "completion": {
      //     "model": "gpt-4-turbo",
      //     "data": {
      //       "fixture": "Burgos vs Almería",
      //       "bet": "Almería to win",
      //       "probability": "75%",
      //       "odd_id": "162530669778",
      //       "odd": "2.350",
      //       "market_id": "1",
      //       "market_description": "Full Time Result",
      //       "comprehensive_detailed_reason": "Almería has shown a strong performance in recent matches, winning 4 out of their last 5 games, and demonstrating a solid attacking and defensive strategy. Their expected goals (xG) and expected goals against (xGA) are well balanced, indicating effective play both offensively and defensively. Burgos, on the other hand, has struggled with consistency and has a higher rate of goals conceded per match. Almería's recent form, combined with their tactical setup and key player performances, suggests a higher probability of winning this match against Burgos. The selected odd offers a value bet as it exceeds the threshold of 1.70 and the calculated probability of 75% indicates a strong likelihood of this outcome, making it a strategic choice for a high-value bet."
      //     }
      //   }
      // }]);

      return res.status(200).json({
        // freePicksLive: freePicksLive,
        // tipsArchiveLive: tipsArchiveLive,
        // dailyPicksDate: dailyPicksDate,
        // dailyPicksOdds: dailyPicksOdds,
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

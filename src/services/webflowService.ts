// @ts-nocheck
import { WebflowClient } from 'webflow-api';
import { DateTime } from 'luxon';
import Decimal from 'decimal.js';
import {bookmakerNameById} from '../utils';

class WebflowService {

  client;
  _siteId;
  _freePicksCollectionId;
  _premiumPicksCollectionId;
  _tipsArchiveCollectionId;
  _blogPostsCollectionId;
  _blogTagsCollectionId;
  _dailyPicksDateCollectionId;
  _dailyPicksDateItemId;
  _dailyPicksOddsCollectionId;
  _dailyPicksOddsItemId;
  _premiumPicksOddsCollectionId;
  _premiumPicksOddsItemId;

  constructor() {
    this.client = new WebflowClient({
      accessToken: process.env.WEBFLOW_ACCESS_TOKEN as string,
    });
    this._siteId = process.env.WEBFLOW_BETBRO_SITE_ID as string;
    this._freePicksCollectionId = process.env.WEBFLOW_BETBRO_FREE_PICKS_COLLECTION_ID as string;
    this._premiumPicksCollectionId = process.env.WEBFLOW_BETBRO_PREMIUM_PICKS_COLLECTION_ID as string;
    this._tipsArchiveCollectionId = process.env.WEBFLOW_BETBRO_TIPS_ARCHIVE_COLLECTION_ID as string;
    this._blogPostsCollectionId = process.env.WEBFLOW_BETBRO_BLOG_POSTS_COLLECTION_ID as string;
    this._blogTagsCollectionId = process.env.WEBFLOW_BETBRO_BLOG_TAGS_COLLECTION_ID as string;
    this._dailyPicksDateCollectionId = process.env.WEBFLOW_BETBRO_DAILY_PICKS_DATE_COLLECTION_ID as string;
    this._dailyPicksDateItemId = process.env.WEBFLOW_BETBRO_DAILY_PICKS_DATE_ITEM_ID as string;
    this._dailyPicksOddsCollectionId = process.env.WEBFLOW_BETBRO_DAILY_PICKS_ODDS_COLLECTION_ID as string;
    this._dailyPicksOddsItemId = process.env.WEBFLOW_BETBRO_DAILY_PICKS_ODDS_ITEM_ID as string;
    this._premiumPicksOddsCollectionId = process.env.WEBFLOW_BETBRO_PREMIUM_PICKS_ODDS_COLLECTION_ID as string;
    this._premiumPicksOddsItemId = process.env.WEBFLOW_BETBRO_PREMIUM_PICKS_ODDS_ITEM_ID as string;
  }

  async collectionsList() {
    try {
      return (await this.client.collections.list(this._siteId)).collections;
    } catch (error) {
      console.error('Webflow collectionsItemsListItemsLive error: ', error);
      throw error;
    }
  }

  async collectionsItemsListItemsLive(collectionId: string) {
    try {
      return (await this.client.collections.items.listItemsLive(collectionId)).items;
    } catch (error) {
      console.error('Webflow collectionsItemsListItemsLive error: ', error);
      throw error;
    }
  }

  async collectionsItemsListItemsStaged(collectionId: string) {
    try {
      return (await this.client.collections.items.listItems(collectionId)).items;
    } catch (error) {
      console.error('Webflow collectionsItemsListItemsStaged error: ', error);
      throw error;
    }
  }

  async collectionsItemsDeleteItemLive(collectionId: string, itemId: string) {
    try {
      return await this.client.collections.items.deleteItemLive(collectionId, itemId);
    } catch (error) {
      console.error('Webflow collectionsItemsDeleteItemLive error: ', error);
      throw error;
    }
  }

  async collectionsItemsDeleteItemStaged(collectionId: string, itemId: string) {
    try {
      return await this.client.collections.items.deleteItem(collectionId, itemId);
    } catch (error) {
      console.error('Webflow collectionsItemsDeleteItemStaged error: ', error);
      throw error;
    }
  }

  async collectionsItemsCreateItemLive(id: string, data: object) {
    try {
      return await this.client.collections.items.createItemLive(id ,data);
    } catch (error) {
      console.error('Webflow collectionsItemsCreateItemLive error: ', error);
      throw error;
    }
  }

  async collectionsItemsUpdateItemLive(collectionId: string, itemId: string, data: object) {
    try {
      return await this.client.collections.items.updateItemLive(collectionId, itemId, data);
    } catch (error) {
      console.error('Webflow collectionsItemsUpdateItemLive error: ', error);
      throw error;
    }
  }

  async updateFreePicksCollection(date: string, suggestions: object[]) {
    const collectionLiveItems = await this
      .collectionsItemsListItemsLive(this._freePicksCollectionId);
    for (let i = 0; i < collectionLiveItems.length; i++) {
      await this.collectionsItemsDeleteItemLive(this._freePicksCollectionId, collectionLiveItems[i].id);
    }

    const collectionLiveStaged = await this
      .collectionsItemsListItemsStaged(this._freePicksCollectionId);
    for (let i = 0; i < collectionLiveStaged.length; i++) {
      await this.collectionsItemsDeleteItemStaged(this._freePicksCollectionId, collectionLiveStaged[i].id);
    }

    for (let i = 0; i < suggestions.length; i++) {
      await this.collectionsItemsCreateItemLive(this._freePicksCollectionId, {
        "fieldData": {
          "start-date-time": DateTime.fromISO(date, { zone: 'utc' })
            .set({hour: 7, minute: 24, second: 0, millisecond: 0}),
          "reasoning-2": `<p id="">${suggestions[i]?.completion?.data?.comprehensive_detailed_reason}</p>`,
          "name": suggestions[i].completion.data.fixture,
          "odd": suggestions[i].completion.data.odd,
          "chance": suggestions[i].completion.data.probability,
          "tip-suggestion": `${suggestions[i].completion.data.bet}`,
          "slug": suggestions[i].completion.data.fixture.toLowerCase()
            .replaceAll(' ', '-')
            .replace(/[^_a-zA-Z0-9-]/g, ''),
          "bookmaker": bookmakerNameById(suggestions[i].selectedOdd.bookmaker_id),
        }
      });
    }

    await this.collectionsItemsUpdateItemLive(
      this._dailyPicksDateCollectionId,
      this._dailyPicksDateItemId,
      {
        "fieldData": {
          "name": DateTime.fromISO(date).toFormat("dd LLL, yyyy"),
          "slug": date,
        },
      }
    );

    const totalOdds = suggestions.reduce((sum, suggestion) =>
      sum.plus(new Decimal(suggestion.completion.data.odd)), new Decimal(0)
    );

    await this.collectionsItemsUpdateItemLive(
      this._dailyPicksOddsCollectionId,
      this._dailyPicksOddsItemId,
      {
        "fieldData": {
          "name": totalOdds.toFixed(2),
          "slug": totalOdds.toFixed(2)
            .replaceAll(',', '-')
            .replaceAll('.', '-'),
        },
      }
    );
  }

  async updatePremiumPicksCollection(date: string, suggestions: object[]) {
    const collectionLiveItems = await this
      .collectionsItemsListItemsLive(this._premiumPicksCollectionId);
    for (let i = 0; i < collectionLiveItems.length; i++) {
      await this.collectionsItemsDeleteItemLive(this._premiumPicksCollectionId, collectionLiveItems[i].id);
    }

    const collectionLiveStaged = await this
      .collectionsItemsListItemsStaged(this._premiumPicksCollectionId);
    for (let i = 0; i < collectionLiveStaged.length; i++) {
      await this.collectionsItemsDeleteItemStaged(this._premiumPicksCollectionId, collectionLiveStaged[i].id);
    }

    for (let i = 0; i < suggestions.length; i++) {
      await this.collectionsItemsCreateItemLive(this._premiumPicksCollectionId, {
        "fieldData": {
          "start-date-time": DateTime.fromISO(date, { zone: 'utc' })
            .set({hour: 7, minute: 24, second: 0, millisecond: 0}),
          "name": suggestions[i].completion.data.fixture,
          "odd": suggestions[i].completion.data.odd,
          "chance": suggestions[i].completion.data.probability,
          "slug": suggestions[i].completion.data.fixture.toLowerCase()
            .replaceAll(' ', '-')
            .replace(/[^_a-zA-Z0-9-]/g, ''),
        }
      });
    }

    const totalOdds = suggestions.reduce((sum, suggestion) =>
      sum.plus(new Decimal(suggestion.completion.data.odd)), new Decimal(0)
    );

    await this.collectionsItemsUpdateItemLive(
      this._premiumPicksOddsCollectionId,
      this._premiumPicksOddsItemId,
      {
        "fieldData": {
          "name": totalOdds.toFixed(2),
          "slug": totalOdds.toFixed(2)
            .replaceAll(',', '-')
            .replaceAll('.', '-'),
        },
      }
    );
  }

  async updateTipsArchiveCollection(date: string, suggestionRecap: object) {
    await this.collectionsItemsCreateItemLive(this._tipsArchiveCollectionId, {
      "fieldData": {
        "start-date-time": DateTime.fromISO(date, { zone: 'utc' })
          .set({hour: 7, minute: 24, second: 0, millisecond: 0}),
        "tip-suggestion": `${suggestionRecap.suggestion.bet}`,
        "chance": suggestionRecap.suggestion.probability,
        "odd": suggestionRecap.suggestion.odd,
        "name": suggestionRecap.fixture,
        "slug": suggestionRecap.fixture.toLowerCase()
          .replaceAll(' ', '-')
          .replace(/[^_a-zA-Z0-9-]/g, '')
        ,
        "result": `${suggestionRecap.result.scores.total.home}:${suggestionRecap.result.scores.total.away}`,
        "result-color-status": suggestionRecap.result.is_guessed === 'YES'
          ? "rgba(77, 255, 92, 0.15)"
          : "rgba(203, 21, 21, 0.35)",
      },
    });
  }
}

export default WebflowService;

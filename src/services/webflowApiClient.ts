import { WebflowClient } from 'webflow-api';

class WebflowApiClient {

  apiUrl;
  apiKey;
  headers;
  client;

  constructor() {
    this.client = new WebflowClient({
      accessToken: process.env.WEBFLOW_ACCESS_TOKEN as string,
    });
  }

  async sitesList() {
    try {
      return await this.client.sites.list();
    } catch (error) {
      console.error('Webflow sitesList error: ', error);
      throw error;
    }
  }

  async sitesGet(id: string) {
    try {
      return await this.client.sites.get(id);
    } catch (error) {
      console.error('Webflow sitesGet error: ', error);
      throw error;
    }
  }

  async collectionsList(id: string) {
    try {
      return await this.client.collections.list(id);
    } catch (error) {
      console.error('Webflow collectionsList error: ', error);
      throw error;
    }
  }

  async collectionsItemsListItemsLive(id: string) {
    try {
      return await this.client.collections.items.listItemsLive(id);
    } catch (error) {
      console.error('Webflow collectionsItemsListItemsLive error: ', error);
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
      console.error('Webflow collectionsItemsCreateItemLive error: ', error);
      throw error;
    }
  }

  async pagesList(id: string) {
    try {
      return await this.client.pages.list(id);
    } catch (error) {
      console.error('Webflow pagesList error: ', error);
      throw error;
    }
  }

  async componentsList(id: string) {
    try {
      return await this.client.components.list(id);
    } catch (error) {
      console.error('Webflow componentsList error: ', error);
      throw error;
    }
  }

  async componentsGetComponentContent(siteId: string, componentId: string) {
    try {
      return await this.client.components.getContent(siteId, componentId);
    } catch (error) {
      console.error('Webflow componentsGetComponentContent error: ', error);
      throw error;
    }
  }

  async componentsUpdateContent(siteId: string, componentId: string, data: any) {
    try {
      return await this.client.components.updateContent(siteId, componentId, data);
    } catch (error) {
      console.error('Webflow componentsUpdateContent error: ', error);
      throw error;
    }
  }
}

export default WebflowApiClient;

// const sitesList = await webflowApiClient.sitesList();
// const site = await webflowApiClient.sitesGet('676feaa93c62b8436477a51f');
// const collectionsList = await webflowApiClient.collectionsList('676feaa93c62b8436477a51f');
// const collectionsItemsListItemsLive = await webflowApiClient.collectionsItemsListItemsLive('67dc69263d21da4598df9b1b');
// const collectionsItemsCreateItemLive = await webflowApiClient.collectionsItemsCreateItemLive('67714ecf4c67470ab84768b2', {
//   "fieldData": {
//     "start-date-time": "2025-03-10T07:24:00.000Z",
//     "reasoning-2": "<p id=\"\">Beşiktaş has won 4 out of their last 5 games, showing strong form. Their home record is solid, with a 66.67% win rate. Gaziantep struggles defensively away, conceding 2.45 goals per game. Beşiktaş’s attacking play under new coach Solskjær has improved. Despite a calculated probability of 70% (below the ideal 80% threshold), this remains the best value bet at odds of 1.80.</p>",
//     "name": "Beşiktaş vs Gaziantep F.K.",
//     "odd": "1.89",
//     "chance": "70",
//     "tip-suggestion": "Beşiktaş -1.0 Asian Handicap",
//     "slug": "besiktas-vs-gaziantep-f-k"
//   }
// });
// const pagesList = await webflowApiClient.pagesList('676feaa93c62b8436477a51f');
// const componentsList = await webflowApiClient.componentsList('676feaa93c62b8436477a51f');
// const componentsGetContent = await webflowApiClient.componentsGetComponentContent('676feaa93c62b8436477a51f', '652fd792-abed-cb6a-5ad2-60335793a690');
// const componentUpdateContent = await webflowApiClient.componentsUpdateContent(
//   '676feaa93c62b8436477a51f',
//   '652fd792-abed-cb6a-5ad2-60335793a690',
//   {
//     // localeId: '67714ecf3cb7da95a814f477',
//     nodes: [
//       {
//         nodeId: '652fd792-abed-cb6a-5ad2-60335793a690',
//         text: 'Mar 20, 2025'
//       },
//     ],
//   },
// );
// const collectionsItemsCreateItemLive = await webflowApiClient.collectionsItemsUpdateItemLive(
//   '67dc69263d21da4598df9b1b',
//   '67dc6967ef72cb70a20d9ffc',
//   {
//       "fieldData": {
//         "name": "20 MAR, 2025",
//         "slug": "20-mar-2025"
//       },
//     }
//   );
//
// return res.status(422).json({
//   sitesList: sitesList,
//   site: site,
//   collectionsList: collectionsList,
//   collectionsItemsListItemsLive: collectionsItemsListItemsLive,
//   collectionsItemsCreateItemLive: collectionsItemsCreateItemLive,
//   pagesList: pagesList,
//   componentsList: componentsList,
//   componentsGetContent: componentsGetContent,
//   componentUpdateContent: componentUpdateContent,
// });

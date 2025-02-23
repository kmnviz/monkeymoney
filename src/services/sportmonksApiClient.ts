import axios from 'axios';
import { TFixture } from '../types/sportmonks/Fixture';
import { TLeague } from '../types/sportmonks/League';
import { TOdd } from '../types/sportmonks/Odd';
import { TBookmaker } from '../types/sportmonks/Bookmaker';
import { TType } from '../types/sportmonks/Type';
import { TMarket } from '../types/sportmonks/Market';
import { TSquad } from '../types/sportmonks/Squad';
import { ParticipantEnum } from '../enums/sportmonks';
import { pause, writeIntoFile } from '../utils';
import typesJson from '../database/sportmonks/types.json';
import marketsJson from '../database/sportmonks/markets.json';
import bookmakersJson from '../database/sportmonks/bookmakers.json';

class SportmonksApiClient {

  apiUrl: string;
  apiKey: string;
  headers: object;

  constructor() {
    this.apiUrl = process.env.SPORTMONKS_API_URL as string;
    this.apiKey = process.env.SPORTMONKS_API_KEY as string;
    this.headers = {
      'Accept': 'application/json',
    };
  }

  async getAllLeagues(): Promise<TLeague[]> {
    try {
      const response = await this.get(`/v3/football/leagues`);
      return response.data?.data;
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  }

  async getFixtureById(fixtureId: number) {
    try {
      const response = await this.get(`/v3/football/fixtures/${fixtureId}`, 'scores;participants');
      return response.data?.data;
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  }

  async getFixturesByDate(dateYYYYMMDD: string): Promise<TFixture[]> {
    try {
      const fixtures: any[] | never = [];

      let hasMore = true;
      let currentPage = 1;
      while (hasMore) {
        const response = await this
          .get(
            `/v3/football/fixtures/date/${dateYYYYMMDD}`,
            'participants',
            '50',
            currentPage,
          );

        if (response.data.data) fixtures.push(response.data.data);
        hasMore = response.data.pagination;
        currentPage += 1;

        // await pause(1500);
      }

      return fixtures.flat();
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  }

  async getFixturesByHeadToHead(teamAId: number, teamBId: number): Promise<TFixture[]> {
    try {
      const fixtures: any[] | never = [];

      let hasMore = true;
      let currentPage = 1;
      while (hasMore) {
        const response = await this
          .get(
            `/v3/football/fixtures/head-to-head/${teamAId}/${teamBId}`,
            '',
            '50',
            currentPage,
          );

        if (response.data.data) fixtures.push(response.data.data);
        hasMore = response.data.pagination;
        currentPage += 1;

        // await pause(1500);
      }

      return fixtures.flat();
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  }

  async getSeasonStatisticsByParticipant(participant: ParticipantEnum, id: number) {
    try {
      const response = await this.get(`/v3/football/statistics/seasons/${participant}/${id}`);
      return response.data?.data;
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  }

  async getTeamById(teamId: number) {
    try {
      const response = await this.get(`/v3/football/teams/${teamId}`);
      return response.data?.data;
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  }

  async getTeamSquadByTeamId(teamId: number): Promise<TSquad[]> {
    try {
      const response = await this.get(`/v3/football/squads/teams/${teamId}`, 'player');
      return response.data?.data;
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  }

  async getOddsByFixtureId(fixtureId: number): Promise<TOdd[]> {
    try {
      const response = await this.get(`/v3/football/odds/pre-match/fixtures/${fixtureId}`);
      return response.data?.data;
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  }

  async getOddsByFixtureIdAndBookmakerId(fixtureId: number, bookmakerId: number): Promise<TOdd[]> {
    try {
      const response = await this.get(`/v3/football/odds/pre-match/fixtures/${fixtureId}/bookmakers/${bookmakerId}`);
      return response.data?.data;
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  }

  async getAllBookmakers(): Promise<TBookmaker[]> {
    if (bookmakersJson.length > 0) {
      return bookmakersJson as TBookmaker[];
    }

    try {
      const bookmakers: any[] | never = [];

      let hasMore = true;
      let currentPage = 1;
      while (hasMore) {
        const response = await this
          .get(
            `/v3/odds/bookmakers`,
            '',
            '50',
            currentPage,
          );

        if (response.data.data) bookmakers.push(response.data.data);
        hasMore = response.data.pagination;
        currentPage += 1;

        await pause(1500);
      }

      await writeIntoFile(bookmakers.flat(), '/sportmonks/bookmakers.json');
      console.log(`stored sportmonks/bookmakers.json file.`);

      return bookmakers.flat();
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  }

  async getAllTypes(): Promise<TType[]> {
    if (typesJson.length > 0) {
      return typesJson as TType[];
    }

    try {
      const types: any[] | never = [];

      let hasMore = true;
      let currentPage = 1;
      while (hasMore) {
        const response = await this
          .get(
            `/v3/core/types`,
            '',
            '50',
            currentPage,
          );

        if (response.data.data) types.push(response.data.data);
        hasMore = response.data.pagination;
        currentPage += 1;

        await pause(1500);
      }

      await writeIntoFile(types.flat(), '/sportmonks/types.json');
      console.log(`stored sportmonks/types.json file.`);

      return types.flat();
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  }

  async getAllMarkets(): Promise<TMarket[]> {
    if (marketsJson.length > 0) {
      return marketsJson as TMarket[];
    }

    try {
      const markets: any[] | never = [];

      let hasMore = true;
      let currentPage = 1;
      while (hasMore) {
        const response = await this
          .get(
            `/v3/odds/markets`,
            '',
            '50',
            currentPage,
          );

        if (response.data.data) markets.push(response.data.data);
        hasMore = response.data.pagination;
        currentPage += 1;

        await pause(1500);
      }

      await writeIntoFile(markets.flat(), '/sportmonks/markets.json');
      console.log(`stored sportmonks/markets.json file.`);

      return markets.flat();
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  }

  async getPostMatchNews(): Promise<TType[]> {
    try {
      const news: any[] | never = [];

      let hasMore = true;
      let currentPage = 1;
      while (hasMore) {
        const response = await this
          .get(
            `/v3/football/news/post-match`,
            '',
            '50',
            currentPage,
          );

        if (response.data.data) news.push(response.data.data);
        hasMore = response.data.pagination;
        currentPage += 1;

        await pause(1500);
      }

      return news.flat();
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  }

  private get(path, include = '', perPage = '', page = 0) {
    const incl = include ? `&include=${include}` : '';
    const perp = perPage ? `&per_page=${perPage}` : '';
    const pag = page ? `&page=${page}` : '';

    return axios
      .get(`${this.apiUrl}${path}?api_token=${this.apiKey}${incl}${perp}${pag}`, this.headers);
  }
}

export default SportmonksApiClient;

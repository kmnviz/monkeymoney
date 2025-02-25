import axios from 'axios';
import {TFixture} from '../types/sportmonks/Fixture';
import {TLeague} from '../types/sportmonks/League';
import {TOdd} from '../types/sportmonks/Odd';
import {TBookmaker} from '../types/sportmonks/Bookmaker';
import {TType} from '../types/sportmonks/Type';
import {TMarket} from '../types/sportmonks/Market';
import {TSquad} from '../types/sportmonks/Squad';
import {TSeason} from '../types/sportmonks/Seaason';
import {TSchedule} from '../types/sportmonks/Schedule';
import {TStanding} from '../types/sportmonks/Standing';
import {TRound} from '../types/sportmonks/Round';
import {ParticipantEnum} from '../enums/sportmonks';
import {pause, writeIntoFile} from '../utils';
import typesJson from '../database/sportmonks/types.json';
import marketsJson from '../database/sportmonks/markets.json';
import bookmakersJson from '../database/sportmonks/bookmakers.json';
import leaguesJson from '../database/sportmonks/leagues.json';
import seasonsJson from '../database/sportmonks/seasons.json';

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
    if (leaguesJson.length > 0) {
      return leaguesJson as TLeague[];
    }

    try {
      const leagues: any[] | never = [];

      let hasMore = true;
      let currentPage = 1;
      while (hasMore) {
        const response = await this
          .get(
            `/v3/football/leagues`,
            '',
            '50',
            currentPage,
          );

        if (response.data.data) leagues.push(response.data.data);
        hasMore = response.data.pagination;
        currentPage += 1;

        // await pause(1500);
      }

      await writeIntoFile(leagues.flat(), '/sportmonks/leagues.json');
      console.log(`stored sportmonks/leagues.json file.`);

      return leagues.flat();
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  }

  async getAllSeasons(): Promise<TSeason[]> {
    if (seasonsJson.length > 0) {
      return seasonsJson as TSeason[];
    }

    try {
      const seasons: any[] | never = [];

      let hasMore = true;
      let currentPage = 1;
      while (hasMore) {
        const response = await this
          .get(
            `/v3/football/seasons`,
            '',
            '50',
            currentPage,
          );

        if (response.data.data) seasons.push(response.data.data);
        hasMore = response.data.pagination;
        currentPage += 1;

        await pause(1500);
      }

      await writeIntoFile(seasons.flat(), '/sportmonks/seasons.json');
      console.log(`stored sportmonks/seasons.json file.`);

      return seasons.flat();
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  }

  async getAllRounds(): Promise<TRound[]> {
    // if (seasonsJson.length > 0) {
    //   return seasonsJson as TSeason[];
    // }

    try {
      const rounds: any[] | never = [];

      let hasMore = true;
      let currentPage = 1;
      while (hasMore) {
        const response = await this
          .get(
            `/v3/football/rounds`,
            '',
            '50',
            currentPage,
          );

        if (response.data.data) rounds.push(response.data.data);
        hasMore = response.data.pagination;
        currentPage += 1;

        await pause(1500);
      }

      await writeIntoFile(rounds.flat(), '/sportmonks/rounds.json');
      console.log(`stored sportmonks/rounds.json file.`);

      return rounds.flat();
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  }

  async getFixtureById(fixtureId: number): Promise<TFixture> {
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

  async getSchedulesByTeamId(teamId: number): Promise<TSchedule[]> {
    try {
      const response = await this.get(`/v3/football/schedules/teams/${teamId}`);
      return response.data?.data;
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  }

  async getSchedulesBySeasonIdAndTeamId(seasonId: number, teamId: number): Promise<TSchedule[]> {
    try {
      const response = await this.get(`/v3/football/schedules/seasons/${seasonId}/teams/${teamId}`);
      return response.data?.data;
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
      const response = await this.get(`/v3/football/teams/${teamId}`, 'activeSeasons;players;coaches');
      return response.data?.data;
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  }

  async getPlayerById(playerId: number) {
    try {
      const response = await this.get(`/v3/football/players/${playerId}`, '');
      return response.data?.data;
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  }

  async getCoachById(coachId: number) {
    try {
      const response = await this.get(`/v3/football/coaches/${coachId}`, '');
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

  async getStandingsBySeasonId(seasonId: number): Promise<TStanding[]> {
    try {
      const response = await this.get(`/v3/football/standings/seasons/${seasonId}`);
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

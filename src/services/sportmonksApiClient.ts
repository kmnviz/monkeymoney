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
import {TTeam} from '../types/sportmonks/Team';
import {ParticipantEnum} from '../enums/sportmonks';
import {pause, writeIntoFile} from '../utils';
import typesJson from '../database/sportmonks/types.json';
import marketsJson from '../database/sportmonks/markets.json';
import bookmakersJson from '../database/sportmonks/bookmakers.json';
import leaguesJson from '../database/sportmonks/leagues.json';
import seasonsJson from '../database/sportmonks/seasons.json';
import venuesJson from '../database/sportmonks/venues.json';
import teamsJson from '../database/sportmonks/teams.json';

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

  async getLeagueById(leagueId: number): Promise<TRound> {
    try {
      const response = await this.get(`/v3/football/leagues/${leagueId}`, 'stages;latest;upcoming');
      return response.data?.data;
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
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

  async getSeasonById(seasonId: number): Promise<TRound> {
    try {
      const response = await this.get(`/v3/football/seasons/${seasonId}`, '');
      return response.data?.data;
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  }

  async getAllSeasons(): Promise<TSeason[]> {
    // if (seasonsJson.length > 0) {
    //   return seasonsJson as TSeason[];
    // }

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

        // await pause(1500);
      }

      await writeIntoFile(seasons.flat(), '/sportmonks/seasons.json');
      console.log(`stored sportmonks/seasons.json file.`);

      return seasons.flat();
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  }

  async getRoundById(roundId: number): Promise<TRound> {
    try {
      const response = await this.get(`/v3/football/rounds/${roundId}`, 'fixtures');
      return response.data?.data;
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

  async getFixtureById(fixtureId: number, includes = ''): Promise<TFixture> {
    try {
      const response = await this.get(`/v3/football/fixtures/${fixtureId}`, includes);
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
            'participants;lineups',
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

  async getFixturesByDateRangeForTeam(startDate: string, endDate: string, teamId: number, includes = ''): Promise<TFixture[]> {
    try {
      const fixtures: any[] | never = [];

      let hasMore = true;
      let currentPage = 1;
      while (hasMore) {
        const response = await this
          .get(
            `/v3/football/fixtures/between/${startDate}/${endDate}/${teamId}`,
            includes,
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
      const response = await this.get(`/v3/football/players/${playerId}`, 'statistics');
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

  async getAllTeams(): Promise<TTeam[]> {
    if (teamsJson.length > 0) {
      return teamsJson as TTeam[];
    }

    try {
      const teams: any[] | never = [];

      let hasMore = true;
      let currentPage = 1;
      while (hasMore) {
        const response = await this
          .get(
            `/v3/football/teams`,
            '',
            '50',
            currentPage,
          );

        if (response.data.data) teams.push(response.data.data);
        hasMore = response.data.pagination;
        currentPage += 1;

        // await pause(1500);
      }

      await writeIntoFile(teams.flat(), '/sportmonks/teams.json');
      console.log(`stored sportmonks/teams.json file.`);

      return teams.flat();
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  }

  async getAllVenues(): Promise<TMarket[]> {
    if (venuesJson.length > 0) {
      return venuesJson as TMarket[];
    }

    try {
      const venues: any[] | never = [];

      let hasMore = true;
      let currentPage = 1;
      while (hasMore) {
        const response = await this
          .get(
            `/v3/football/venues`,
            '',
            '50',
            currentPage,
          );

        if (response.data.data) venues.push(response.data.data);
        hasMore = response.data.pagination;
        currentPage += 1;

        // await pause(1500);
        console.log('currentPage: ', currentPage);
      }

      await writeIntoFile(venues.flat(), '/sportmonks/venues.json');
      console.log(`stored sportmonks/venues.json file.`);

      return venues.flat();
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

  private async get(path, include = '', perPage = '', page = 0, retries = 3, delay = 60 * 1000) {
    const incl = include ? `&include=${include}` : '';
    const perp = perPage ? `&per_page=${perPage}` : '';
    const pag = page ? `&page=${page}` : '';
    const url = `${this.apiUrl}${path}?api_token=${this.apiKey}${incl}${perp}${pag}`;

    let attempt = 0;
    while (attempt < retries) {
      try {
        return await axios.get(url, this.headers);
      } catch (error) {
        attempt++;
        console.error(`SportmonksApiClient.get attempt ${attempt} failed. Error: ${error.message}`);

        if (attempt >= retries) {
          throw new Error(`SportmonksApiClient.get request failed after ${retries} attempts: ${error.message}`);
        }

        console.log(`SportmonksApiClient.get retrying in ${delay}ms...`);
        await pause(delay);
      }
    }

    return axios.get(url, this.headers);
  }
}

export default SportmonksApiClient;

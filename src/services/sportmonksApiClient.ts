import axios from 'axios';
import { TFixture } from '../types/sportmonks/Fixture';
import { TLeague } from '../types/sportmonks/League';
import { TOdd } from '../types/sportmonks/Odd';
import { TBookmaker } from '../types/sportmonks/Bookmaker';
import { TType } from '../types/sportmonks/Type';
import { ParticipantEnum } from '../enums/sportmonks';
import { pause, writeIntoFile } from '../utils';

class SportmonksApiClient {

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
    }
  }

  async getFixturesByDate(dateYYYYMMDD: string): Promise<TFixture[]> {
    try {
      const fixtures = [];

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

        fixtures.push(response.data.data);
        hasMore = response.data.pagination;
        currentPage += 1;

        await pause(1500);
      }

      return fixtures.flat();
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async getSeasonStatisticsByParticipant(participant: ParticipantEnum, id: number) {
    try {
      const response = await this.get(`/v3/football/statistics/seasons/${participant}/${id}`);
      return response.data?.data;
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async getOddsByFixtureId(fixtureId: number): Promise<TOdd[]> {
    try {
      const response = await this.get(`/v3/football/odds/pre-match/fixtures/${fixtureId}`);
      return response.data?.data;
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async getOddsByFixtureIdAndBookmakerId(fixtureId: number, bookmakerId: number): Promise<TOdd[]> {
    try {
      const response = await this.get(`/v3/football/odds/pre-match/fixtures/${fixtureId}/bookmakers/${bookmakerId}`);
      return response.data?.data;
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async getAllBookmakers(): Promise<TBookmaker[]> {
    try {
      const bookmakers = [];

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

        bookmakers.push(response.data.data);
        hasMore = response.data.pagination;
        currentPage += 1;

        await pause(1500);
      }

      return bookmakers.flat();
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async getAllTypes(): Promise<TType[]> {
    try {
      const types = [];

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

        types.push(response.data.data);
        hasMore = response.data.pagination;
        currentPage += 1;

        await pause(1500);
      }

      await writeIntoFile(types.flat(), '/sportmonks/types.json');
      console.log(`stored sportmonks/types.json file.`);

      return types.flat();
    } catch (error) {
      console.log('error: ', error);
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

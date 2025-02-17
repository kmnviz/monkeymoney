import axios from 'axios';
import { TDailySchedule } from '../types/sportradar/DailySchedule';
import { TSportEventMarket } from '../types/sportradar/SportEventMarket';

class SportradarApiClient {

  constructor() {
    this.apiUrl = process.env.SPORTRADAR_API_URL as string;
    this.apiKey = process.env.SPORTRADAR_API_KEY as string;
    this.headers = {
      'Accept': 'application/json',
    };
  }

  async dailySchedules(dateYYYYMMDD: string): Promise<TDailySchedule[]> {
    try {
      const response = await this.get(`/soccer/trial/v4/en/schedules/${dateYYYYMMDD}/schedules.json`);
      return response.data?.schedules;
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async sportEventMarkets(sportEventId: string): Promise<TSportEventMarket[]> {
    try {
      const encodedSportEventId = encodeURIComponent(sportEventId);
      const response = await this.get(`/oddscomparison-prematch/trial/v2/en/sport_events/${encodedSportEventId}/sport_event_markets.json`);
      return response.data?.markets;
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async competitorSummaries(competitorId: string){
    try {
      const encodedCompetitorId = encodeURIComponent(competitorId);
      const response = await this.get(`/soccer/trial/v4/en/competitors/${encodedCompetitorId}/summaries.json`);
      return response.data?.summaries;
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async competitorVsCompetitor(competitor1Id: string, competitor2Id: string) {
    try {
      const encodedCompetitor1Id = encodeURIComponent(competitor1Id);
      const encodedCompetitor2Id = encodeURIComponent(competitor2Id);
      const response = await this.get(`/soccer/trial/v4/en/competitors/${encodedCompetitor1Id}/versus/${encodedCompetitor2Id}/summaries.json`);
      return response.data?.last_meetings;
    } catch (error) {
      console.log('error: ', error);
    }
  }

  private get(path) {
    return axios.get(`${this.apiUrl}${path}?api_key=${this.apiKey}`, this.headers);
  }
}

export default SportradarApiClient;

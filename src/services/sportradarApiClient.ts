import axios from 'axios';
import TDailySchedule from '../types/DailySchedule';

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
      const response = await this.get(`/schedules/${dateYYYYMMDD}/schedules.json`);
      return response.data?.schedules;
    } catch (error) {
      console.log('error: ', error);
    }
  }

  private get(path) {
    return axios.get(`${this.apiUrl}${path}?api_key=${this.apiKey}`, this.headers);
  }
}

export default SportradarApiClient;

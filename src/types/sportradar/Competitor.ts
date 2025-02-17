import { TStatisticsCompetitor } from './statistics/Competitor';
import { TStatisticsPlayer } from './statistics/Player';

export type Competitor = {
  "id": string, // "sr:competitor:3218",
  "name": string, // "CA Lanus",
  "country"?: string, // "Argentina",
  "country_code"?: string, // "ARG",
  "abbreviation": string, // "LAN",
  "qualifier": string, // "home",
  "gender"?: string, // "male"
  "statistics"?: TStatisticsCompetitor,
  "players"?: TStatisticsPlayer,
};

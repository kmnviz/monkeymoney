import {TScore} from './Score';
import {TTeam} from './Team';

export type TFixture = {
  "id": number, // 19146700,
  "sport_id": number, // 1,
  "league_id": number, //  501,
  "season_id": number, //  23690,
  "stage_id": number, //  77471570,
  "group_id"?: number, // null,
  "aggregate_id"?: number, //  null,
  "round_id": number, //  340573,
  "state_id": number, //  5,
  "venue_id": number, //  8879,
  "name": string, // "St. Mirren vs Hibernian",
  "starting_at": string, // "2024-08-04 14:00:00",
  "result_info": string, // "St. Mirren won after full-time.",
  "leg": string, // "1/1",
  "details": number, //  null,
  "length": number, //  90,
  "placeholder": boolean, // false,
  "has_odds": boolean, // true,
  "has_premium_odds": boolean, // true,
  "starting_at_timestamp": number, // 1722780000
  "participants": TTeam[],
  "scores"?: TScore[]
}

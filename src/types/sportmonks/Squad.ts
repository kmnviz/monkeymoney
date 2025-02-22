import { TPlayer } from './Player';

export type TSquad = {
  "id": number, // 635741,
  "transfer_id": number, // 184008,
  "player_id": number, // 581086,
  "team_id": number, // 62,
  "position_id": number, // 26,
  "detailed_position_id": number, // 157,
  "jersey_number": number, // 13,
  "start": string, // "2023-01-23",
  "end": string | null, // null
  "player": TPlayer,
};

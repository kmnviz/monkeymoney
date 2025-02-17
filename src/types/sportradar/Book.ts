import { TOutcome } from './Outcome';

export type TBook = {
  "id": string, // "sr:book:17324",
  "name": string, // "MGM",
  "removed": boolean, // false,
  "external_sport_event_id": string, // "2:7534610",
  "external_market_id": string, // "174359241",
  "outcomes": TOutcome[],
};

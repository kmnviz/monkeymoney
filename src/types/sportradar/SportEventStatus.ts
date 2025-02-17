import { TPeriodScore } from './PeriodScore';
import { TBallLocation } from './BallLocation';
import { TMatchSituation } from './MatchSituation';

export type SportEventStatus = {
  "status": string, // "closed",
  "match_status": string, // "ended",
  "home_score"?: number, // 3,
  "away_score"?: number, // 1,
  "winner_id"?: string, // "sr:competitor:2706",
  "period_scores"?: TPeriodScore[],
  "ball_locations"?: TBallLocation[],
  "match_situation"?: TMatchSituation
};

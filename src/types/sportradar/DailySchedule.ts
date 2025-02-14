export type DailySchedule = {
  sport_event: {
    "id": string, // "sr:sport_event:56380079",
    "start_time": string, // "2025-02-01T00:00:00+00:00",
    "start_time_confirmed": boolean, // true,
    "sport_event_context": {
      "sport": {
        "id": string, // "sr:sport:1",
        "name": string, // "Soccer"
      },
      "category": {
        "id": string, // "sr:category:527",
        "name": string, // "Trinidad and Tobago",
        "country_code": string, // "TTO"
      },
      "competition": {
        "id": string, // "sr:competition:19252",
        "name": string, // "TT Premier League",
        "gender": string, // "men"
      },
      "season": {
        "id": string, // "sr:season:127065",
        "name": string, // "TT Premier League 24/25",
        "start_date": string, // "2024-12-06",
        "end_date": string, // "2025-02-16",
        "year": string, // "24/25",
        "competition_id": string, // "sr:competition:19252"
      },
      "stage": {
        "order": number, // 1,
        "type": string, // "league",
        "phase": string, // "regular season",
        "start_date": string, // "2024-12-06",
        "end_date": string, // "2025-02-16",
        "year": string, // "24/25"
      },
      "round": {
        "number": number, // 1
      },
      "groups": [
        {
          "id": string, // "sr:league:89453",
          "name": string, // "TT Premier League 24/25"
        }
      ],
    },
    "coverage": {
      "type": string, // "sport_event",
      "sport_event_properties": {
        "lineups": boolean, // false,
        "venue": boolean, // false,
        "extended_player_stats": boolean, // false,
        "extended_team_stats": boolean, // false,
        "ballspotting": boolean, // false,
        "commentary": boolean, // false,
        "fun_facts": boolean, // false,
        "goal_scorers": boolean, // false,
        "scores": string, // "post",
        "game_clock": boolean, // false,
        "deeper_play_by_play": boolean, // false,
        "deeper_player_stats": boolean, // false,
        "deeper_team_stats": boolean, // false,
        "basic_play_by_play": boolean, // false,
        "basic_player_stats": boolean, // false,
        "basic_team_stats": boolean, // false
      }
    },
    "competitors": [
      {
        "id": string, // "sr:competitor:315139",
        "name": string, // "La Horquetta Rangers FC",
        "country": string, // "Trinidad and Tobago",
        "country_code": string, // "TTO",
        "abbreviation": string, // "HOR",
        "qualifier": string, // "home",
        "gender": string, // "male"
      },
      {
        "id": string, // "sr:competitor:591943",
        "name": string, // "Cunupia FC",
        "country": string, // "Trinidad and Tobago",
        "country_code": string, // "TTO",
        "abbreviation": string, // "CUN",
        "qualifier": string, // "away",
        "gender": string, // "male"
      }
    ],
    "sport_event_conditions": {
      "ground": {
        "neutral": boolean, // false
      }
    },
  },
  "sport_event_status": {
    "status": string, // "not_started",
    "match_status": string, // "not_started"
  },
}

export type TCompetitorSummary = {
  "sport_event": {
    "id": string, // "sr:sport_event:53152529",
    "start_time": string, // "2025-01-29T20:00:00+00:00",
    "start_time_confirmed": boolean, // true,
    "sport_event_context": {
      "sport": {
        "id": string, // "sr:sport:1",
        "name": string, // "Soccer"
      },
      "category": {
        "id": string, // "sr:category:393",
        "name": string, // "International Clubs"
      },
      "competition": {
        "id": string, // "sr:competition:7",
        "name": string, // "UEFA Champions League",
        "gender": string, // "men"
      },
      "season": {
        "id": string, // "sr:season:119239",
        "name": string, // "UEFA Champions League 24/25",
        "start_date": string, // "2024-07-09",
        "end_date": string, // "2025-05-31",
        "year": string, // "24/25",
        "competition_id": string, // "sr:competition:7"
      },
      "stage": {
        "order": number, // 3,
        "type": string, // "league",
        "phase": string, // "regular season",
        "start_date": string, // "2024-09-17",
        "end_date": string, // "2025-01-29",
        "year": string, // "24/25"
      },
      "round": {
        "number": number, // 8
      },
      "groups": [
        {
          "id": string, // "sr:league:84079",
          "name": string, // "UEFA Champions League 24/25"
        }
      ],
    },
    "coverage": {
      "type": string, // "sport_event",
        "sport_event_properties": {
        "lineups": boolean, // true,
        "venue": boolean, // true,
        "extended_player_stats": boolean, // true,
        "extended_team_stats": boolean, // true,
        "lineups_availability": string, // "pre",
        "ballspotting": boolean, // true,
        "commentary": boolean, // true,
        "fun_facts": boolean, // true,
        "goal_scorers": boolean, // true,
        "scores": string, // "live",
        "game_clock": boolean, // true,
        "deeper_play_by_play": boolean, // true,
        "deeper_player_stats": boolean, // true,
        "deeper_team_stats": boolean, // true,
        "basic_play_by_play": boolean, // true,
        "basic_player_stats": boolean, // true,
        "basic_team_stats": boolean, // true
      }
    },
    "competitors": [
      {
        "id": string, // "sr:competitor:2687",
        "name": string, // "Juventus Turin",
        "country": string, // "Italy",
        "country_code": string, // "ITA",
        "abbreviation": string, // "JUV",
        "qualifier": string, // "home",
        "gender": string, // "male"
      },
      {
        "id": string, // "sr:competitor:3006",
        "name": string, // "SL Benfica",
        "country": string, // "Portugal",
        "country_code": string, // "PRT",
        "abbreviation": string, // "BEN",
        "qualifier": string, // "away",
        "gender": string, // "male"
      },
    ],
    "venue": {
      "id": string, // "sr:venue:2657",
      "name": string, // "Allianz Stadium",
      "capacity": number, // 41507,
      "city_name": string, // "Turin",
      "country_name": string, // "Italy",
      "map_coordinates": string, // "45.109444,7.641111",
      "country_code": string, // "ITA",
      "timezone": string, // "Europe/Rome"
    },
    "channels": [
      {
        "name": string, // "Sky Sport Uno HD - Hot Bird 1/2/3/4/6 (13.0E)",
        "url": string, // "https://guidatv.sky.it/sport-e-calcio?vista=griglia",
        "country": string, // "Italy",
        "country_code": string, // "ITA"
      },
      {
        "name": string, // "SKY Sport 252 HD - Hot Bird 1/2/3/4/6 (13.0E)",
        "url": string, // "https://guidatv.sky.it/sport-e-calcio?vista=griglia",
        "country": string, // "Italy",
        "country_code": string, // "ITA"
      },
      {
        "name": string, // "Sport TV5 HD - Hispasat 1B/1C/1D (30.0 W) - NOS PT",
        "url": string, // "https://www.sporttv.pt/guia",
        "country": string, // "Portugal",
        "country_code": string, // "PRT"
      },
      {
        "name": string, // "Paramount+",
        "url": string, // "https://worldsoccertalk.com/serie-a-tv-schedule/",
        "country": string, // "United States",
        "country_code": string, // "USA"
      },
      {
        "name": string, // "ViX+",
        "country": string, // "United States",
        "country_code": string, // "USA"
      },
      {
        "name": string, // "Canal+ Live 8 HD FR - Astra 1C-1H / 2C (19.2E)",
        "url": string, // "https://www.footao.tv/",
        "country": string, // "France",
        "country_code": string, // "FRA"
      },
    ],
    "sport_event_conditions": {
      "referees": [
        {
          "id": string, // "sr:referee:69579",
          "name": string, // "Kovacs, Istvan",
          "nationality": string, // "Romania",
          "country_code": string, // "ROU",
          "type": string, // "main_referee"
        },
        {
          "id": string, // "sr:referee:83536",
          "name": string, // "Marica, Mihai Marius",
          "nationality": string, // "Romania",
          "country_code": string, // "ROU",
          "type": string, // "first_assistant_referee"
        },
        {
          "id": string, // "sr:referee:2712460",
          "name": string, // "Tunyogy, Ferencz",
          "nationality": string, // "Romania",
          "country_code": string, // "ROU",
          "type": string, // "second_assistant_referee"
        },
        {
          "id": string, // "sr:referee:225478",
          "name": string, // "Fesnic Mircea, Horatiu",
          "nationality": string, // "Romania",
          "country_code": string, // "ROU",
          "type": string, // "fourth_official"
        },
        {
          "id": string, // "sr:referee:52562",
          "name": string, // "van Boekel, Paulus",
          "nationality": string, // "Netherlands",
          "country_code": string, // "NLD",
          "type": string, // "video_assistant_referee"
        }
      ],
      "attendance": {
      "count": number, // 41402
    },
    "weather": {
      "pitch_conditions": string, // "good",
      "overall_conditions": string, // "good"
    },
    "ground": {
      "neutral": boolean, // false
    },
    "lineups": {
      "confirmed": boolean, // true
    }
  }
  },
  "sport_event_status": {
    "status": string, // "closed",
    "match_status": string, // "ended",
    "home_score": number, // 0,
    "away_score": number, // 2,
    "winner_id": string, // "sr:competitor:3006",
    "period_scores": [
      {
        "home_score": number, // 0,
        "away_score": number, // 1,
        "type": string, // "regular_period",
        "number": number, // 1
      },
      {
        "home_score": number, // 0,
        "away_score": number, // 1,
        "type": string, // "regular_period",
        "number": number, // 2
      }
    ],
    "ball_locations": [
      {
        "order": number, // 4,
        "x": number, // 65,
        "y": number, // 94,
        "qualifier": string, // "away"
      },
      {
        "order": number, // 3,
        "x": number, // 80,
        "y": number, // 100,
        "qualifier": string, // "away"
      },
      {
        "order": number, // 2,
        "x": number, // 83,
        "y": number, // 99,
        "qualifier": string, // "home"
      },
      {
        "order": number, // 1,
        "x": number, // 59,
        "y": number, // 60,
        "qualifier": string, // "home"
      }
    ],
    "match_situation": {
      "status": string, // "safe",
      "qualifier": string, // "away",
      "updated_at": string, // "2025-01-29T21:53:29+00:00"
    }
  },
  "statistics": {
    "totals": {
      "competitors": [
        {
          "id": string, // "sr:competitor:2687",
          "name": string, // "Juventus Turin",
          "abbreviation": string, // "JUV",
          "qualifier": string, // "home",
          "statistics": {
            "ball_possession": number, // 63,
            "cards_given": number, // 1,
            "corner_kicks": number, // 7,
            "fouls": number, // 8,
            "free_kicks": number, // 7,
            "goal_kicks": number, // 4,
            "injuries": number, // 2,
            "offsides": number, // 3,
            "red_cards": number, // 0,
            "shots_blocked": number, // 6,
            "shots_off_target": number, // 4,
            "shots_on_target": number, // 5,
            "shots_saved": number, // 5,
            "shots_total": number, // 15,
            "substitutions": number, // 3,
            "throw_ins": number, // 21,
            "yellow_cards": number, // 1,
            "yellow_red_cards": number, // 0
          },
          "players": [
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 0,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 0,
                "shots_off_target": number, // 0,
                "shots_on_target": number, // 0,
                "substituted_in": number, // 0,
                "substituted_out": number, // 0,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:46420",
              "name": string, // "Pinsoglio, Carlo",
              "starter": boolean, // false
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 0,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 0,
                "shots_off_target": number, // 0,
                "shots_on_target": number, // 0,
                "substituted_in": number, // 0,
                "substituted_out": number, // 0,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:79645",
              "name": string, // "Perin, Mattia",
              "starter": boolean, // true
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 0,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 0,
                "shots_off_target": number, // 0,
                "shots_on_target": number, // 0,
                "substituted_in": number, // 1,
                "substituted_out": number, // 0,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:363860",
              "name": string, // "Locatelli, Manuel",
              "starter": boolean, // false
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 1,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 0,
                "shots_off_target": number, // 0,
                "shots_on_target": number, // 0,
                "substituted_in": number, // 1,
                "substituted_out": number, // 0,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:815734",
              "name": string, // "Koopmeiners, Teun",
              "starter": boolean, // false
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 0,
                "goals_scored": number, // 0,
                "offsides": number, // 2,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 2,
                "shots_off_target": number, // 1,
                "shots_on_target": number, // 0,
                "substituted_in": number, // 0,
                "substituted_out": number, // 0,
                "yellow_cards": number, // 1,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:963211",
              "name": string, // "Vlahovic, Dusan",
              "starter": boolean, // true
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 0,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 0,
                "shots_off_target": number, // 0,
                "shots_on_target": number, // 0,
                "substituted_in": number, // 0,
                "substituted_out": number, // 0,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:1010329",
              "name": string, // "Di Gregorio, Michele",
              "starter": boolean, // false
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 0,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 0,
                "shots_off_target": number, // 0,
                "shots_on_target": number, // 0,
                "substituted_in": number, // 0,
                "substituted_out": number, // 0,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:1047121",
              "name": string, // "McKennie, Weston",
              "starter": boolean, // true
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 0,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 0,
                "shots_off_target": number, // 0,
                "shots_on_target": number, // 1,
                "substituted_in": number, // 0,
                "substituted_out": number, // 0,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:1056851",
              "name": string, // "Weah, Tim",
              "starter": boolean, // true
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 3,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 1,
                "shots_off_target": number, // 0,
                "shots_on_target": number, // 1,
                "substituted_in": number, // 0,
                "substituted_out": number, // 0,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:1111765",
              "name": string, // "Luiz, Douglas",
              "starter": boolean, // true
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 0,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 0,
                "shots_off_target": number, // 1,
                "shots_on_target": number, // 0,
                "substituted_in": number, // 1,
                "substituted_out": number, // 0,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:1296654",
              "name": string, // "Gonzalez, Nico",
              "starter": boolean, // false
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 0,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 0,
                "shots_off_target": number, // 0,
                "shots_on_target": number, // 0,
                "substituted_in": number, // 0,
                "substituted_out": number, // 0,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:1297932",
              "name": string, // "Fagioli, Nicolo",
              "starter": boolean, // false
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 0,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 0,
                "shots_off_target": number, // 0,
                "shots_on_target": number, // 1,
                "substituted_in": number, // 0,
                "substituted_out": number, // 1,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:1300176",
              "name": string, // "Thuram, Kephren",
              "starter": boolean, // true
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 0,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 0,
                "shots_off_target": number, // 0,
                "shots_on_target": number, // 0,
                "substituted_in": number, // 0,
                "substituted_out": number, // 1,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:1635906",
              "name": string, // "Kalulu, Pierre",
              "starter": boolean, // true
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 0,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 0,
                "shots_off_target": number, // 0,
                "shots_on_target": number, // 0,
                "substituted_in": number, // 0,
                "substituted_out": number, // 0,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:1870346",
              "name": string, // "Rouhi, Jonas",
              "starter": boolean, // false
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 3,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 1,
                "shots_off_target": number, // 0,
                "shots_on_target": number, // 0,
                "substituted_in": number, // 0,
                "substituted_out": number, // 0,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:1951416",
              "name": string, // "Conceicao, Francisco",
              "starter": boolean, // true
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 0,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 0,
                "shots_off_target": number, // 0,
                "shots_on_target": number, // 0,
                "substituted_in": number, // 0,
                "substituted_out": number, // 0,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:1984655",
              "name": string, // "Savona, Nicolo",
              "starter": boolean, // false
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 0,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 0,
                "shots_off_target": number, // 0,
                "shots_on_target": number, // 2,
                "substituted_in": number, // 0,
                "substituted_out": number, // 1,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:1985265",
              "name": string, // "Mbangula Tshifunda, Samuel",
              "starter": boolean, // true
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 0,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 0,
                "shots_off_target": number, // 0,
                "shots_on_target": number, // 0,
                "substituted_in": number, // 0,
                "substituted_out": number, // 0,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:2070989",
              "name": string, // "Gatti, Federico",
              "starter": boolean, // true
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 0,
                "goals_scored": number, // 0,
                "offsides": number, // 1,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 1,
                "shots_off_target": number, // 2,
                "shots_on_target": number, // 0,
                "substituted_in": number, // 0,
                "substituted_out": number, // 0,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:2264587",
              "name": string, // "Yildiz, Kenan",
              "starter": boolean, // true
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 0,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 0,
                "shots_off_target": number, // 0,
                "shots_on_target": number, // 0,
                "substituted_in": number, // 0,
                "substituted_out": number, // 0,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:2390575",
              "name": string, // "Adzic, Vasilije",
              "starter": boolean, // false
            }
          ]
        },
        {
          "id": string, // "sr:competitor:3006",
          "name": string, // "SL Benfica",
          "abbreviation": string, // "BEN",
          "qualifier": string, // "away",
          "statistics": {
            "ball_possession": number, // 37,
            "cards_given": number, // 2,
            "corner_kicks": number, // 3,
            "fouls": number, // 7,
            "free_kicks": number, // 11,
            "goal_kicks": number, // 6,
            "injuries": number, // 0,
            "offsides": number, // 0,
            "red_cards": number, // 0,
            "shots_blocked": number, // 4,
            "shots_off_target": number, // 4,
            "shots_on_target": number, // 7,
            "shots_saved": number, // 5,
            "shots_total": number, // 15,
            "substitutions": number, // 5,
            "throw_ins": number, // 25,
            "yellow_cards": number, // 2,
            "yellow_red_cards": number, // 0
          },
          "players": [
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 1,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 1,
                "shots_off_target": number, // 0,
                "shots_on_target": number, // 0,
                "substituted_in": number, // 0,
                "substituted_out": number, // 1,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:30027",
              "name": string, // "Di Maria, Angel",
              "starter": boolean, // true
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 0,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 0,
                "shots_off_target": number, // 1,
                "shots_on_target": number, // 0,
                "substituted_in": number, // 0,
                "substituted_out": number, // 0,
                "yellow_cards": number, // 1,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:74915",
              "name": string, // "Otamendi, Nicolas",
              "starter": boolean, // true
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 0,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 1,
                "shots_off_target": number, // 0,
                "shots_on_target": number, // 0,
                "substituted_in": number, // 0,
                "substituted_out": number, // 0,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:228364",
              "name": string, // "Aursnes, Fredrik",
              "starter": boolean, // true
            },
            {
              "statistics": {
                "assists": number, // 1,
                "corner_kicks": number, // 0,
                "goals_scored": number, // 1,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 0,
                "shots_off_target": number, // 0,
                "shots_on_target": number, // 4,
                "substituted_in": number, // 0,
                "substituted_out": number, // 1,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:755704",
              "name": string, // "Pavlidis, Vangelis",
              "starter": boolean, // true
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 0,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 0,
                "shots_off_target": number, // 0,
                "shots_on_target": number, // 0,
                "substituted_in": number, // 0,
                "substituted_out": number, // 0,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:936366",
              "name": string, // "Luis, Florentino",
              "starter": boolean, // true
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 0,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 0,
                "shots_off_target": number, // 0,
                "shots_on_target": number, // 0,
                "substituted_in": number, // 0,
                "substituted_out": number, // 0,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:978173",
              "name": string, // "Beste, Jan-Niklas",
              "starter": boolean, // false
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 1,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 0,
                "shots_off_target": number, // 1,
                "shots_on_target": number, // 0,
                "substituted_in": number, // 1,
                "substituted_out": number, // 0,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:1045121",
              "name": string, // "Akturkoglu, Kerem",
              "starter": boolean, // false
            },
            {
              "statistics": {
                "assists": number, // 1,
                "corner_kicks": number, // 0,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 0,
                "shots_off_target": number, // 0,
                "shots_on_target": number, // 0,
                "substituted_in": number, // 0,
                "substituted_out": number, // 0,
                "yellow_cards": number, // 1,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:1046581",
              "name": string, // "Bah, Alexander",
              "starter": boolean, // true
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 0,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 0,
                "shots_off_target": number, // 0,
                "shots_on_target": number, // 1,
                "substituted_in": number, // 1,
                "substituted_out": number, // 0,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:1089296",
              "name": string, // "Martins, Leandro",
              "starter": boolean, // false
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 1,
                "goals_scored": number, // 1,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 0,
                "shots_off_target": number, // 2,
                "shots_on_target": number, // 1,
                "substituted_in": number, // 0,
                "substituted_out": number, // 1,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:1298462",
              "name": string, // "Kokcu, Orkun",
              "starter": boolean, // true
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 0,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 0,
                "shots_off_target": number, // 0,
                "shots_on_target": number, // 0,
                "substituted_in": number, // 0,
                "substituted_out": number, // 0,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:1299468",
              "name": string, // "Trubin, Anatoliy",
              "starter": boolean, // true
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 0,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 0,
                "shots_off_target": number, // 0,
                "shots_on_target": number, // 0,
                "substituted_in": number, // 1,
                "substituted_out": number, // 0,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:1417699",
              "name": string, // "Rollheiser, Benjamin",
              "starter": boolean, // false
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 0,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 0,
                "shots_off_target": number, // 0,
                "shots_on_target": number, // 0,
                "substituted_in": number, // 0,
                "substituted_out": number, // 0,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:1644514",
              "name": string, // "Soares, Samuel",
              "starter": boolean, // false
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 0,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 0,
                "shots_off_target": number, // 0,
                "shots_on_target": number, // 0,
                "substituted_in": number, // 0,
                "substituted_out": number, // 1,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:1644520",
              "name": string, // "Araujo, Tomas",
              "starter": boolean, // true
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 0,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 0,
                "shots_off_target": number, // 0,
                "shots_on_target": number, // 0,
                "substituted_in": number, // 1,
                "substituted_out": number, // 0,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:1832252",
              "name": string, // "Amdouni, Zeki",
              "starter": boolean, // false
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 0,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 0,
                "shots_off_target": number, // 0,
                "shots_on_target": number, // 0,
                "substituted_in": number, // 0,
                "substituted_out": number, // 0,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:1984703",
              "name": string, // "Bajrami, Adrian",
              "starter": boolean, // false
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 0,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 0,
                "shots_off_target": number, // 0,
                "shots_on_target": number, // 0,
                "substituted_in": number, // 0,
                "substituted_out": number, // 0,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:1987393",
              "name": string, // "Silva, Antonio",
              "starter": boolean, // true
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 0,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 1,
                "shots_off_target": number, // 0,
                "shots_on_target": number, // 1,
                "substituted_in": number, // 0,
                "substituted_out": number, // 1,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:2044393",
              "name": string, // "Schjelderup, Andreas",
              "starter": boolean, // true
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 0,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 0,
                "shots_off_target": number, // 0,
                "shots_on_target": number, // 0,
                "substituted_in": number, // 0,
                "substituted_out": number, // 0,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:2242755",
              "name": string, // "Madeira Fernandes Felix, Nuno Miguel",
              "starter": boolean, // false
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 0,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 0,
                "shots_off_target": number, // 0,
                "shots_on_target": number, // 0,
                "substituted_in": number, // 0,
                "substituted_out": number, // 0,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:2329171",
              "name": string, // "Prestianni, Gianluca",
              "starter": boolean, // false
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 0,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 1,
                "shots_off_target": number, // 0,
                "shots_on_target": number, // 0,
                "substituted_in": number, // 1,
                "substituted_out": number, // 0,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:2481587",
              "name": string, // "Rego, Joao",
              "starter": boolean, // false
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 0,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 0,
                "shots_off_target": number, // 0,
                "shots_on_target": number, // 0,
                "substituted_in": number, // 0,
                "substituted_out": number, // 0,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:2488501",
              "name": string, // "Carvalho Fonseca, Joao",
              "starter": boolean, // false
            },
            {
              "statistics": {
                "assists": number, // 0,
                "corner_kicks": number, // 0,
                "goals_scored": number, // 0,
                "offsides": number, // 0,
                "own_goals": number, // 0,
                "red_cards": number, // 0,
                "shots_blocked": number, // 0,
                "shots_off_target": number, // 0,
                "shots_on_target": number, // 0,
                "substituted_in": number, // 0,
                "substituted_out": number, // 0,
                "yellow_cards": number, // 0,
                "yellow_red_cards": number, // 0
              },
              "id": string, // "sr:player:2837259",
              "name": string, // "Leandro",
              "starter": boolean, // false
            }
          ]
        }
      ]
    }
  }
}

export type TSchedule = {
  "id": 77471288,
  "sport_id": 1,
  "league_id": 8,
  "season_id": 23614,
  "type_id": 223,
  "name": "Regular Season",
  "sort_order": 1,
  "finished": false,
  "is_current": true,
  "starting_at": "2024-08-16",
  "ending_at": "2025-05-25",
  "games_in_current_week": true,
  "tie_breaker_rule_id": null,
  "aggregates": [
    {
      "id": 58589,
      "league_id": 2,
      "season_id": 23619,
      "stage_id": 77471316,
      "name": "Manchester City vs Real Madrid",
      "fixture_ids": [
        19380879,
        19380880
      ],
      "result": "3-6",
      "detail": "After Full Time",
      "winner_participant_id": 3468,
      "fixtures": [
        {
          "id": 19380880,
          "sport_id": 1,
          "league_id": 2,
          "season_id": 23619,
          "stage_id": 77471316,
          "group_id": null,
          "aggregate_id": 58589,
          "round_id": null,
          "state_id": 5,
          "venue_id": 2020,
          "name": "Real Madrid vs Manchester City",
          "starting_at": "2025-02-19 20:00:00",
          "result_info": "Real Madrid won after full-time.",
          "leg": "2/2",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": true,
          "has_premium_odds": true,
          "starting_at_timestamp": 1739995200,
          "participants": [
            {
              "id": 3468,
              "sport_id": 1,
              "country_id": 32,
              "venue_id": 2020,
              "gender": "male",
              "name": "Real Madrid",
              "short_code": "RMA",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
              "founded": 1902,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 15:15:00",
              "meta": {
                "location": "home",
                "winner": true,
                "position": 1
              }
            },
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "away",
                "winner": false,
                "position": 2
              }
            }
          ],
          "scores": [
            {
              "id": 15942354,
              "fixture_id": 19380880,
              "type_id": 1,
              "participant_id": 3468,
              "score": {
                "goals": 2,
                "participant": "home"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15942352,
              "fixture_id": 19380880,
              "type_id": 1525,
              "participant_id": 3468,
              "score": {
                "goals": 3,
                "participant": "home"
              },
              "description": "CURRENT"
            },
            {
              "id": 15942626,
              "fixture_id": 19380880,
              "type_id": 48996,
              "participant_id": 3468,
              "score": {
                "goals": 1,
                "participant": "home"
              },
              "description": "2ND_HALF_ONLY"
            },
            {
              "id": 15942355,
              "fixture_id": 19380880,
              "type_id": 1,
              "participant_id": 9,
              "score": {
                "goals": 0,
                "participant": "away"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15942627,
              "fixture_id": 19380880,
              "type_id": 48996,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "2ND_HALF_ONLY"
            },
            {
              "id": 15942356,
              "fixture_id": 19380880,
              "type_id": 2,
              "participant_id": 3468,
              "score": {
                "goals": 3,
                "participant": "home"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15942357,
              "fixture_id": 19380880,
              "type_id": 2,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15942353,
              "fixture_id": 19380880,
              "type_id": 1525,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "CURRENT"
            }
          ]
        },
        {
          "id": 19380879,
          "sport_id": 1,
          "league_id": 2,
          "season_id": 23619,
          "stage_id": 77471316,
          "group_id": null,
          "aggregate_id": 58589,
          "round_id": null,
          "state_id": 5,
          "venue_id": 151,
          "name": "Manchester City vs Real Madrid",
          "starting_at": "2025-02-11 20:00:00",
          "result_info": "Real Madrid won after full-time.",
          "leg": "1/2",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": true,
          "has_premium_odds": true,
          "starting_at_timestamp": 1739304000,
          "participants": [
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "home",
                "winner": false,
                "position": 1
              }
            },
            {
              "id": 3468,
              "sport_id": 1,
              "country_id": 32,
              "venue_id": 2020,
              "gender": "male",
              "name": "Real Madrid",
              "short_code": "RMA",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png",
              "founded": 1902,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 15:15:00",
              "meta": {
                "location": "away",
                "winner": true,
                "position": 2
              }
            }
          ],
          "scores": [
            {
              "id": 15906086,
              "fixture_id": 19380879,
              "type_id": 1,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "home"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15906084,
              "fixture_id": 19380879,
              "type_id": 1525,
              "participant_id": 9,
              "score": {
                "goals": 2,
                "participant": "home"
              },
              "description": "CURRENT"
            },
            {
              "id": 15906088,
              "fixture_id": 19380879,
              "type_id": 2,
              "participant_id": 9,
              "score": {
                "goals": 2,
                "participant": "home"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15906089,
              "fixture_id": 19380879,
              "type_id": 2,
              "participant_id": 3468,
              "score": {
                "goals": 3,
                "participant": "away"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15906087,
              "fixture_id": 19380879,
              "type_id": 1,
              "participant_id": 3468,
              "score": {
                "goals": 0,
                "participant": "away"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15906085,
              "fixture_id": 19380879,
              "type_id": 1525,
              "participant_id": 3468,
              "score": {
                "goals": 3,
                "participant": "away"
              },
              "description": "CURRENT"
            },
            {
              "id": 15906465,
              "fixture_id": 19380879,
              "type_id": 48996,
              "participant_id": 3468,
              "score": {
                "goals": 3,
                "participant": "away"
              },
              "description": "2ND_HALF_ONLY"
            },
            {
              "id": 15906464,
              "fixture_id": 19380879,
              "type_id": 48996,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "home"
              },
              "description": "2ND_HALF_ONLY"
            }
          ]
        }
      ]
    }
  ],
  "rounds": [
    {
      "id": 339256,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "22",
      "finished": true,
      "is_current": false,
      "starting_at": "2025-01-18",
      "ending_at": "2025-01-20",
      "games_in_current_week": false,
      "fixtures": [
        {
          "id": 19134617,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339256,
          "state_id": 5,
          "venue_id": 504,
          "name": "Ipswich Town vs Manchester City",
          "starting_at": "2025-01-19 16:30:00",
          "result_info": "Manchester City won after full-time.",
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": true,
          "has_premium_odds": true,
          "starting_at_timestamp": 1737304200,
          "participants": [
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "away",
                "winner": true,
                "position": 8
              }
            },
            {
              "id": 116,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 504,
              "gender": "male",
              "name": "Ipswich Town",
              "short_code": "IPS",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/20/116.png",
              "founded": 1878,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-22 15:00:00",
              "meta": {
                "location": "home",
                "winner": false,
                "position": 18
              }
            }
          ],
          "scores": [
            {
              "id": 15433486,
              "fixture_id": 19134617,
              "type_id": 48996,
              "participant_id": 116,
              "score": {
                "goals": 0,
                "participant": "home"
              },
              "description": "2ND_HALF_ONLY"
            },
            {
              "id": 15433487,
              "fixture_id": 19134617,
              "type_id": 48996,
              "participant_id": 9,
              "score": {
                "goals": 3,
                "participant": "away"
              },
              "description": "2ND_HALF_ONLY"
            },
            {
              "id": 15432500,
              "fixture_id": 19134617,
              "type_id": 2,
              "participant_id": 9,
              "score": {
                "goals": 6,
                "participant": "away"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15432501,
              "fixture_id": 19134617,
              "type_id": 2,
              "participant_id": 116,
              "score": {
                "goals": 0,
                "participant": "home"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15432497,
              "fixture_id": 19134617,
              "type_id": 1525,
              "participant_id": 116,
              "score": {
                "goals": 0,
                "participant": "home"
              },
              "description": "CURRENT"
            },
            {
              "id": 15432498,
              "fixture_id": 19134617,
              "type_id": 1,
              "participant_id": 9,
              "score": {
                "goals": 3,
                "participant": "away"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15432499,
              "fixture_id": 19134617,
              "type_id": 1,
              "participant_id": 116,
              "score": {
                "goals": 0,
                "participant": "home"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15432496,
              "fixture_id": 19134617,
              "type_id": 1525,
              "participant_id": 9,
              "score": {
                "goals": 6,
                "participant": "away"
              },
              "description": "CURRENT"
            }
          ]
        }
      ]
    },
    {
      "id": 339251,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "17",
      "finished": true,
      "is_current": false,
      "starting_at": "2024-12-21",
      "ending_at": "2024-12-22",
      "games_in_current_week": false,
      "fixtures": [
        {
          "id": 19134889,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339251,
          "state_id": 5,
          "venue_id": 5,
          "name": "Aston Villa vs Manchester City",
          "starting_at": "2024-12-21 12:30:00",
          "result_info": "Aston Villa won after full-time.",
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": true,
          "has_premium_odds": true,
          "starting_at_timestamp": 1734784200,
          "participants": [
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "away",
                "winner": false,
                "position": 5
              }
            },
            {
              "id": 15,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 5,
              "gender": "male",
              "name": "Aston Villa",
              "short_code": "AVL",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/15/15.png",
              "founded": 1874,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-22 17:30:00",
              "meta": {
                "location": "home",
                "winner": true,
                "position": 7
              }
            }
          ],
          "scores": [
            {
              "id": 15358467,
              "fixture_id": 19134889,
              "type_id": 1,
              "participant_id": 9,
              "score": {
                "goals": 0,
                "participant": "away"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15358468,
              "fixture_id": 19134889,
              "type_id": 1,
              "participant_id": 15,
              "score": {
                "goals": 1,
                "participant": "home"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15358471,
              "fixture_id": 19134889,
              "type_id": 1525,
              "participant_id": 15,
              "score": {
                "goals": 2,
                "participant": "home"
              },
              "description": "CURRENT"
            },
            {
              "id": 15359029,
              "fixture_id": 19134889,
              "type_id": 2,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15359030,
              "fixture_id": 19134889,
              "type_id": 2,
              "participant_id": 15,
              "score": {
                "goals": 2,
                "participant": "home"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15358472,
              "fixture_id": 19134889,
              "type_id": 1525,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "CURRENT"
            },
            {
              "id": 15730600,
              "fixture_id": 19134889,
              "type_id": 48996,
              "participant_id": 15,
              "score": {
                "goals": 1,
                "participant": "home"
              },
              "description": "2ND_HALF_ONLY"
            },
            {
              "id": 15730599,
              "fixture_id": 19134889,
              "type_id": 48996,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "2ND_HALF_ONLY"
            }
          ]
        }
      ]
    },
    {
      "id": 339242,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "8",
      "finished": true,
      "is_current": false,
      "starting_at": "2024-10-19",
      "ending_at": "2024-10-21",
      "games_in_current_week": false,
      "fixtures": [
        {
          "id": 19134522,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339242,
          "state_id": 5,
          "venue_id": 492,
          "name": "Wolverhampton Wanderers vs Manchester City",
          "starting_at": "2024-10-20 13:00:00",
          "result_info": "Manchester City won after full-time.",
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": true,
          "has_premium_odds": true,
          "starting_at_timestamp": 1729429200,
          "participants": [
            {
              "id": 29,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 492,
              "gender": "male",
              "name": "Wolverhampton Wanderers",
              "short_code": "WOL",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/29/29.png",
              "founded": 1877,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-22 15:00:00",
              "meta": {
                "location": "home",
                "winner": false,
                "position": 19
              }
            },
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "away",
                "winner": true,
                "position": 2
              }
            }
          ],
          "scores": [
            {
              "id": 15073447,
              "fixture_id": 19134522,
              "type_id": 1,
              "participant_id": 29,
              "score": {
                "goals": 1,
                "participant": "home"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15073449,
              "fixture_id": 19134522,
              "type_id": 1,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15073633,
              "fixture_id": 19134522,
              "type_id": 1525,
              "participant_id": 9,
              "score": {
                "goals": 2,
                "participant": "away"
              },
              "description": "CURRENT"
            },
            {
              "id": 15073635,
              "fixture_id": 19134522,
              "type_id": 1525,
              "participant_id": 29,
              "score": {
                "goals": 1,
                "participant": "home"
              },
              "description": "CURRENT"
            },
            {
              "id": 15074805,
              "fixture_id": 19134522,
              "type_id": 2,
              "participant_id": 29,
              "score": {
                "goals": 1,
                "participant": "home"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15074806,
              "fixture_id": 19134522,
              "type_id": 2,
              "participant_id": 9,
              "score": {
                "goals": 2,
                "participant": "away"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15730124,
              "fixture_id": 19134522,
              "type_id": 48996,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "2ND_HALF_ONLY"
            },
            {
              "id": 15730123,
              "fixture_id": 19134522,
              "type_id": 48996,
              "participant_id": 29,
              "score": {
                "goals": 0,
                "participant": "home"
              },
              "description": "2ND_HALF_ONLY"
            }
          ]
        }
      ]
    },
    {
      "id": 339248,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "14",
      "finished": true,
      "is_current": false,
      "starting_at": "2024-12-03",
      "ending_at": "2024-12-05",
      "games_in_current_week": false,
      "fixtures": [
        {
          "id": 19134886,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339248,
          "state_id": 5,
          "venue_id": 151,
          "name": "Manchester City vs Nottingham Forest",
          "starting_at": "2024-12-04 19:30:00",
          "result_info": "Manchester City won after full-time.",
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": true,
          "has_premium_odds": true,
          "starting_at_timestamp": 1733340600,
          "participants": [
            {
              "id": 63,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 542,
              "gender": "male",
              "name": "Nottingham Forest",
              "short_code": "NFO",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/31/63.png",
              "founded": 1865,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 14:00:00",
              "meta": {
                "location": "away",
                "winner": false,
                "position": 6
              }
            },
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "home",
                "winner": true,
                "position": 5
              }
            }
          ],
          "scores": [
            {
              "id": 15301647,
              "fixture_id": 19134886,
              "type_id": 1525,
              "participant_id": 63,
              "score": {
                "goals": 0,
                "participant": "away"
              },
              "description": "CURRENT"
            },
            {
              "id": 15301644,
              "fixture_id": 19134886,
              "type_id": 1,
              "participant_id": 9,
              "score": {
                "goals": 2,
                "participant": "home"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15301645,
              "fixture_id": 19134886,
              "type_id": 1,
              "participant_id": 63,
              "score": {
                "goals": 0,
                "participant": "away"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15301817,
              "fixture_id": 19134886,
              "type_id": 2,
              "participant_id": 63,
              "score": {
                "goals": 0,
                "participant": "away"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15301816,
              "fixture_id": 19134886,
              "type_id": 2,
              "participant_id": 9,
              "score": {
                "goals": 3,
                "participant": "home"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15301646,
              "fixture_id": 19134886,
              "type_id": 1525,
              "participant_id": 9,
              "score": {
                "goals": 3,
                "participant": "home"
              },
              "description": "CURRENT"
            },
            {
              "id": 15730593,
              "fixture_id": 19134886,
              "type_id": 48996,
              "participant_id": 63,
              "score": {
                "goals": 0,
                "participant": "away"
              },
              "description": "2ND_HALF_ONLY"
            },
            {
              "id": 15730594,
              "fixture_id": 19134886,
              "type_id": 48996,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "home"
              },
              "description": "2ND_HALF_ONLY"
            }
          ]
        }
      ]
    },
    {
      "id": 339235,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "1",
      "finished": true,
      "is_current": false,
      "starting_at": "2024-08-16",
      "ending_at": "2024-08-19",
      "games_in_current_week": false,
      "fixtures": [
        {
          "id": 19134461,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339235,
          "state_id": 5,
          "venue_id": 321614,
          "name": "Chelsea vs Manchester City",
          "starting_at": "2024-08-18 15:30:00",
          "result_info": "Manchester City won after full-time.",
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": true,
          "has_premium_odds": true,
          "starting_at_timestamp": 1723995000,
          "participants": [
            {
              "id": 18,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 321614,
              "gender": "male",
              "name": "Chelsea",
              "short_code": "CHE",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/18/18.png",
              "founded": 1905,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-22 17:30:00",
              "meta": {
                "location": "home",
                "winner": false,
                "position": 8
              }
            },
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "away",
                "winner": true,
                "position": 1
              }
            }
          ],
          "scores": [
            {
              "id": 14746682,
              "fixture_id": 19134461,
              "type_id": 1525,
              "participant_id": 18,
              "score": {
                "goals": 0,
                "participant": "home"
              },
              "description": "CURRENT"
            },
            {
              "id": 14747207,
              "fixture_id": 19134461,
              "type_id": 2,
              "participant_id": 18,
              "score": {
                "goals": 0,
                "participant": "home"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 14747208,
              "fixture_id": 19134461,
              "type_id": 2,
              "participant_id": 9,
              "score": {
                "goals": 2,
                "participant": "away"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 14746675,
              "fixture_id": 19134461,
              "type_id": 1,
              "participant_id": 18,
              "score": {
                "goals": 0,
                "participant": "home"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 14746676,
              "fixture_id": 19134461,
              "type_id": 1,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 14746681,
              "fixture_id": 19134461,
              "type_id": 1525,
              "participant_id": 9,
              "score": {
                "goals": 2,
                "participant": "away"
              },
              "description": "CURRENT"
            },
            {
              "id": 15730001,
              "fixture_id": 19134461,
              "type_id": 48996,
              "participant_id": 18,
              "score": {
                "goals": 0,
                "participant": "home"
              },
              "description": "2ND_HALF_ONLY"
            },
            {
              "id": 15730002,
              "fixture_id": 19134461,
              "type_id": 48996,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "2ND_HALF_ONLY"
            }
          ]
        }
      ]
    },
    {
      "id": 339249,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "15",
      "finished": true,
      "is_current": false,
      "starting_at": "2024-12-07",
      "ending_at": "2025-02-12",
      "games_in_current_week": false,
      "fixtures": [
        {
          "id": 19134545,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339249,
          "state_id": 5,
          "venue_id": 201,
          "name": "Crystal Palace vs Manchester City",
          "starting_at": "2024-12-07 15:00:00",
          "result_info": "Game ended in draw.",
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": true,
          "has_premium_odds": true,
          "starting_at_timestamp": 1733583600,
          "participants": [
            {
              "id": 51,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 201,
              "gender": "male",
              "name": "Crystal Palace",
              "short_code": "CRY",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/19/51.png",
              "founded": 1905,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-22 15:00:00",
              "meta": {
                "location": "home",
                "winner": false,
                "position": 17
              }
            },
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "away",
                "winner": false,
                "position": 4
              }
            }
          ],
          "scores": [
            {
              "id": 15310950,
              "fixture_id": 19134545,
              "type_id": 1,
              "participant_id": 51,
              "score": {
                "goals": 1,
                "participant": "home"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15310951,
              "fixture_id": 19134545,
              "type_id": 1,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15310971,
              "fixture_id": 19134545,
              "type_id": 1525,
              "participant_id": 51,
              "score": {
                "goals": 2,
                "participant": "home"
              },
              "description": "CURRENT"
            },
            {
              "id": 15310974,
              "fixture_id": 19134545,
              "type_id": 1525,
              "participant_id": 9,
              "score": {
                "goals": 2,
                "participant": "away"
              },
              "description": "CURRENT"
            },
            {
              "id": 15311771,
              "fixture_id": 19134545,
              "type_id": 2,
              "participant_id": 9,
              "score": {
                "goals": 2,
                "participant": "away"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15311770,
              "fixture_id": 19134545,
              "type_id": 2,
              "participant_id": 51,
              "score": {
                "goals": 2,
                "participant": "home"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15730169,
              "fixture_id": 19134545,
              "type_id": 48996,
              "participant_id": 51,
              "score": {
                "goals": 1,
                "participant": "home"
              },
              "description": "2ND_HALF_ONLY"
            },
            {
              "id": 15730170,
              "fixture_id": 19134545,
              "type_id": 48996,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "2ND_HALF_ONLY"
            }
          ]
        }
      ]
    },
    {
      "id": 339262,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "27",
      "finished": false,
      "is_current": false,
      "starting_at": "2025-02-25",
      "ending_at": "2025-02-27",
      "games_in_current_week": true,
      "fixtures": [
        {
          "id": 19134932,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339262,
          "state_id": 1,
          "venue_id": 281313,
          "name": "Tottenham Hotspur vs Manchester City",
          "starting_at": "2025-02-26 19:30:00",
          "result_info": null,
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": true,
          "has_premium_odds": true,
          "starting_at_timestamp": 1740598200,
          "participants": [
            {
              "id": 6,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 281313,
              "gender": "male",
              "name": "Tottenham Hotspur",
              "short_code": "TOT",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/6/6.png",
              "founded": 1882,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-22 15:00:00",
              "meta": {
                "location": "home",
                "winner": null,
                "position": 12
              }
            },
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "away",
                "winner": null,
                "position": 4
              }
            }
          ],
          "scores": []
        }
      ]
    },
    {
      "id": 339241,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "7",
      "finished": true,
      "is_current": false,
      "starting_at": "2024-10-05",
      "ending_at": "2024-10-06",
      "games_in_current_week": false,
      "fixtures": [
        {
          "id": 19134511,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339241,
          "state_id": 5,
          "venue_id": 151,
          "name": "Manchester City vs Fulham",
          "starting_at": "2024-10-05 14:00:00",
          "result_info": "Manchester City won after full-time.",
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": true,
          "has_premium_odds": true,
          "starting_at_timestamp": 1728136800,
          "participants": [
            {
              "id": 11,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 485,
              "gender": "male",
              "name": "Fulham",
              "short_code": "FUL",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/11/11.png",
              "founded": 1879,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-22 15:00:00",
              "meta": {
                "location": "away",
                "winner": false,
                "position": 6
              }
            },
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "home",
                "winner": true,
                "position": 2
              }
            }
          ],
          "scores": [
            {
              "id": 14988935,
              "fixture_id": 19134511,
              "type_id": 2,
              "participant_id": 9,
              "score": {
                "goals": 3,
                "participant": "home"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 14988936,
              "fixture_id": 19134511,
              "type_id": 2,
              "participant_id": 11,
              "score": {
                "goals": 2,
                "participant": "away"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 14987467,
              "fixture_id": 19134511,
              "type_id": 1,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "home"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 14987468,
              "fixture_id": 19134511,
              "type_id": 1,
              "participant_id": 11,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 14987528,
              "fixture_id": 19134511,
              "type_id": 1525,
              "participant_id": 9,
              "score": {
                "goals": 3,
                "participant": "home"
              },
              "description": "CURRENT"
            },
            {
              "id": 14987527,
              "fixture_id": 19134511,
              "type_id": 1525,
              "participant_id": 11,
              "score": {
                "goals": 2,
                "participant": "away"
              },
              "description": "CURRENT"
            },
            {
              "id": 15730102,
              "fixture_id": 19134511,
              "type_id": 48996,
              "participant_id": 9,
              "score": {
                "goals": 2,
                "participant": "home"
              },
              "description": "2ND_HALF_ONLY"
            },
            {
              "id": 15730101,
              "fixture_id": 19134511,
              "type_id": 48996,
              "participant_id": 11,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "2ND_HALF_ONLY"
            }
          ]
        }
      ]
    },
    {
      "id": 339247,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "13",
      "finished": true,
      "is_current": false,
      "starting_at": "2024-11-29",
      "ending_at": "2024-12-01",
      "games_in_current_week": false,
      "fixtures": [
        {
          "id": 19134607,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339247,
          "state_id": 5,
          "venue_id": 230,
          "name": "Liverpool vs Manchester City",
          "starting_at": "2024-12-01 16:00:00",
          "result_info": "Liverpool won after full-time.",
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": true,
          "has_premium_odds": true,
          "starting_at_timestamp": 1733068800,
          "participants": [
            {
              "id": 8,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 230,
              "gender": "male",
              "name": "Liverpool",
              "short_code": "LIV",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/8/8.png",
              "founded": 1892,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "home",
                "winner": true,
                "position": 1
              }
            },
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "away",
                "winner": false,
                "position": 3
              }
            }
          ],
          "scores": [
            {
              "id": 15289986,
              "fixture_id": 19134607,
              "type_id": 2,
              "participant_id": 8,
              "score": {
                "goals": 2,
                "participant": "home"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15289587,
              "fixture_id": 19134607,
              "type_id": 1,
              "participant_id": 9,
              "score": {
                "goals": 0,
                "participant": "away"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15289987,
              "fixture_id": 19134607,
              "type_id": 2,
              "participant_id": 9,
              "score": {
                "goals": 0,
                "participant": "away"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15289610,
              "fixture_id": 19134607,
              "type_id": 1525,
              "participant_id": 8,
              "score": {
                "goals": 2,
                "participant": "home"
              },
              "description": "CURRENT"
            },
            {
              "id": 15289612,
              "fixture_id": 19134607,
              "type_id": 1525,
              "participant_id": 9,
              "score": {
                "goals": 0,
                "participant": "away"
              },
              "description": "CURRENT"
            },
            {
              "id": 15289586,
              "fixture_id": 19134607,
              "type_id": 1,
              "participant_id": 8,
              "score": {
                "goals": 1,
                "participant": "home"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15730211,
              "fixture_id": 19134607,
              "type_id": 48996,
              "participant_id": 8,
              "score": {
                "goals": 1,
                "participant": "home"
              },
              "description": "2ND_HALF_ONLY"
            },
            {
              "id": 15730212,
              "fixture_id": 19134607,
              "type_id": 48996,
              "participant_id": 9,
              "score": {
                "goals": 0,
                "participant": "away"
              },
              "description": "2ND_HALF_ONLY"
            }
          ]
        }
      ]
    },
    {
      "id": 339250,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "16",
      "finished": true,
      "is_current": false,
      "starting_at": "2024-12-14",
      "ending_at": "2024-12-16",
      "games_in_current_week": false,
      "fixtures": [
        {
          "id": 19134638,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339250,
          "state_id": 5,
          "venue_id": 151,
          "name": "Manchester City vs Manchester United",
          "starting_at": "2024-12-15 16:30:00",
          "result_info": "Manchester United won after full-time.",
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": true,
          "has_premium_odds": true,
          "starting_at_timestamp": 1734280200,
          "participants": [
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "home",
                "winner": false,
                "position": 5
              }
            },
            {
              "id": 14,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 206,
              "gender": "male",
              "name": "Manchester United",
              "short_code": "MUN",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/14/14.png",
              "founded": 1878,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-22 12:30:00",
              "meta": {
                "location": "away",
                "winner": true,
                "position": 13
              }
            }
          ],
          "scores": [
            {
              "id": 15346884,
              "fixture_id": 19134638,
              "type_id": 1,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "home"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15346885,
              "fixture_id": 19134638,
              "type_id": 1,
              "participant_id": 14,
              "score": {
                "goals": 0,
                "participant": "away"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15346888,
              "fixture_id": 19134638,
              "type_id": 1525,
              "participant_id": 14,
              "score": {
                "goals": 2,
                "participant": "away"
              },
              "description": "CURRENT"
            },
            {
              "id": 15347916,
              "fixture_id": 19134638,
              "type_id": 2,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "home"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15346889,
              "fixture_id": 19134638,
              "type_id": 1525,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "home"
              },
              "description": "CURRENT"
            },
            {
              "id": 15347917,
              "fixture_id": 19134638,
              "type_id": 2,
              "participant_id": 14,
              "score": {
                "goals": 2,
                "participant": "away"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15730254,
              "fixture_id": 19134638,
              "type_id": 48996,
              "participant_id": 14,
              "score": {
                "goals": 2,
                "participant": "away"
              },
              "description": "2ND_HALF_ONLY"
            },
            {
              "id": 15730253,
              "fixture_id": 19134638,
              "type_id": 48996,
              "participant_id": 9,
              "score": {
                "goals": 0,
                "participant": "home"
              },
              "description": "2ND_HALF_ONLY"
            }
          ]
        }
      ]
    },
    {
      "id": 339244,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "10",
      "finished": true,
      "is_current": false,
      "starting_at": "2024-11-02",
      "ending_at": "2024-11-04",
      "games_in_current_week": false,
      "fixtures": [
        {
          "id": 19134869,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339244,
          "state_id": 5,
          "venue_id": 146,
          "name": "AFC Bournemouth vs Manchester City",
          "starting_at": "2024-11-02 15:00:00",
          "result_info": "AFC Bournemouth won after full-time.",
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": true,
          "has_premium_odds": true,
          "starting_at_timestamp": 1730559600,
          "participants": [
            {
              "id": 52,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 146,
              "gender": "male",
              "name": "AFC Bournemouth",
              "short_code": "BOU",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/20/52.png",
              "founded": 1899,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-22 15:00:00",
              "meta": {
                "location": "home",
                "winner": true,
                "position": 11
              }
            },
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "away",
                "winner": false,
                "position": 1
              }
            }
          ],
          "scores": [
            {
              "id": 15140887,
              "fixture_id": 19134869,
              "type_id": 2,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15140886,
              "fixture_id": 19134869,
              "type_id": 2,
              "participant_id": 52,
              "score": {
                "goals": 2,
                "participant": "home"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15139642,
              "fixture_id": 19134869,
              "type_id": 1,
              "participant_id": 52,
              "score": {
                "goals": 1,
                "participant": "home"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15139644,
              "fixture_id": 19134869,
              "type_id": 1,
              "participant_id": 9,
              "score": {
                "goals": 0,
                "participant": "away"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15139741,
              "fixture_id": 19134869,
              "type_id": 1525,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "CURRENT"
            },
            {
              "id": 15139747,
              "fixture_id": 19134869,
              "type_id": 1525,
              "participant_id": 52,
              "score": {
                "goals": 2,
                "participant": "home"
              },
              "description": "CURRENT"
            },
            {
              "id": 15730560,
              "fixture_id": 19134869,
              "type_id": 48996,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "2ND_HALF_ONLY"
            },
            {
              "id": 15730559,
              "fixture_id": 19134869,
              "type_id": 48996,
              "participant_id": 52,
              "score": {
                "goals": 1,
                "participant": "home"
              },
              "description": "2ND_HALF_ONLY"
            }
          ]
        }
      ]
    },
    {
      "id": 339257,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "23",
      "finished": true,
      "is_current": false,
      "starting_at": "2025-01-25",
      "ending_at": "2025-01-26",
      "games_in_current_week": false,
      "fixtures": [
        {
          "id": 19134649,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339257,
          "state_id": 5,
          "venue_id": 151,
          "name": "Manchester City vs Chelsea",
          "starting_at": "2025-01-25 17:30:00",
          "result_info": "Manchester City won after full-time.",
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": true,
          "has_premium_odds": true,
          "starting_at_timestamp": 1737826200,
          "participants": [
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "home",
                "winner": true,
                "position": 4
              }
            },
            {
              "id": 18,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 321614,
              "gender": "male",
              "name": "Chelsea",
              "short_code": "CHE",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/18/18.png",
              "founded": 1905,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-22 17:30:00",
              "meta": {
                "location": "away",
                "winner": false,
                "position": 6
              }
            }
          ],
          "scores": [
            {
              "id": 15451881,
              "fixture_id": 19134649,
              "type_id": 1525,
              "participant_id": 9,
              "score": {
                "goals": 3,
                "participant": "home"
              },
              "description": "CURRENT"
            },
            {
              "id": 15451887,
              "fixture_id": 19134649,
              "type_id": 2,
              "participant_id": 18,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15451886,
              "fixture_id": 19134649,
              "type_id": 2,
              "participant_id": 9,
              "score": {
                "goals": 3,
                "participant": "home"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15451884,
              "fixture_id": 19134649,
              "type_id": 1,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "home"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15451885,
              "fixture_id": 19134649,
              "type_id": 1,
              "participant_id": 18,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15452879,
              "fixture_id": 19134649,
              "type_id": 48996,
              "participant_id": 18,
              "score": {
                "goals": 0,
                "participant": "away"
              },
              "description": "2ND_HALF_ONLY"
            },
            {
              "id": 15451883,
              "fixture_id": 19134649,
              "type_id": 1525,
              "participant_id": 18,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "CURRENT"
            },
            {
              "id": 15452878,
              "fixture_id": 19134649,
              "type_id": 48996,
              "participant_id": 9,
              "score": {
                "goals": 2,
                "participant": "home"
              },
              "description": "2ND_HALF_ONLY"
            }
          ]
        }
      ]
    },
    {
      "id": 339246,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "12",
      "finished": true,
      "is_current": false,
      "starting_at": "2024-11-23",
      "ending_at": "2024-11-25",
      "games_in_current_week": false,
      "fixtures": [
        {
          "id": 19134600,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339246,
          "state_id": 5,
          "venue_id": 151,
          "name": "Manchester City vs Tottenham Hotspur",
          "starting_at": "2024-11-23 17:30:00",
          "result_info": "Tottenham Hotspur won after full-time.",
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": true,
          "has_premium_odds": true,
          "starting_at_timestamp": 1732383000,
          "participants": [
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "home",
                "winner": false,
                "position": 2
              }
            },
            {
              "id": 6,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 281313,
              "gender": "male",
              "name": "Tottenham Hotspur",
              "short_code": "TOT",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/6/6.png",
              "founded": 1882,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-22 15:00:00",
              "meta": {
                "location": "away",
                "winner": true,
                "position": 11
              }
            }
          ],
          "scores": [
            {
              "id": 15251084,
              "fixture_id": 19134600,
              "type_id": 2,
              "participant_id": 9,
              "score": {
                "goals": 0,
                "participant": "home"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15251085,
              "fixture_id": 19134600,
              "type_id": 2,
              "participant_id": 6,
              "score": {
                "goals": 4,
                "participant": "away"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15250262,
              "fixture_id": 19134600,
              "type_id": 1525,
              "participant_id": 6,
              "score": {
                "goals": 4,
                "participant": "away"
              },
              "description": "CURRENT"
            },
            {
              "id": 15250258,
              "fixture_id": 19134600,
              "type_id": 1,
              "participant_id": 9,
              "score": {
                "goals": 0,
                "participant": "home"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15250259,
              "fixture_id": 19134600,
              "type_id": 1,
              "participant_id": 6,
              "score": {
                "goals": 2,
                "participant": "away"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15250263,
              "fixture_id": 19134600,
              "type_id": 1525,
              "participant_id": 9,
              "score": {
                "goals": 0,
                "participant": "home"
              },
              "description": "CURRENT"
            },
            {
              "id": 15730198,
              "fixture_id": 19134600,
              "type_id": 48996,
              "participant_id": 6,
              "score": {
                "goals": 2,
                "participant": "away"
              },
              "description": "2ND_HALF_ONLY"
            },
            {
              "id": 15730197,
              "fixture_id": 19134600,
              "type_id": 48996,
              "participant_id": 9,
              "score": {
                "goals": 0,
                "participant": "home"
              },
              "description": "2ND_HALF_ONLY"
            }
          ]
        }
      ]
    },
    {
      "id": 339265,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "30",
      "finished": false,
      "is_current": false,
      "starting_at": "2025-04-01",
      "ending_at": "2025-04-02",
      "games_in_current_week": false,
      "fixtures": [
        {
          "id": 19134965,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339265,
          "state_id": 1,
          "venue_id": 151,
          "name": "Manchester City vs Leicester City",
          "starting_at": "2025-04-02 18:45:00",
          "result_info": null,
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": false,
          "has_premium_odds": false,
          "starting_at_timestamp": 1743619500,
          "participants": [
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "home",
                "winner": null,
                "position": null
              }
            },
            {
              "id": 42,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 117,
              "gender": "male",
              "name": "Leicester City",
              "short_code": "LEI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/10/42.png",
              "founded": 1884,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-21 20:00:00",
              "meta": {
                "location": "away",
                "winner": null,
                "position": null
              }
            }
          ],
          "scores": []
        }
      ]
    },
    {
      "id": 339245,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "11",
      "finished": true,
      "is_current": false,
      "starting_at": "2024-11-09",
      "ending_at": "2024-11-10",
      "games_in_current_week": false,
      "fixtures": [
        {
          "id": 19134534,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339245,
          "state_id": 5,
          "venue_id": 282066,
          "name": "Brighton & Hove Albion vs Manchester City",
          "starting_at": "2024-11-09 17:30:00",
          "result_info": "Brighton & Hove Albion won after full-time.",
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": true,
          "has_premium_odds": true,
          "starting_at_timestamp": 1731173400,
          "participants": [
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "away",
                "winner": false,
                "position": 2
              }
            },
            {
              "id": 78,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 480,
              "gender": "male",
              "name": "Brighton & Hove Albion",
              "short_code": "BHA",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/14/78.png",
              "founded": 1901,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-22 15:00:00",
              "meta": {
                "location": "home",
                "winner": true,
                "position": 9
              }
            }
          ],
          "scores": [
            {
              "id": 15179294,
              "fixture_id": 19134534,
              "type_id": 1,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15179295,
              "fixture_id": 19134534,
              "type_id": 1,
              "participant_id": 78,
              "score": {
                "goals": 0,
                "participant": "home"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15179300,
              "fixture_id": 19134534,
              "type_id": 1525,
              "participant_id": 78,
              "score": {
                "goals": 2,
                "participant": "home"
              },
              "description": "CURRENT"
            },
            {
              "id": 15179301,
              "fixture_id": 19134534,
              "type_id": 1525,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "CURRENT"
            },
            {
              "id": 15180342,
              "fixture_id": 19134534,
              "type_id": 2,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15180343,
              "fixture_id": 19134534,
              "type_id": 2,
              "participant_id": 78,
              "score": {
                "goals": 2,
                "participant": "home"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15730148,
              "fixture_id": 19134534,
              "type_id": 48996,
              "participant_id": 78,
              "score": {
                "goals": 2,
                "participant": "home"
              },
              "description": "2ND_HALF_ONLY"
            },
            {
              "id": 15730147,
              "fixture_id": 19134534,
              "type_id": 48996,
              "participant_id": 9,
              "score": {
                "goals": 0,
                "participant": "away"
              },
              "description": "2ND_HALF_ONLY"
            }
          ]
        }
      ]
    },
    {
      "id": 339271,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "36",
      "finished": false,
      "is_current": false,
      "starting_at": "2025-05-10",
      "ending_at": "2025-05-10",
      "games_in_current_week": false,
      "fixtures": [
        {
          "id": 19135026,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339271,
          "state_id": 1,
          "venue_id": 167,
          "name": "Southampton vs Manchester City",
          "starting_at": "2025-05-10 14:00:00",
          "result_info": null,
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": false,
          "has_premium_odds": false,
          "starting_at_timestamp": 1746885600,
          "participants": [
            {
              "id": 65,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 167,
              "gender": "male",
              "name": "Southampton",
              "short_code": "SOU",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/1/65.png",
              "founded": 1885,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-22 15:00:00",
              "meta": {
                "location": "home",
                "winner": null,
                "position": null
              }
            },
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "away",
                "winner": null,
                "position": null
              }
            }
          ],
          "scores": []
        }
      ]
    },
    {
      "id": 339237,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "3",
      "finished": true,
      "is_current": false,
      "starting_at": "2024-08-31",
      "ending_at": "2024-09-01",
      "games_in_current_week": false,
      "fixtures": [
        {
          "id": 19134482,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339237,
          "state_id": 5,
          "venue_id": 214,
          "name": "West Ham United vs Manchester City",
          "starting_at": "2024-08-31 16:30:00",
          "result_info": "Manchester City won after full-time.",
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": true,
          "has_premium_odds": true,
          "starting_at_timestamp": 1725121800,
          "participants": [
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "away",
                "winner": true,
                "position": 3
              }
            },
            {
              "id": 1,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 214,
              "gender": "male",
              "name": "West Ham United",
              "short_code": "WHU",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/1/1.png",
              "founded": 1895,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-22 15:00:00",
              "meta": {
                "location": "home",
                "winner": false,
                "position": 13
              }
            }
          ],
          "scores": [
            {
              "id": 14803849,
              "fixture_id": 19134482,
              "type_id": 1,
              "participant_id": 9,
              "score": {
                "goals": 2,
                "participant": "away"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 14803850,
              "fixture_id": 19134482,
              "type_id": 1,
              "participant_id": 1,
              "score": {
                "goals": 1,
                "participant": "home"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 14803853,
              "fixture_id": 19134482,
              "type_id": 1525,
              "participant_id": 9,
              "score": {
                "goals": 3,
                "participant": "away"
              },
              "description": "CURRENT"
            },
            {
              "id": 14803856,
              "fixture_id": 19134482,
              "type_id": 1525,
              "participant_id": 1,
              "score": {
                "goals": 1,
                "participant": "home"
              },
              "description": "CURRENT"
            },
            {
              "id": 14804246,
              "fixture_id": 19134482,
              "type_id": 2,
              "participant_id": 1,
              "score": {
                "goals": 1,
                "participant": "home"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 14804245,
              "fixture_id": 19134482,
              "type_id": 2,
              "participant_id": 9,
              "score": {
                "goals": 3,
                "participant": "away"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15730044,
              "fixture_id": 19134482,
              "type_id": 48996,
              "participant_id": 1,
              "score": {
                "goals": 0,
                "participant": "home"
              },
              "description": "2ND_HALF_ONLY"
            },
            {
              "id": 15730043,
              "fixture_id": 19134482,
              "type_id": 48996,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "2ND_HALF_ONLY"
            }
          ]
        }
      ]
    },
    {
      "id": 339273,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "38",
      "finished": false,
      "is_current": false,
      "starting_at": "2025-05-25",
      "ending_at": "2025-05-25",
      "games_in_current_week": false,
      "fixtures": [
        {
          "id": 19135040,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339273,
          "state_id": 1,
          "venue_id": 485,
          "name": "Fulham vs Manchester City",
          "starting_at": "2025-05-25 15:00:00",
          "result_info": null,
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": false,
          "has_premium_odds": false,
          "starting_at_timestamp": 1748185200,
          "participants": [
            {
              "id": 11,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 485,
              "gender": "male",
              "name": "Fulham",
              "short_code": "FUL",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/11/11.png",
              "founded": 1879,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-22 15:00:00",
              "meta": {
                "location": "home",
                "winner": null,
                "position": null
              }
            },
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "away",
                "winner": null,
                "position": null
              }
            }
          ],
          "scores": []
        }
      ]
    },
    {
      "id": 339267,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "32",
      "finished": false,
      "is_current": false,
      "starting_at": "2025-04-12",
      "ending_at": "2025-04-12",
      "games_in_current_week": false,
      "fixtures": [
        {
          "id": 19134984,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339267,
          "state_id": 1,
          "venue_id": 151,
          "name": "Manchester City vs Crystal Palace",
          "starting_at": "2025-04-12 14:00:00",
          "result_info": null,
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": false,
          "has_premium_odds": false,
          "starting_at_timestamp": 1744466400,
          "participants": [
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "home",
                "winner": null,
                "position": null
              }
            },
            {
              "id": 51,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 201,
              "gender": "male",
              "name": "Crystal Palace",
              "short_code": "CRY",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/19/51.png",
              "founded": 1905,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-22 15:00:00",
              "meta": {
                "location": "away",
                "winner": null,
                "position": null
              }
            }
          ],
          "scores": []
        }
      ]
    },
    {
      "id": 339263,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "28",
      "finished": false,
      "is_current": false,
      "starting_at": "2025-03-08",
      "ending_at": "2025-03-10",
      "games_in_current_week": false,
      "fixtures": [
        {
          "id": 19134945,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339263,
          "state_id": 1,
          "venue_id": 542,
          "name": "Nottingham Forest vs Manchester City",
          "starting_at": "2025-03-08 12:30:00",
          "result_info": null,
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": true,
          "has_premium_odds": true,
          "starting_at_timestamp": 1741437000,
          "participants": [
            {
              "id": 63,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 542,
              "gender": "male",
              "name": "Nottingham Forest",
              "short_code": "NFO",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/31/63.png",
              "founded": 1865,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 14:00:00",
              "meta": {
                "location": "home",
                "winner": null,
                "position": null
              }
            },
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "away",
                "winner": null,
                "position": null
              }
            }
          ],
          "scores": []
        }
      ]
    },
    {
      "id": 339266,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "31",
      "finished": false,
      "is_current": false,
      "starting_at": "2025-04-05",
      "ending_at": "2025-04-05",
      "games_in_current_week": false,
      "fixtures": [
        {
          "id": 19134976,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339266,
          "state_id": 1,
          "venue_id": 206,
          "name": "Manchester United vs Manchester City",
          "starting_at": "2025-04-05 14:00:00",
          "result_info": null,
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": false,
          "has_premium_odds": false,
          "starting_at_timestamp": 1743861600,
          "participants": [
            {
              "id": 14,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 206,
              "gender": "male",
              "name": "Manchester United",
              "short_code": "MUN",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/14/14.png",
              "founded": 1878,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-22 12:30:00",
              "meta": {
                "location": "home",
                "winner": null,
                "position": null
              }
            },
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "away",
                "winner": null,
                "position": null
              }
            }
          ],
          "scores": []
        }
      ]
    },
    {
      "id": 339268,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "33",
      "finished": false,
      "is_current": false,
      "starting_at": "2025-04-19",
      "ending_at": "2025-04-19",
      "games_in_current_week": false,
      "fixtures": [
        {
          "id": 19134992,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339268,
          "state_id": 1,
          "venue_id": 12,
          "name": "Everton vs Manchester City",
          "starting_at": "2025-04-19 14:00:00",
          "result_info": null,
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": false,
          "has_premium_odds": false,
          "starting_at_timestamp": 1745071200,
          "participants": [
            {
              "id": 13,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 12,
              "gender": "male",
              "name": "Everton",
              "short_code": "EVE",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/13/13.png",
              "founded": 1878,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-22 12:30:00",
              "meta": {
                "location": "home",
                "winner": null,
                "position": null
              }
            },
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "away",
                "winner": null,
                "position": null
              }
            }
          ],
          "scores": []
        }
      ]
    },
    {
      "id": 339253,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "19",
      "finished": true,
      "is_current": false,
      "starting_at": "2024-12-29",
      "ending_at": "2025-01-01",
      "games_in_current_week": false,
      "fixtures": [
        {
          "id": 19134915,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339253,
          "state_id": 5,
          "venue_id": 117,
          "name": "Leicester City vs Manchester City",
          "starting_at": "2024-12-29 14:30:00",
          "result_info": "Manchester City won after full-time.",
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": true,
          "has_premium_odds": true,
          "starting_at_timestamp": 1735482600,
          "participants": [
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "away",
                "winner": true,
                "position": 7
              }
            },
            {
              "id": 42,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 117,
              "gender": "male",
              "name": "Leicester City",
              "short_code": "LEI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/10/42.png",
              "founded": 1884,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-21 20:00:00",
              "meta": {
                "location": "home",
                "winner": false,
                "position": 18
              }
            }
          ],
          "scores": [
            {
              "id": 15376329,
              "fixture_id": 19134915,
              "type_id": 1525,
              "participant_id": 9,
              "score": {
                "goals": 2,
                "participant": "away"
              },
              "description": "CURRENT"
            },
            {
              "id": 15376326,
              "fixture_id": 19134915,
              "type_id": 1,
              "participant_id": 42,
              "score": {
                "goals": 0,
                "participant": "home"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15376330,
              "fixture_id": 19134915,
              "type_id": 1525,
              "participant_id": 42,
              "score": {
                "goals": 0,
                "participant": "home"
              },
              "description": "CURRENT"
            },
            {
              "id": 15376325,
              "fixture_id": 19134915,
              "type_id": 1,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15376625,
              "fixture_id": 19134915,
              "type_id": 2,
              "participant_id": 9,
              "score": {
                "goals": 2,
                "participant": "away"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15376626,
              "fixture_id": 19134915,
              "type_id": 2,
              "participant_id": 42,
              "score": {
                "goals": 0,
                "participant": "home"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15730652,
              "fixture_id": 19134915,
              "type_id": 48996,
              "participant_id": 42,
              "score": {
                "goals": 0,
                "participant": "home"
              },
              "description": "2ND_HALF_ONLY"
            },
            {
              "id": 15730651,
              "fixture_id": 19134915,
              "type_id": 48996,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "2ND_HALF_ONLY"
            }
          ]
        }
      ]
    },
    {
      "id": 339254,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "20",
      "finished": true,
      "is_current": false,
      "starting_at": "2025-01-04",
      "ending_at": "2025-01-06",
      "games_in_current_week": false,
      "fixtures": [
        {
          "id": 19134925,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339254,
          "state_id": 5,
          "venue_id": 151,
          "name": "Manchester City vs West Ham United",
          "starting_at": "2025-01-04 15:00:00",
          "result_info": "Manchester City won after full-time.",
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": true,
          "has_premium_odds": true,
          "starting_at_timestamp": 1736002800,
          "participants": [
            {
              "id": 1,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 214,
              "gender": "male",
              "name": "West Ham United",
              "short_code": "WHU",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/1/1.png",
              "founded": 1895,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-22 15:00:00",
              "meta": {
                "location": "away",
                "winner": false,
                "position": 13
              }
            },
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "home",
                "winner": true,
                "position": 6
              }
            }
          ],
          "scores": [
            {
              "id": 15382680,
              "fixture_id": 19134925,
              "type_id": 1,
              "participant_id": 1,
              "score": {
                "goals": 0,
                "participant": "away"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15382710,
              "fixture_id": 19134925,
              "type_id": 1525,
              "participant_id": 9,
              "score": {
                "goals": 4,
                "participant": "home"
              },
              "description": "CURRENT"
            },
            {
              "id": 15382679,
              "fixture_id": 19134925,
              "type_id": 1,
              "participant_id": 9,
              "score": {
                "goals": 2,
                "participant": "home"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15383426,
              "fixture_id": 19134925,
              "type_id": 2,
              "participant_id": 1,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15383425,
              "fixture_id": 19134925,
              "type_id": 2,
              "participant_id": 9,
              "score": {
                "goals": 4,
                "participant": "home"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15382709,
              "fixture_id": 19134925,
              "type_id": 1525,
              "participant_id": 1,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "CURRENT"
            },
            {
              "id": 15730671,
              "fixture_id": 19134925,
              "type_id": 48996,
              "participant_id": 1,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "2ND_HALF_ONLY"
            },
            {
              "id": 15730672,
              "fixture_id": 19134925,
              "type_id": 48996,
              "participant_id": 9,
              "score": {
                "goals": 2,
                "participant": "home"
              },
              "description": "2ND_HALF_ONLY"
            }
          ]
        }
      ]
    },
    {
      "id": 339258,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "24",
      "finished": true,
      "is_current": false,
      "starting_at": "2025-02-01",
      "ending_at": "2025-02-03",
      "games_in_current_week": false,
      "fixtures": [
        {
          "id": 19134564,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339258,
          "state_id": 5,
          "venue_id": 204,
          "name": "Arsenal vs Manchester City",
          "starting_at": "2025-02-02 16:30:00",
          "result_info": "Arsenal won after full-time.",
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": true,
          "has_premium_odds": true,
          "starting_at_timestamp": 1738513800,
          "participants": [
            {
              "id": 19,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 204,
              "gender": "male",
              "name": "Arsenal",
              "short_code": "ARS",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/19/19.png",
              "founded": 1886,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-22 15:00:00",
              "meta": {
                "location": "home",
                "winner": true,
                "position": 2
              }
            },
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "away",
                "winner": false,
                "position": 4
              }
            }
          ],
          "scores": [
            {
              "id": 15491140,
              "fixture_id": 19134564,
              "type_id": 2,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15491131,
              "fixture_id": 19134564,
              "type_id": 1525,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "CURRENT"
            },
            {
              "id": 15491130,
              "fixture_id": 19134564,
              "type_id": 1525,
              "participant_id": 19,
              "score": {
                "goals": 5,
                "participant": "home"
              },
              "description": "CURRENT"
            },
            {
              "id": 15491139,
              "fixture_id": 19134564,
              "type_id": 2,
              "participant_id": 19,
              "score": {
                "goals": 5,
                "participant": "home"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15491135,
              "fixture_id": 19134564,
              "type_id": 1,
              "participant_id": 19,
              "score": {
                "goals": 1,
                "participant": "home"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15491138,
              "fixture_id": 19134564,
              "type_id": 1,
              "participant_id": 9,
              "score": {
                "goals": 0,
                "participant": "away"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15491980,
              "fixture_id": 19134564,
              "type_id": 48996,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "2ND_HALF_ONLY"
            },
            {
              "id": 15491979,
              "fixture_id": 19134564,
              "type_id": 48996,
              "participant_id": 19,
              "score": {
                "goals": 4,
                "participant": "home"
              },
              "description": "2ND_HALF_ONLY"
            }
          ]
        }
      ]
    },
    {
      "id": 339236,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "2",
      "finished": true,
      "is_current": false,
      "starting_at": "2024-08-24",
      "ending_at": "2024-08-25",
      "games_in_current_week": false,
      "fixtures": [
        {
          "id": 19134469,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339236,
          "state_id": 5,
          "venue_id": 151,
          "name": "Manchester City vs Ipswich Town",
          "starting_at": "2024-08-24 14:00:00",
          "result_info": "Manchester City won after full-time.",
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": true,
          "has_premium_odds": true,
          "starting_at_timestamp": 1724508000,
          "participants": [
            {
              "id": 116,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 504,
              "gender": "male",
              "name": "Ipswich Town",
              "short_code": "IPS",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/20/116.png",
              "founded": 1878,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-22 15:00:00",
              "meta": {
                "location": "away",
                "winner": false,
                "position": 18
              }
            },
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "home",
                "winner": true,
                "position": 1
              }
            }
          ],
          "scores": [
            {
              "id": 14767722,
              "fixture_id": 19134469,
              "type_id": 1,
              "participant_id": 9,
              "score": {
                "goals": 3,
                "participant": "home"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 14767723,
              "fixture_id": 19134469,
              "type_id": 1,
              "participant_id": 116,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 14767778,
              "fixture_id": 19134469,
              "type_id": 1525,
              "participant_id": 9,
              "score": {
                "goals": 4,
                "participant": "home"
              },
              "description": "CURRENT"
            },
            {
              "id": 14768810,
              "fixture_id": 19134469,
              "type_id": 2,
              "participant_id": 9,
              "score": {
                "goals": 4,
                "participant": "home"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 14768811,
              "fixture_id": 19134469,
              "type_id": 2,
              "participant_id": 116,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 14767783,
              "fixture_id": 19134469,
              "type_id": 1525,
              "participant_id": 116,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "CURRENT"
            },
            {
              "id": 15730018,
              "fixture_id": 19134469,
              "type_id": 48996,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "home"
              },
              "description": "2ND_HALF_ONLY"
            },
            {
              "id": 15730017,
              "fixture_id": 19134469,
              "type_id": 48996,
              "participant_id": 116,
              "score": {
                "goals": 0,
                "participant": "away"
              },
              "description": "2ND_HALF_ONLY"
            }
          ]
        }
      ]
    },
    {
      "id": 339259,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "25",
      "finished": true,
      "is_current": false,
      "starting_at": "2025-02-14",
      "ending_at": "2025-02-16",
      "games_in_current_week": false,
      "fixtures": [
        {
          "id": 19134579,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339259,
          "state_id": 5,
          "venue_id": 151,
          "name": "Manchester City vs Newcastle United",
          "starting_at": "2025-02-15 15:00:00",
          "result_info": "Manchester City won after full-time.",
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": true,
          "has_premium_odds": true,
          "starting_at_timestamp": 1739631600,
          "participants": [
            {
              "id": 20,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 449,
              "gender": "male",
              "name": "Newcastle United",
              "short_code": "NEW",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/20/20.png",
              "founded": 1892,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 14:00:00",
              "meta": {
                "location": "away",
                "winner": false,
                "position": 6
              }
            },
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "home",
                "winner": true,
                "position": 5
              }
            }
          ],
          "scores": [
            {
              "id": 15919280,
              "fixture_id": 19134579,
              "type_id": 1525,
              "participant_id": 20,
              "score": {
                "goals": 0,
                "participant": "away"
              },
              "description": "CURRENT"
            },
            {
              "id": 15919283,
              "fixture_id": 19134579,
              "type_id": 1,
              "participant_id": 9,
              "score": {
                "goals": 3,
                "participant": "home"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15919277,
              "fixture_id": 19134579,
              "type_id": 1525,
              "participant_id": 9,
              "score": {
                "goals": 4,
                "participant": "home"
              },
              "description": "CURRENT"
            },
            {
              "id": 15919285,
              "fixture_id": 19134579,
              "type_id": 2,
              "participant_id": 9,
              "score": {
                "goals": 4,
                "participant": "home"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15919286,
              "fixture_id": 19134579,
              "type_id": 2,
              "participant_id": 20,
              "score": {
                "goals": 0,
                "participant": "away"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15919284,
              "fixture_id": 19134579,
              "type_id": 1,
              "participant_id": 20,
              "score": {
                "goals": 0,
                "participant": "away"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15921434,
              "fixture_id": 19134579,
              "type_id": 48996,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "home"
              },
              "description": "2ND_HALF_ONLY"
            },
            {
              "id": 15921436,
              "fixture_id": 19134579,
              "type_id": 48996,
              "participant_id": 20,
              "score": {
                "goals": 0,
                "participant": "away"
              },
              "description": "2ND_HALF_ONLY"
            }
          ]
        }
      ]
    },
    {
      "id": 339269,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "34",
      "finished": false,
      "is_current": false,
      "starting_at": "2025-04-26",
      "ending_at": "2025-04-26",
      "games_in_current_week": false,
      "fixtures": [
        {
          "id": 19135004,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339269,
          "state_id": 1,
          "venue_id": 151,
          "name": "Manchester City vs Aston Villa",
          "starting_at": "2025-04-26 14:00:00",
          "result_info": null,
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": false,
          "has_premium_odds": false,
          "starting_at_timestamp": 1745676000,
          "participants": [
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "home",
                "winner": null,
                "position": null
              }
            },
            {
              "id": 15,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 5,
              "gender": "male",
              "name": "Aston Villa",
              "short_code": "AVL",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/15/15.png",
              "founded": 1874,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-22 17:30:00",
              "meta": {
                "location": "away",
                "winner": null,
                "position": null
              }
            }
          ],
          "scores": []
        }
      ]
    },
    {
      "id": 339270,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "35",
      "finished": false,
      "is_current": false,
      "starting_at": "2025-05-03",
      "ending_at": "2025-05-03",
      "games_in_current_week": false,
      "fixtures": [
        {
          "id": 19135017,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339270,
          "state_id": 1,
          "venue_id": 151,
          "name": "Manchester City vs Wolverhampton Wanderers",
          "starting_at": "2025-05-03 14:00:00",
          "result_info": null,
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": false,
          "has_premium_odds": false,
          "starting_at_timestamp": 1746280800,
          "participants": [
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "home",
                "winner": null,
                "position": null
              }
            },
            {
              "id": 29,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 492,
              "gender": "male",
              "name": "Wolverhampton Wanderers",
              "short_code": "WOL",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/29/29.png",
              "founded": 1877,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-22 15:00:00",
              "meta": {
                "location": "away",
                "winner": null,
                "position": null
              }
            }
          ],
          "scores": []
        }
      ]
    },
    {
      "id": 339243,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "9",
      "finished": true,
      "is_current": false,
      "starting_at": "2024-10-25",
      "ending_at": "2024-10-27",
      "games_in_current_week": false,
      "fixtures": [
        {
          "id": 19134531,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339243,
          "state_id": 5,
          "venue_id": 151,
          "name": "Manchester City vs Southampton",
          "starting_at": "2024-10-26 14:00:00",
          "result_info": "Manchester City won after full-time.",
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": true,
          "has_premium_odds": true,
          "starting_at_timestamp": 1729951200,
          "participants": [
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "home",
                "winner": true,
                "position": 2
              }
            },
            {
              "id": 65,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 167,
              "gender": "male",
              "name": "Southampton",
              "short_code": "SOU",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/1/65.png",
              "founded": 1885,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-22 15:00:00",
              "meta": {
                "location": "away",
                "winner": false,
                "position": 19
              }
            }
          ],
          "scores": [
            {
              "id": 15101428,
              "fixture_id": 19134531,
              "type_id": 1525,
              "participant_id": 65,
              "score": {
                "goals": 0,
                "participant": "away"
              },
              "description": "CURRENT"
            },
            {
              "id": 15101291,
              "fixture_id": 19134531,
              "type_id": 1,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "home"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15101292,
              "fixture_id": 19134531,
              "type_id": 1,
              "participant_id": 65,
              "score": {
                "goals": 0,
                "participant": "away"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15101430,
              "fixture_id": 19134531,
              "type_id": 1525,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "home"
              },
              "description": "CURRENT"
            },
            {
              "id": 15102304,
              "fixture_id": 19134531,
              "type_id": 2,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "home"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15102305,
              "fixture_id": 19134531,
              "type_id": 2,
              "participant_id": 65,
              "score": {
                "goals": 0,
                "participant": "away"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15730141,
              "fixture_id": 19134531,
              "type_id": 48996,
              "participant_id": 9,
              "score": {
                "goals": 0,
                "participant": "home"
              },
              "description": "2ND_HALF_ONLY"
            },
            {
              "id": 15730142,
              "fixture_id": 19134531,
              "type_id": 48996,
              "participant_id": 65,
              "score": {
                "goals": 0,
                "participant": "away"
              },
              "description": "2ND_HALF_ONLY"
            }
          ]
        }
      ]
    },
    {
      "id": 339272,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "37",
      "finished": false,
      "is_current": false,
      "starting_at": "2025-05-18",
      "ending_at": "2025-05-18",
      "games_in_current_week": false,
      "fixtures": [
        {
          "id": 19135037,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339272,
          "state_id": 1,
          "venue_id": 151,
          "name": "Manchester City vs AFC Bournemouth",
          "starting_at": "2025-05-18 14:00:00",
          "result_info": null,
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": false,
          "has_premium_odds": false,
          "starting_at_timestamp": 1747576800,
          "participants": [
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "home",
                "winner": null,
                "position": null
              }
            },
            {
              "id": 52,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 146,
              "gender": "male",
              "name": "AFC Bournemouth",
              "short_code": "BOU",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/20/52.png",
              "founded": 1899,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-22 15:00:00",
              "meta": {
                "location": "away",
                "winner": null,
                "position": null
              }
            }
          ],
          "scores": []
        }
      ]
    },
    {
      "id": 339264,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "29",
      "finished": false,
      "is_current": true,
      "starting_at": "2025-02-19",
      "ending_at": "2025-04-16",
      "games_in_current_week": false,
      "fixtures": [
        {
          "id": 19134956,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339264,
          "state_id": 1,
          "venue_id": 151,
          "name": "Manchester City vs Brighton & Hove Albion",
          "starting_at": "2025-03-15 15:00:00",
          "result_info": null,
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": false,
          "has_premium_odds": false,
          "starting_at_timestamp": 1742050800,
          "participants": [
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "home",
                "winner": null,
                "position": null
              }
            },
            {
              "id": 78,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 480,
              "gender": "male",
              "name": "Brighton & Hove Albion",
              "short_code": "BHA",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/14/78.png",
              "founded": 1901,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-22 15:00:00",
              "meta": {
                "location": "away",
                "winner": null,
                "position": null
              }
            }
          ],
          "scores": []
        }
      ]
    },
    {
      "id": 339252,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "18",
      "finished": true,
      "is_current": false,
      "starting_at": "2024-12-26",
      "ending_at": "2024-12-27",
      "games_in_current_week": false,
      "fixtures": [
        {
          "id": 19134904,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339252,
          "state_id": 5,
          "venue_id": 151,
          "name": "Manchester City vs Everton",
          "starting_at": "2024-12-26 12:30:00",
          "result_info": "Game ended in draw.",
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": true,
          "has_premium_odds": true,
          "starting_at_timestamp": 1735216200,
          "participants": [
            {
              "id": 13,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 12,
              "gender": "male",
              "name": "Everton",
              "short_code": "EVE",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/13/13.png",
              "founded": 1878,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-22 12:30:00",
              "meta": {
                "location": "away",
                "winner": false,
                "position": 15
              }
            },
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "home",
                "winner": false,
                "position": 7
              }
            }
          ],
          "scores": [
            {
              "id": 15371247,
              "fixture_id": 19134904,
              "type_id": 1,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "home"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15371248,
              "fixture_id": 19134904,
              "type_id": 1,
              "participant_id": 13,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15371252,
              "fixture_id": 19134904,
              "type_id": 1525,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "home"
              },
              "description": "CURRENT"
            },
            {
              "id": 15371251,
              "fixture_id": 19134904,
              "type_id": 1525,
              "participant_id": 13,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "CURRENT"
            },
            {
              "id": 15371566,
              "fixture_id": 19134904,
              "type_id": 2,
              "participant_id": 13,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15371565,
              "fixture_id": 19134904,
              "type_id": 2,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "home"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15730630,
              "fixture_id": 19134904,
              "type_id": 48996,
              "participant_id": 9,
              "score": {
                "goals": 0,
                "participant": "home"
              },
              "description": "2ND_HALF_ONLY"
            },
            {
              "id": 15730629,
              "fixture_id": 19134904,
              "type_id": 48996,
              "participant_id": 13,
              "score": {
                "goals": 0,
                "participant": "away"
              },
              "description": "2ND_HALF_ONLY"
            }
          ]
        }
      ]
    },
    {
      "id": 339260,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "26",
      "finished": true,
      "is_current": false,
      "starting_at": "2025-02-21",
      "ending_at": "2025-02-23",
      "games_in_current_week": false,
      "fixtures": [
        {
          "id": 19134590,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339260,
          "state_id": 5,
          "venue_id": 151,
          "name": "Manchester City vs Liverpool",
          "starting_at": "2025-02-23 16:30:00",
          "result_info": "Liverpool won after full-time.",
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": true,
          "has_premium_odds": true,
          "starting_at_timestamp": 1740328200,
          "participants": [
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "home",
                "winner": false,
                "position": 4
              }
            },
            {
              "id": 8,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 230,
              "gender": "male",
              "name": "Liverpool",
              "short_code": "LIV",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/8/8.png",
              "founded": 1892,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "away",
                "winner": true,
                "position": 1
              }
            }
          ],
          "scores": [
            {
              "id": 15967423,
              "fixture_id": 19134590,
              "type_id": 48996,
              "participant_id": 8,
              "score": {
                "goals": 0,
                "participant": "away"
              },
              "description": "2ND_HALF_ONLY"
            },
            {
              "id": 15967422,
              "fixture_id": 19134590,
              "type_id": 48996,
              "participant_id": 9,
              "score": {
                "goals": 0,
                "participant": "home"
              },
              "description": "2ND_HALF_ONLY"
            },
            {
              "id": 15966667,
              "fixture_id": 19134590,
              "type_id": 2,
              "participant_id": 8,
              "score": {
                "goals": 2,
                "participant": "away"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15966663,
              "fixture_id": 19134590,
              "type_id": 1525,
              "participant_id": 8,
              "score": {
                "goals": 2,
                "participant": "away"
              },
              "description": "CURRENT"
            },
            {
              "id": 15966662,
              "fixture_id": 19134590,
              "type_id": 1525,
              "participant_id": 9,
              "score": {
                "goals": 0,
                "participant": "home"
              },
              "description": "CURRENT"
            },
            {
              "id": 15966665,
              "fixture_id": 19134590,
              "type_id": 1,
              "participant_id": 8,
              "score": {
                "goals": 2,
                "participant": "away"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15966666,
              "fixture_id": 19134590,
              "type_id": 2,
              "participant_id": 9,
              "score": {
                "goals": 0,
                "participant": "home"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15966664,
              "fixture_id": 19134590,
              "type_id": 1,
              "participant_id": 9,
              "score": {
                "goals": 0,
                "participant": "home"
              },
              "description": "1ST_HALF"
            }
          ]
        }
      ]
    },
    {
      "id": 339240,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "6",
      "finished": true,
      "is_current": false,
      "starting_at": "2024-09-28",
      "ending_at": "2024-09-30",
      "games_in_current_week": false,
      "fixtures": [
        {
          "id": 19134500,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339240,
          "state_id": 5,
          "venue_id": 449,
          "name": "Newcastle United vs Manchester City",
          "starting_at": "2024-09-28 11:30:00",
          "result_info": "Game ended in draw.",
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": true,
          "has_premium_odds": true,
          "starting_at_timestamp": 1727523000,
          "participants": [
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "away",
                "winner": false,
                "position": 1
              }
            },
            {
              "id": 20,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 449,
              "gender": "male",
              "name": "Newcastle United",
              "short_code": "NEW",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/20/20.png",
              "founded": 1892,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 14:00:00",
              "meta": {
                "location": "home",
                "winner": false,
                "position": 6
              }
            }
          ],
          "scores": [
            {
              "id": 14945422,
              "fixture_id": 19134500,
              "type_id": 2,
              "participant_id": 20,
              "score": {
                "goals": 1,
                "participant": "home"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 14945423,
              "fixture_id": 19134500,
              "type_id": 2,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 14944622,
              "fixture_id": 19134500,
              "type_id": 1,
              "participant_id": 20,
              "score": {
                "goals": 0,
                "participant": "home"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 14944623,
              "fixture_id": 19134500,
              "type_id": 1,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 14944630,
              "fixture_id": 19134500,
              "type_id": 1525,
              "participant_id": 20,
              "score": {
                "goals": 1,
                "participant": "home"
              },
              "description": "CURRENT"
            },
            {
              "id": 14944631,
              "fixture_id": 19134500,
              "type_id": 1525,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "CURRENT"
            },
            {
              "id": 15730079,
              "fixture_id": 19134500,
              "type_id": 48996,
              "participant_id": 9,
              "score": {
                "goals": 0,
                "participant": "away"
              },
              "description": "2ND_HALF_ONLY"
            },
            {
              "id": 15730080,
              "fixture_id": 19134500,
              "type_id": 48996,
              "participant_id": 20,
              "score": {
                "goals": 1,
                "participant": "home"
              },
              "description": "2ND_HALF_ONLY"
            }
          ]
        }
      ]
    },
    {
      "id": 339238,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "4",
      "finished": true,
      "is_current": false,
      "starting_at": "2024-09-14",
      "ending_at": "2024-09-15",
      "games_in_current_week": false,
      "fixtures": [
        {
          "id": 19134629,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339238,
          "state_id": 5,
          "venue_id": 151,
          "name": "Manchester City vs Brentford",
          "starting_at": "2024-09-14 14:00:00",
          "result_info": "Manchester City won after full-time.",
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": true,
          "has_premium_odds": true,
          "starting_at_timestamp": 1726322400,
          "participants": [
            {
              "id": 236,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 338817,
              "gender": "male",
              "name": "Brentford",
              "short_code": "BRE",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/12/236.png",
              "founded": 1889,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-21 20:00:00",
              "meta": {
                "location": "away",
                "winner": false,
                "position": 6
              }
            },
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "home",
                "winner": true,
                "position": 1
              }
            }
          ],
          "scores": [
            {
              "id": 14869994,
              "fixture_id": 19134629,
              "type_id": 2,
              "participant_id": 236,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 14869995,
              "fixture_id": 19134629,
              "type_id": 2,
              "participant_id": 9,
              "score": {
                "goals": 2,
                "participant": "home"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 14868450,
              "fixture_id": 19134629,
              "type_id": 1,
              "participant_id": 236,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 14868451,
              "fixture_id": 19134629,
              "type_id": 1,
              "participant_id": 9,
              "score": {
                "goals": 2,
                "participant": "home"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 14868485,
              "fixture_id": 19134629,
              "type_id": 1525,
              "participant_id": 236,
              "score": {
                "goals": 1,
                "participant": "away"
              },
              "description": "CURRENT"
            },
            {
              "id": 14868484,
              "fixture_id": 19134629,
              "type_id": 1525,
              "participant_id": 9,
              "score": {
                "goals": 2,
                "participant": "home"
              },
              "description": "CURRENT"
            },
            {
              "id": 15730236,
              "fixture_id": 19134629,
              "type_id": 48996,
              "participant_id": 9,
              "score": {
                "goals": 0,
                "participant": "home"
              },
              "description": "2ND_HALF_ONLY"
            },
            {
              "id": 15730235,
              "fixture_id": 19134629,
              "type_id": 48996,
              "participant_id": 236,
              "score": {
                "goals": 0,
                "participant": "away"
              },
              "description": "2ND_HALF_ONLY"
            }
          ]
        }
      ]
    },
    {
      "id": 339239,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "5",
      "finished": true,
      "is_current": false,
      "starting_at": "2024-09-21",
      "ending_at": "2024-09-22",
      "games_in_current_week": false,
      "fixtures": [
        {
          "id": 19134489,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339239,
          "state_id": 5,
          "venue_id": 151,
          "name": "Manchester City vs Arsenal",
          "starting_at": "2024-09-22 15:30:00",
          "result_info": "Game ended in draw.",
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": true,
          "has_premium_odds": true,
          "starting_at_timestamp": 1727019000,
          "participants": [
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "home",
                "winner": false,
                "position": 1
              }
            },
            {
              "id": 19,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 204,
              "gender": "male",
              "name": "Arsenal",
              "short_code": "ARS",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/19/19.png",
              "founded": 1886,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-22 15:00:00",
              "meta": {
                "location": "away",
                "winner": false,
                "position": 4
              }
            }
          ],
          "scores": [
            {
              "id": 14922647,
              "fixture_id": 19134489,
              "type_id": 2,
              "participant_id": 9,
              "score": {
                "goals": 2,
                "participant": "home"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 14922648,
              "fixture_id": 19134489,
              "type_id": 2,
              "participant_id": 19,
              "score": {
                "goals": 2,
                "participant": "away"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 14921681,
              "fixture_id": 19134489,
              "type_id": 1,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "home"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 14921682,
              "fixture_id": 19134489,
              "type_id": 1,
              "participant_id": 19,
              "score": {
                "goals": 2,
                "participant": "away"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 14921687,
              "fixture_id": 19134489,
              "type_id": 1525,
              "participant_id": 19,
              "score": {
                "goals": 2,
                "participant": "away"
              },
              "description": "CURRENT"
            },
            {
              "id": 14921688,
              "fixture_id": 19134489,
              "type_id": 1525,
              "participant_id": 9,
              "score": {
                "goals": 2,
                "participant": "home"
              },
              "description": "CURRENT"
            },
            {
              "id": 15730058,
              "fixture_id": 19134489,
              "type_id": 48996,
              "participant_id": 19,
              "score": {
                "goals": 0,
                "participant": "away"
              },
              "description": "2ND_HALF_ONLY"
            },
            {
              "id": 15730057,
              "fixture_id": 19134489,
              "type_id": 48996,
              "participant_id": 9,
              "score": {
                "goals": 1,
                "participant": "home"
              },
              "description": "2ND_HALF_ONLY"
            }
          ]
        }
      ]
    },
    {
      "id": 339255,
      "sport_id": 1,
      "league_id": 8,
      "season_id": 23614,
      "stage_id": 77471288,
      "name": "21",
      "finished": true,
      "is_current": false,
      "starting_at": "2025-01-14",
      "ending_at": "2025-01-16",
      "games_in_current_week": false,
      "fixtures": [
        {
          "id": 19134554,
          "sport_id": 1,
          "league_id": 8,
          "season_id": 23614,
          "stage_id": 77471288,
          "group_id": null,
          "aggregate_id": null,
          "round_id": 339255,
          "state_id": 5,
          "venue_id": 338817,
          "name": "Brentford vs Manchester City",
          "starting_at": "2025-01-14 19:30:00",
          "result_info": "Game ended in draw.",
          "leg": "1/1",
          "details": null,
          "length": 90,
          "placeholder": false,
          "has_odds": true,
          "has_premium_odds": true,
          "starting_at_timestamp": 1736883000,
          "participants": [
            {
              "id": 236,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 338817,
              "gender": "male",
              "name": "Brentford",
              "short_code": "BRE",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/12/236.png",
              "founded": 1889,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-21 20:00:00",
              "meta": {
                "location": "home",
                "winner": false,
                "position": 11
              }
            },
            {
              "id": 9,
              "sport_id": 1,
              "country_id": 462,
              "venue_id": 151,
              "gender": "male",
              "name": "Manchester City",
              "short_code": "MCI",
              "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
              "founded": 1880,
              "type": "domestic",
              "placeholder": false,
              "last_played_at": "2025-02-23 16:30:00",
              "meta": {
                "location": "away",
                "winner": false,
                "position": 6
              }
            }
          ],
          "scores": [
            {
              "id": 15411536,
              "fixture_id": 19134554,
              "type_id": 1,
              "participant_id": 9,
              "score": {
                "goals": 0,
                "participant": "away"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15411523,
              "fixture_id": 19134554,
              "type_id": 1525,
              "participant_id": 9,
              "score": {
                "goals": 2,
                "participant": "away"
              },
              "description": "CURRENT"
            },
            {
              "id": 15411529,
              "fixture_id": 19134554,
              "type_id": 1,
              "participant_id": 236,
              "score": {
                "goals": 0,
                "participant": "home"
              },
              "description": "1ST_HALF"
            },
            {
              "id": 15412160,
              "fixture_id": 19134554,
              "type_id": 48996,
              "participant_id": 236,
              "score": {
                "goals": 2,
                "participant": "home"
              },
              "description": "2ND_HALF_ONLY"
            },
            {
              "id": 15412161,
              "fixture_id": 19134554,
              "type_id": 48996,
              "participant_id": 9,
              "score": {
                "goals": 2,
                "participant": "away"
              },
              "description": "2ND_HALF_ONLY"
            },
            {
              "id": 15411537,
              "fixture_id": 19134554,
              "type_id": 2,
              "participant_id": 236,
              "score": {
                "goals": 2,
                "participant": "home"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15411539,
              "fixture_id": 19134554,
              "type_id": 2,
              "participant_id": 9,
              "score": {
                "goals": 2,
                "participant": "away"
              },
              "description": "2ND_HALF"
            },
            {
              "id": 15411518,
              "fixture_id": 19134554,
              "type_id": 1525,
              "participant_id": 236,
              "score": {
                "goals": 2,
                "participant": "home"
              },
              "description": "CURRENT"
            }
          ]
        }
      ]
    }
  ],
  "fixtures": [
    {
      "id": 19292985,
      "sport_id": 1,
      "league_id": 27,
      "season_id": 23685,
      "stage_id": 77471556,
      "group_id": null,
      "aggregate_id": null,
      "round_id": null,
      "state_id": 5,
      "venue_id": 151,
      "name": "Manchester City vs Watford",
      "starting_at": "2024-09-24 18:45:00",
      "result_info": "Manchester City won after full-time.",
      "leg": "1/1",
      "details": null,
      "length": 90,
      "placeholder": false,
      "has_odds": true,
      "has_premium_odds": true,
      "starting_at_timestamp": 1727203500,
      "participants": [
        {
          "id": 25,
          "sport_id": 1,
          "country_id": 462,
          "venue_id": 19,
          "gender": "male",
          "name": "Watford",
          "short_code": "WAT",
          "image_path": "https://cdn.sportmonks.com/images/soccer/teams/25/25.png",
          "founded": 1881,
          "type": "domestic",
          "placeholder": false,
          "last_played_at": "2025-02-23 12:00:00",
          "meta": {
            "location": "away",
            "winner": false,
            "position": 2
          }
        },
        {
          "id": 9,
          "sport_id": 1,
          "country_id": 462,
          "venue_id": 151,
          "gender": "male",
          "name": "Manchester City",
          "short_code": "MCI",
          "image_path": "https://cdn.sportmonks.com/images/soccer/teams/9/9.png",
          "founded": 1880,
          "type": "domestic",
          "placeholder": false,
          "last_played_at": "2025-02-23 16:30:00",
          "meta": {
            "location": "home",
            "winner": true,
            "position": 1
          }
        }
      ],
      "scores": [
        {
          "id": 14933336,
          "fixture_id": 19292985,
          "type_id": 1525,
          "participant_id": 9,
          "score": {
            "goals": 2,
            "participant": "home"
          },
          "description": "CURRENT"
        },
        {
          "id": 14933648,
          "fixture_id": 19292985,
          "type_id": 2,
          "participant_id": 25,
          "score": {
            "goals": 1,
            "participant": "away"
          },
          "description": "2ND_HALF"
        },
        {
          "id": 14933647,
          "fixture_id": 19292985,
          "type_id": 2,
          "participant_id": 9,
          "score": {
            "goals": 2,
            "participant": "home"
          },
          "description": "2ND_HALF"
        },
        {
          "id": 14933335,
          "fixture_id": 19292985,
          "type_id": 1525,
          "participant_id": 25,
          "score": {
            "goals": 1,
            "participant": "away"
          },
          "description": "CURRENT"
        },
        {
          "id": 14933327,
          "fixture_id": 19292985,
          "type_id": 1,
          "participant_id": 9,
          "score": {
            "goals": 2,
            "participant": "home"
          },
          "description": "1ST_HALF"
        },
        {
          "id": 14933328,
          "fixture_id": 19292985,
          "type_id": 1,
          "participant_id": 25,
          "score": {
            "goals": 0,
            "participant": "away"
          },
          "description": "1ST_HALF"
        },
        {
          "id": 15840656,
          "fixture_id": 19292985,
          "type_id": 48996,
          "participant_id": 25,
          "score": {
            "goals": 1,
            "participant": "away"
          },
          "description": "2ND_HALF_ONLY"
        },
        {
          "id": 15840657,
          "fixture_id": 19292985,
          "type_id": 48996,
          "participant_id": 9,
          "score": {
            "goals": 0,
            "participant": "home"
          },
          "description": "2ND_HALF_ONLY"
        }
      ]
    }
  ]
}

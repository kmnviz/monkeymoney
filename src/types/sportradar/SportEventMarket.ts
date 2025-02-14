export type SportEventMarket = {
  "id": string, // "sr:market:1",
  "name": string, // "1x2",
  "is_live": boolean, // false,
  "books": [
    {
      "id": string, // "sr:book:17324",
      "name": string, // "MGM",
      "removed": boolean, // false,
      "external_sport_event_id": string, // "2:7534610",
      "external_market_id": string, // "174359241",
      "outcomes": [
        {
          "id": string, // "sr:outcome:1",
          "type": string, // "home",
          "odds_decimal": string, // "2.450",
          "odds_american": string, // "+145",
          "odds_fraction": string, // "29/20",
          "open_odds_decimal": string, // "2.350",
          "open_odds_american": string, // "+135",
          "open_odds_fraction": string, // "27/20",
          "external_outcome_id": string, // "603938428",
          "removed": boolean, // false
        },
      ],
    },
  ],
}

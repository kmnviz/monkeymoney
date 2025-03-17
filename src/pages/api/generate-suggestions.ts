// @ts-nocheck
import type {NextApiRequest, NextApiResponse} from 'next';
import OpenAI from 'openai';
import Decimal from 'decimal.js';
import tiktoken from 'tiktoken';
import SportmonksApiClient from '../../services/sportmonksApiClient';
import {ParticipantEnum} from '../../enums/sportmonks';
import {
  leagueNameById,
  positionNameById,
  pause,
  formatJsonStringToJson
} from '../../utils';
import sportmonksTypes from '../../database/sportmonks/types.json';
import sportmonksMarkets from '../../database/sportmonks/markets.json';
import {TOdd} from '../../types/sportmonks/Odd';
import {TFixture} from '../../types/sportmonks/Fixture';
import GoogleCloudStorageClient from '../../services/googleCloudStorageClient';

const googleCloudStorageClient = new GoogleCloudStorageClient();
const sportmonksApiClient = new SportmonksApiClient();
const TPM_LIMIT = 30000;
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string,
});
const deepSeek = new OpenAI({
  baseURL: process.env.DEEPSEEK_API_URL,
  apiKey: process.env.DEEPSEEK_API_KEY as string,
});
const models = {
  gpt4Turbo: 'gpt-4-turbo',
  gpt4o: 'gpt-4o',
  gpt4oLatest: 'chatgpt-4o-latest',
  deepSeekReasoner: 'deepseek-reasoner',
  deepSeekChat: 'deepseek-chat',
};

const createSelectFixturesCompletion = async (count: number, fixtures: any[]) => {
  const content = fixtures.map((fixture) => {
    return {
      fixture_id: fixture.id,
      fixture: `${fixture.participants[0].name} vs ${fixture.participants[1].name}`,
    };
  });

  const messages = [
    {
      role: 'system',
      content: `You are an expert football analyst and betting strategist. Your task is to analyze a given list of football fixtures and select the top ${count} fixtures that have the highest potential for successful betting promotion. Use a data-driven approach based on value, team's popularity, historical number of viewer, overall fixture popularity.`,
    },
    {
      role: 'user',
      content: `
      ### Task:
      Analyze the following list of football fixtures and select the best ${count} fixtures for betting promotion. Rank them based on their betting potential and provide reasoning for each selection.

      ### Selection Criteria:
      - **Market Popularity**: Choose fixtures trending in betting discussions and social media.
      - **League/Competition Importance**: Focus on top leagues and competitions.

      ### Input Fixtures:
      [{\\"fixture_id\\": \\"X\\", \\"fixture\\": \\"Team A vs Team B\\"}, {\\"fixture_id\\": \\"Y\\", \\"fixture\\": \\"Team C vs Team D\\"}]

      ### Expected Output Format:
      Return ONLY a comma-separated list of ${count} fixture_ids like:
      X,Y,Z
      `,
    },
    {
      role: 'assistant',
      content: JSON.stringify(content),
    },
  ];

  const completion = await deepSeek.chat.completions.create({
    model: models.deepSeekChat,
    messages: messages,
    temperature: 0,
  } as any);

  console.log('createSelectFixturesCompletion completion: ', completion.usage?.total_tokens);
  console.log('createSelectFixturesCompletion completion: ', completion.choices[0].message);

  return {
    data: completion.choices[0].message.content,
  };
}

const createBetSuggestionCompletion = async (content, mainModel = null) => {
  const lContent = {...content};
  lContent['odds'] = lContent['odds'].map(({prob, ...rest}) => rest);
  // const probInstruction = `**PROBABILITY MUST BE MORE THAN 70% AND THE ODD MUST BE MORE THAN 1.70**`;
  const probInstruction = `Think strategically and prioritize bets where **real probability > 70% and odds > 1.70.**`;

  const messages = [
    {
      role: 'system',
      content: `You are a world-class football data analyst. Analyze the JSON data and provide insights. Return a JSON response.`,
    },
    {
      role: 'user',
      content:
      //   `
      //     🔹 Step 1: Deep Team & Player Analysis
      //     Perform a precise breakdown of both teams’ current form, momentum shifts, and season-long trends.
      //     Analyze each key player’s performance metrics (goals, assists, defensive actions, xG, xGA, etc.).
      //     Evaluate injuries, suspensions, and player fatigue—determine their true impact on the match.
      //     Assess psychological factors:
      //     Team confidence level (winning streak, losing streak)
      //     Pressure due to league standing
      //     Motivation in different competitions
      //
      //     🔹 Step 2: Advanced Tactical & Strategic Insights
      //     Formations & Tactical Setup:
      //     Expected line-ups and formation matchups (e.g., 4-3-3 vs 3-5-2).
      //     Strengths/weaknesses of each approach.
      //     Pressing Intensity & Defensive Stability:
      //     High-press vs. Low-block teams: how does this affect match dynamics?
      //     Set-piece Efficiency:
      //     Which team is stronger in corners, free kicks, or penalties?
      //     Head-to-Head Managerial Battle:
      //     How well do the coaches adapt to different situations?
      //     Historical results when they have faced off.
      //
      //     🔹 Step 3: Contextual & Motivational Analysis
      //     Match Importance:
      //     Is this a must-win game for either team?
      //     Are they prioritizing another competition (e.g., Champions League vs domestic league)?
      //     Fixture Congestion:
      //     How many games have each team played recently?
      //     How will fatigue & squad rotation affect performance?
      //     Home/Away Impact & External Factors:
      //     Does the venue provide an advantage? (e.g., altitude, crowd effect)
      //     Weather conditions that may impact playing style (e.g., rain, snow, heat).
      //
      //     🔹 Step 4: Data-Driven Probability & Betting Optimization
      //     Use logical, data-backed reasoning to determine the most probable outcome.
      //     Identify the best-value betting market by comparing odds to real probabilities.
      //     If the most obvious bet has low profitability, search for market inefficiencies.
      //     Ensure the final bet selection has an implied probability much higher than bookmaker odds suggest.
      //
      //     🔹 Step 5: Final instruction
      //     Think outside of the box and leverage your deepest football knowledge.
      //     Do not provide generic answers—focus on unique insights, tactical angles, and betting inefficiencies that others might overlook.
      //     Your goal is to find the smartest and most profitable bet, not just the most obvious one.
      //     **Take the statistics data and the odds data from the provided context ONLY**.
      //     ${probInstruction}
      //
      //     🔹 Step 6: **Output Format (Strictly Follow This JSON Structure):**
      //     {
      //       "bet": "<Team A vs Team B>",
      //       "bet": "<Detailed Bet Selection>",
      //       "probability": "<Calculated Probability (%)>",
      //       "odd": "<Selected Odd>",
      //       "market_description": "<Brief Explanation of the Market>",
      //       "comprehensive_detailed_reason": "<Comprehensive Detailed Reason>"
      //     }
      //
      //     🔹 Additional Instructions for GPT:
      //     Do not provide generic responses.
      //     Every prediction must be backed by data, tactical logic, or psychological insight.
      //     Consider multiple angles before settling on the best bet.
      //     Always compare real probability vs. bookmaker odds for expected value.
      // `,
        `
          🔹 Step 1: Deep Team & Player Analysis
            - Prioritize recent form (last 5 games) over full-season trends.
            - Weigh xG, xGA, key passes, and shots on target.
            - Factor in injuries, suspensions, fatigue, and tactical changes.

          🔹 Step 2: Tactical & Strategic Breakdown
            - Compare expected formations & playing styles.
            - If one team presses high and the other defends deep, analyze tactical impact.
            - Consider set-piece efficiency and defensive weaknesses.

          🔹 Step 3: Contextual Factors
            - Assess motivation (must-win game, relegation fight, Champions League rotation).
            - If a team has changed coaches in the last 5 games, **prioritize their recent tactics** over historical trends.
            - Home/Away impact, crowd effect, and external conditions (weather, travel fatigue).

          🔹 Step 4: Betting Value & Fair Odds Calculation
            - Convert bookmaker odds into **implied probability** and compare with real data.
            - If **bookmaker odds suggest a 60% probability but real data shows 75%**, it’s a **value bet**.
            - Filter out **low-value bets**, even if they seem obvious.

          🔹 Step 5: **Final Instruction**
            - ${probInstruction}
            - If the selected bet does not meet these criteria, **recalculate** the selection.
            - ** IN ANY CASE THERE SHOULD BE A RECOMMENDED BET **

          🔹 Step 6: **Output Format (Strictly Follow This JSON Structure):**
          {
            "fixture": "<Team A vs Team B>",
            "bet": "<Detailed Bet Selection>",
            "probability": "<Calculated Probability (%)>",
            "odd_id": "<Selected Odd ID>",
            "odd": "<Selected Odd>",
            "market_id": "<Selected Market ID>",
            "market_description": "<Brief Explanation of the Market>",
            "comprehensive_detailed_reason": "<Comprehensive Detailed Reason>"
          }
      `
    },
    {
      role: 'assistant',
      content: JSON.stringify(lContent),
    },
  ];

  let model;
  if (mainModel) {
    model = mainModel;
    try {
      const completion = await openai.chat.completions.create({
        model: model,
        messages: messages,
        temperature: 0,
      } as any);

      console.log('createBetSuggestionCompletion completion: ', completion.usage?.total_tokens);
      console.log('createBetSuggestionCompletion completion: ', completion.choices[0].message);

      return {
        model: model,
        data: JSON.parse(completion.choices[0].message.content as string),
      };
    } catch (error) {
      console.log('error: ', error);
      const tokensCount = countTokens(messages, models.gpt4Turbo);
      console.log('tokenCounts: ', tokensCount);

      if (tokensCount >= TPM_LIMIT) {
        return {
          data:
            `
              fixture ${lContent.fixture.name} has context with ${tokensCount} tokens,
              which is higher than the limit of ${TPM_LIMIT}. the error is probably
              due to rate limit hit.
            `
        };
      }

      return {
        data: `fixture ${lContent.fixture.name} failed with ${error.message}`,
      };
    }
  }

  try {
    model = models.deepSeekReasoner;
    // model = models.deepSeekChat;
    const lMessages = messages;
    lMessages[3] = {
      role: 'user',
      content:
      //   `
      //   Final Instruction:
      //   Think outside of the box and leverage your deepest football knowledge.
      //   Do not provide generic answers—focus on unique insights, tactical angles, and betting inefficiencies that others might overlook.
      //   Your goal is to find the smartest and most profitable bet, not just the most obvious one.
      //   ${probInstruction}
      //
      //   **Output Format (Strictly Follow This JSON Structure):**
      //     {
      //       "bet": "<Team A vs Team B>",
      //       "bet": "<Detailed Bet Selection>",
      //       "probability": "<Calculated Probability (%)>",
      //       "odd": "<Selected Odd>",
      //       "market_description": "<Brief Explanation of the Market>",
      //       "comprehensive_detailed_reason": "<Comprehensive Detailed Reason>"
      //     }
      // `,
        `
        **Final Instruction**
          - ${probInstruction}
          - ** Think outside the box and leverage your deepest football knowledge. **
          - If the selected bet does not meet these criteria, **recalculate** the selection.
          - ** IN ANY CASE THERE SHOULD BE A RECOMMENDED BET **

        **Output Format (Strictly Follow This JSON Structure):**
          {
            "fixture": "<Team A vs Team B>",
            "bet": "<Detailed Bet Selection>",
            "probability": "<Calculated Probability (%)>",
            "odd_id": "<Selected Odd ID>",
            "odd": "<Selected Odd>",
            "market_id": "<Selected Market ID>",
            "market_description": "<Brief Explanation of the Market>",
            "comprehensive_detailed_reason": "<Comprehensive Detailed Reason>"
          }
      `
    };

    const completion = await deepSeek.chat.completions.create({
      model: model,
      messages: lMessages,
      temperature: 0,
    } as any);

    console.log('createBetSuggestionCompletion completion: ', completion.usage);
    console.log('createBetSuggestionCompletion completion: ', completion.choices[0].message);

    return {
      model: model,
      data: formatJsonStringToJson(completion.choices[0].message.content),
      reasoning: completion.choices[0].message['reasoning_content'],
    };
  } catch (error) {
    try {
      model = models.gpt4Turbo;
      const completion = await openai.chat.completions.create({
        model: model,
        messages: messages,
        temperature: 0,
      } as any);

      console.log('createBetSuggestionCompletion completion: ', completion.usage);
      console.log('createBetSuggestionCompletion completion: ', completion.choices[0].message);

      return {
        model: model,
        data: JSON.parse(completion.choices[0].message.content as string),
      };
    } catch (err) {
      console.log('err: ', err);
      const tokensCount = countTokens(messages, models.gpt4Turbo);
      console.log('tokenCounts: ', tokensCount);

      if (tokensCount >= TPM_LIMIT) {
        return {
          data:
            `
              fixture ${lContent.fixture.name} has context with ${tokensCount} tokens,
              which is higher than the limit of ${TPM_LIMIT}. the error is probably
              due to rate limit hit.
            `
        };
      }

      return {
        data: `fixture ${lContent.fixture.name} failed with ${error.message}`,
      };
    }
  }

  // if (model === 'deepseek-reasoner') {
  //   messages[3] = {
  //     role: 'user',
  //     content:
  //       `
  //       Final Instruction:
  //       Think outside of the box and leverage your deepest football knowledge.
  //       Do not provide generic answers—focus on unique insights, tactical angles, and betting inefficiencies that others might overlook.
  //       Your goal is to find the smartest and most profitable bet, not just the most obvious one.
  //       Try your best to find THE MOST UNOBVIOUS MARKET OVER 2.00 with the HIGHEST PROBABILITY OVER 75%
  //     `,
  //   };
  // }
  //
  // try {
  //   const completion = await openai.chat.completions.create({
  //     model: model,
  //     messages: messages,
  //     temperature: 0,
  //   } as any);
  //
  //   console.log('createBetSuggestionCompletion completion: ', completion.usage);
  //   console.log('createBetSuggestionCompletion completion: ', completion.choices[0].message);
  //
  //   const response = {
  //     data: completion.choices[0].message.content,
  //   };
  //
  //   if (model === 'deepseek-reasoner') {
  //     response['reasoning'] = completion.choices[0].message['reasoning_content'];
  //   }
  //
  //   return response;
  // } catch (error) {
  //   console.log('error: ', error);
  //   if (model !== 'deepseek-reasoner') {
  //     const tokensCount = countTokens(messages, model);
  //     console.log('tokenCounts: ', tokensCount);
  //
  //     if (tokensCount >= TPM_LIMIT) {
  //       return {
  //         data:
  //           `
  //             fixture ${lContent.fixture.name} has context with ${tokensCount} tokens,
  //             which is higher than the limit of ${TPM_LIMIT}. the error is probably
  //             due to rate limit hit.
  //           `
  //       };
  //     }
  //   }
  //
  //   return {
  //     data: `fixture ${lContent.fixture.name} failed with ${error.message}`,
  //   };
  // }
}

const countTokens = (messages, model) => {
  const encoding = tiktoken.encoding_for_model(model);
  let tokenCount = 0;

  for (const message of messages) {
    tokenCount += encoding.encode(message.content).length;
    tokenCount += 4;
  }

  return tokenCount;
}

const removeEmptyArrays = (obj) => {
  if (Array.isArray(obj)) {
    // Filter out empty arrays and clean nested arrays
    return obj.map(removeEmptyArrays).filter(item => !(Array.isArray(item) && item.length === 0));
  } else if (typeof obj === "object" && obj !== null) {
    // Recursively clean nested objects
    for (let key in obj) {
      obj[key] = removeEmptyArrays(obj[key]);

      // Remove empty arrays after recursion
      if (Array.isArray(obj[key]) && obj[key].length === 0) {
        delete obj[key];
      }
    }
  }
  return obj;
}

const removeNullValues = (obj) => {
  if (Array.isArray(obj)) {
    // Clean arrays by recursively processing elements
    return obj.map(removeNullValues).filter(item => item !== null);
  } else if (typeof obj === "object" && obj !== null) {
    // Recursively process object properties
    for (let key in obj) {
      obj[key] = removeNullValues(obj[key]);

      // Delete key if the value is null
      if (obj[key] === null) {
        delete obj[key];
      }
    }
  }
  return obj;
}

const removeZeroValues = (obj) => {
  // Check if the input is an object or an array
  if (Array.isArray(obj)) {
    // If it's an array, iterate through each item
    return obj.map(item => removeZeroValues(item)).filter(item => item !== 0 && item !== undefined && item !== null);
  } else if (typeof obj === 'object' && obj !== null) {
    // If it's an object, iterate through its keys
    let newObj = {};

    // Loop through each key of the object
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];

        // Recursively remove zero values from nested objects/arrays
        const cleanedValue = removeZeroValues(value);

        // Only add to the new object if the value is not 0, undefined, or null
        if (cleanedValue !== 0 && cleanedValue !== undefined && cleanedValue !== null) {
          newObj[key] = cleanedValue;
        }
      }
    }

    return newObj;
  }

  // If it's not an object or array, return the value itself (base case)
  return obj;
}

const removeEmptyObjects = (obj) => {
  if (typeof obj !== "object" || obj === null) return obj; // Return non-objects as is

  // Recursively process each key
  Object.keys(obj).forEach(key => {
    obj[key] = removeEmptyObjects(obj[key]); // Recursively clean nested objects

    // If the cleaned value is an empty object, delete the key
    if (typeof obj[key] === "object" && obj[key] !== null && Object.keys(obj[key]).length === 0) {
      delete obj[key];
    }
  });

  return obj;
}

const modifyTeam = (team) => {
  return {
    id: team.id,
    name: team.name,
    last_played_at: team.last_played_at,
    activeseasons: team.activeseasons,
    players: team.players,
    coaches: team.coaches,
  }
}

const modifyActiveSeasons = (activeSeasons) => {
  return activeSeasons.map((as) => {
    return {
      id: as.id,
      name: as.name,
      league: leagueNameById(as.league_id),
    };
  });
}

const modifyPlayerStatistics = (data) => {
  const optimized = {};

  data.forEach(detail => {
    const key = Object.keys(detail)[0]; // Get the stat key (e.g., "Goals", "Yellowcards", etc.)
    const value = detail[key];

    // Flatten the data based on keys
    switch (key) {
      case "Captain":
        optimized["captain_total"] = value.total;
        break;
      case "Goals":
        optimized["goals_total"] = value.total;
        optimized["goals_goals"] = value.goals;
        break;
      case "Assists":
        optimized["assists_total"] = value.total;
        break;
      case "Yellowcards":
        optimized["yellowcards_total"] = value.total;
        optimized["yellowcards_home"] = value.home;
        optimized["yellowcards_away"] = value.away;
        break;
      case "Goals Conceded":
        optimized["goals_conceded_total"] = value.total;
        break;
      case "Minutes Played":
        optimized["minutes_played_total"] = value.total;
        break;
      case "Cleansheets":
        optimized["cleansheets_total"] = value.total;
        optimized["cleansheets_home"] = value.home;
        optimized["cleansheets_away"] = value.away;
        break;
      case "Team Wins":
        optimized["team_wins_total"] = value.total;
        break;
      case "Team Draws":
        optimized["team_draws_total"] = value.total;
        break;
      case "Team Lost":
        optimized["team_lost_total"] = value.total;
        break;
      case "Appearances":
        optimized["appearances_total"] = value.total;
        break;
      case "Lineups":
        optimized["lineups_total"] = value.total;
        break;
      default:
        break;
    }
  });

  return optimized;
}

const modifyPlayers = (players) => {
  return players.map((pl) => {
    return {
      id: pl.id,
      player_id: pl.player_id,
      start: pl.start,
      end: pl.end,
      position: positionNameById(pl.position_id),
    };
  });
}

const modifyCoaches = async (coaches) => {
  const result = [];
  for (let i = 0; i < coaches.length; i++) {
    const coach = await sportmonksApiClient.getCoachById(coaches[i]['coach_id']);

    if (coach) {
      result.push({
        start: coaches[i]?.start,
        end: coaches[i]?.end,
        name: coach?.name,
        date_of_birth: coach?.date_of_birth,
        position: positionNameById(coaches[i]?.position_id),
      });
    }
  }

  return result;
}

const modifyStatistics = (statistics) => {
  const types = sportmonksTypes;

  return statistics
    .filter((stat) =>
      stat.has_values
      && stat.hasOwnProperty('details')
      && stat.details.length > 0
    )
    .map((stat) => {
      return {
        season_id: stat.season_id,
        details: stat.details.map((detail) => {
          const type = types.find((t) => t.id === detail.type_id);

          return {
            [type.name]: detail.value,
          };

          return {
            type: type ? type.name : null,
            value: detail.value,
          };
        }),
      }
    })
    .flat();
}

const modifyStandings = (standings, team) => {
  return standings.map((st) => {
    const result = {
      participant_id: st.participant_id,
      points: st.points,
    };

    if (st.participant_id === team.id) {
      result['is_current_team'] = true;
    }

    return result;
  });
}

const modifyScores = (obj) => {
  if (Array.isArray(obj)) {
    // Loop through array elements
    obj.forEach(item => modifyScores(item)); // Recursively process nested arrays
  } else if (typeof obj === "object" && obj !== null) {
    // Check if the current object has the "scores" key
    if (obj.hasOwnProperty('scores') && Array.isArray(obj.scores) && obj.scores.length >= 2) {
      // Find which score corresponds to home and which corresponds to away
      const homeScore = obj.scores.find(score => score.score.participant === "home");
      const awayScore = obj.scores.find(score => score.score.participant === "away");

      // If both home and away scores are found, format as "home : away"
      if (homeScore && awayScore) {
        const homeGoals = homeScore.score.goals || 0; // Get home goals (default 0 if missing)
        const awayGoals = awayScore.score.goals || 0; // Get away goals (default 0 if missing)
        obj.scores = `${homeGoals}:${awayGoals}`; // Set the value of "scores" as a string
      }
    }

    // Recursively process nested objects
    for (let key in obj) {
      modifyScores(obj[key]);
    }
  }

  return obj;
}

const modifySchedules = (schedules) => {
  let result = schedules.map((sc) => {
    return {
      name: sc.name,
      // finished: sc.finished,
      starting_at: sc.starting_at,
      ending_at: sc.ending_at,
      fixtures: sc.fixtures ? sc.fixtures.map((fx) => {
        return {
          name: fx.name,
          starting_at: fx.starting_at,
          result_info: fx.result_info,
          length: fx.length,
          // participants: fx.participants.map((pt) => {
          //   return {
          //     name: pt.name,
          //     last_played_at: pt.last_played_at,
          //   };
          // }),
          scores: fx.scores ? fx.scores.map((sc) => {
            return {
              score: sc.score,
              description: sc.description,
            };
          }).filter((sc) => {
            return sc.description === 'CURRENT';
          }) : [],
        };
      }) : [],
      rounds: sc.rounds ? sc.rounds.map((rd) => {
        return {
          // name: rd.name,
          starting_at: rd.starting_at,
          result_info: rd.result_info,
          // length: rd.length,
          // participants: rd.participants ? rd.participants.map((pt) => {
          //   return {
          //     name: pt.name,
          //     last_played_at: pt.last_played_at,
          //   };
          // }) : [],
          scores: rd.scores ? rd.scores.map((sc) => {
            return {
              score: sc.score,
              description: sc.description,
            };
          }).filter((sc) => {
            return sc.description === 'CURRENT';
          }) : [],
          fixtures: rd.fixtures ? rd.fixtures.map((fx) => {
            return {
              name: fx.name,
              starting_at: fx.starting_at,
              result_info: fx.result_info,
              // length: fx.length,
              // participants: fx.participants.map((pt) => {
              //   return {
              //     name: pt.name,
              //     last_played_at: pt.last_played_at,
              //   };
              // }),
              scores: fx.scores ? fx.scores.map((sc) => {
                return {
                  score: sc.score,
                  description: sc.description,
                };
              }).filter((sc) => {
                return sc.description === 'CURRENT';
              }) : [],
            };
          }) : [],
        };
      }) : [],
      // aggregates: sc.rounds ? sc.rounds.map((agg) => {
      //   return {
      //     name: agg.name,
      //     starting_at: agg.starting_at,
      //     result_info: agg.result_info,
      //     length: agg.length,
      //     // participants: agg.participants ? agg.participants.map((pt) => {
      //     //   return {
      //     //     name: pt.name,
      //     //     last_played_at: pt.last_played_at,
      //     //   };
      //     // }) : [],
      //     scores: agg.scores ? agg.scores.map((sc) => {
      //       return {
      //         score: sc.score,
      //         description: sc.description,
      //       };
      //     }) : [],
      //   };
      // }) : [],
    };
  });

  result = removeEmptyArrays(result);
  result = removeNullValues(result);
  result = modifyScores(result);
  return result;
}

const modifyOdds = (odds: TOdd[], minProbability = '0%', maxProbability = '100%') => {
  const markets = sportmonksMarkets;
  const marketsIds = markets.map((m) => m.id);

  return odds
    .filter((odd) => marketsIds.includes(odd.market_id))
    .map((odd) => {
      const newOdd = {
        id: odd.id,
        label: odd.label,
        // value: odd.value,
        market: odd.market_description,
        prob: odd.probability,
        odd: odd.dp3,
        market_id: odd.market_id,
      };

      if (odd.handicap) newOdd['handicap'] = odd.handicap;
      if (odd.total) newOdd['total'] = odd.total;

      return newOdd;
    })
    .filter((odd) => {
      const prob = odd.prob
        .replace('%', '');

      return Decimal(prob).gt(minProbability.replace('%', ''));
    })
    .filter((odd) => {
      const prob = odd.prob
        .replace('%', '');

      return Decimal(prob).lt(maxProbability.replace('%', ''));
    });
}

const modifyH2h = (h2h) => {
  return h2h.map((fx) => {
    return {
      name: fx.name,
      starting_at: fx.starting_at,
      result_info: fx.result_info,
      leg: fx.leg,
      length: fx.length,
    }
  });
}

const modifyLeague = (fixture) => {
  fixture['league'] = leagueNameById(fixture.league_id);
  return fixture;
}

const modifyLineups = (fixture) => {
  if (!fixture.lineups || !fixture.lineups.length) {
    delete fixture.lineups;
    return fixture;
  }

  fixture.participants[0]['lineup'] = [];
  fixture.participants[1]['lineup'] = [];

  fixture.lineups.forEach((player) => {
    if (fixture.participants[0].id === player.team_id)
      fixture.participants[0]['lineup'].push(player);
    if (fixture.participants[1].id === player.team_id)
      fixture.participants[1]['lineup'].push(player);
  });

  fixture.participants[0]['lineup'] = fixture.participants[0]['lineup']
    .map((player) => {
      return {
        formation_field: player.formation_field,
        player_name: player.player_name,
        position: positionNameById(player.position_id),
      };
    });

  fixture.participants[1]['lineup'] = fixture.participants[1]['lineup']
    .map((player) => {
      return {
        formation_field: player.formation_field,
        player_name: player.player_name,
        position: positionNameById(player.position_id),
      };
    });

  delete fixture.lineups;

  return fixture;
}

const appendSeasonsStatistics = async (team) => {
  const statistics = modifyStatistics(await sportmonksApiClient
    .getSeasonStatisticsByParticipant(ParticipantEnum.Teams, team.id));
  team['activeseasons'].forEach((as) => {
    const stats = statistics
      .filter((stat) => stat.season_id === as.id);

    as['statistics'] = (stats && stats.length) ? stats[0].details : [];
  });

  return team;
}

const appendPlayersStatistics = async (team) => {
  const activeSeasonsIds = team['activeseasons'].map((as) => as.id);

  for (let i = 0; i < team['players'].length; i++) {
    team['players'][i]['statistics'] = await sportmonksApiClient
      .getSeasonStatisticsByParticipant(ParticipantEnum.Players, team['players'][i]['player_id']);
    team['players'][i]['statistics'] = team['players'][i]['statistics']
      .filter((stat) => activeSeasonsIds.includes(stat.season_id));
    team['players'][i]['statistics'] = modifyStatistics(team['players'][i]['statistics']);

    team['players'][i]['statistics'].forEach((stat) => {
      stat['details'] = modifyPlayerStatistics(stat['details']);
    });
  }

  team['players'] = team['players'].filter((pl) => {
    return pl.hasOwnProperty('statistics')
      && pl['statistics'].length > 0;
  });

  return team;
}

const appendPlayersData = async (team) => {
  for (let i = 0; i < team['players'].length; i++) {
    const playerData = await sportmonksApiClient
      .getPlayerById(team['players'][i]['player_id']);

    team['players'][i] = {...team['players'][i], ...{name: playerData.name}};
  }

  return team;
}

const appendSeasonsStandings = async (team) => {
  for (let i = 0; i < team['activeseasons'].length; i++) {
    const standings = await sportmonksApiClient
      .getStandingsBySeasonId(team['activeseasons'][i]['id']);

    if (standings) {
      team['activeseasons'][i]['standings'] = modifyStandings(standings, team);
    }
  }

  return team;
}

const appendSeasonsSchedules = async (team) => {
  for (let i = 0; i < team['activeseasons'].length; i++) {
    team['activeseasons'][i]['schedules'] = await sportmonksApiClient
      .getSchedulesBySeasonIdAndTeamId(team['activeseasons'][i]['id'], team.id);

    team['activeseasons'][i]['schedules'] = modifySchedules(team['activeseasons'][i]['schedules']);
  }

  return team;
}

const collectTeamData = async (teamId) => {
  let team = modifyTeam(await sportmonksApiClient.getTeamById(teamId));

  team['activeseasons'] = modifyActiveSeasons(team['activeseasons']);
  team['players'] = modifyPlayers(team['players']);
  team['coaches'] = await modifyCoaches(team['coaches']);
  team = await appendSeasonsStatistics(team);
  team = await appendPlayersStatistics(team);
  team = await appendPlayersData(team);
  team = await appendSeasonsStandings(team);
  team = await appendSeasonsSchedules(team);
  team = removeZeroValues(team);
  team = removeEmptyObjects(team);

  return team;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    if (
      !req.body
      || !('date' in req.body)
      || !('bookmakerId' in req.body)
      || !('suggestionsCount' in req.body)
    ) {
      return res.status(422).json({
        message: 'There are required fields',
        fields: {
          date: 'YYYY-MM-DD',
          bookmakerId: 'X',
          suggestionsCount: 'X',
        },
        optional: {
          mainModel: 'gpt-4-turbo',
          allFixtures: false,
        },
      });
    }

    const date = req.body.date;
    const bookmakerId = +req.body.bookmakerId;
    const suggestionsCount = +req.body.suggestionsCount;
    const mainModel = req.body.mainModel || null;
    const allFixtures = req.body.allFixtures ?? false;
    // const timeBetweenCompletions = 2 * 60 * 1000;
    const timeBetweenCompletions = 15 * 1000;

    if (mainModel && !Object.values(models).includes(mainModel)) {
      return res.status(422).json({
        availableModels: Object.values(models),
      });
    }

    try {
      let selectedFixtures;
      const totalFixtures = await sportmonksApiClient.getFixturesByDate(req.body.date);
      console.log(`fetched total ${totalFixtures.length} fixtures for ${date}.`);

      if (allFixtures) {
        selectedFixtures = totalFixtures;
        console.log(`starting all ${totalFixtures.length} fixtures...`);
      } else {
        let selectedFixturesIds = totalFixtures.map((tf: TFixture) => tf.id);
        if (totalFixtures.length > suggestionsCount) {
          console.log('starting fixtures selection completion...');
          const selectedFixturesCompletion = await createSelectFixturesCompletion(suggestionsCount, totalFixtures);
          selectedFixturesIds = (selectedFixturesCompletion.data as string)
            .split(',').map((id) => parseInt(id, 10));
        }

        selectedFixtures = totalFixtures
          .filter((fx) => selectedFixturesIds.includes(fx.id));
        console.log(`finished ${selectedFixtures.length} fixtures selection completion.`);
      }

      const suggestions = [];
      console.log(`starting to loop selected fixtures...`);
      for (let i = 0; i < selectedFixtures.length; i++) {
        let fixture = totalFixtures
          .find((fx) => fx.id === +selectedFixtures[i].id) as TFixture;
        fixture = modifyLineups(fixture);
        fixture = modifyLeague(fixture);
        fixture['league'] = leagueNameById(fixture['league_id']);
        console.log(`fixture ${i}:${fixture.name} found.`);

        const teamAId = fixture['participants'][0]['id'];
        const teamBId = fixture['participants'][1]['id'];
        const fixtureId = fixture['id'];

        const teamA = await collectTeamData(teamAId);
        console.log(`teamA data collected.`);
        const teamB = await collectTeamData(teamBId);
        console.log(`teamB data collected.`);

        const h2h = modifyH2h(await sportmonksApiClient
          .getFixturesByHeadToHead(teamAId, teamBId));
        console.log(`head to head data fetched.`);
        const initialOdds = await sportmonksApiClient
          .getOddsByFixtureIdAndBookmakerId(fixtureId, bookmakerId);
        if (!initialOdds) {
          console.log(`fixture ${i}:${fixture.name} has no odds, continue.`);
          continue;
        }
        const odds = modifyOdds(initialOdds, '20%', '80%');
        console.log(`fixture odds data fetched.`);

        console.log(`starting fixture bet suggestion completion...`);
        const completion = await createBetSuggestionCompletion({
          fixture: fixture,
          teamA: teamA,
          teamB: teamB,
          h2h: h2h,
          odds: odds,
        }, mainModel);
        console.log(`finished fixture bet suggestion completion.`);
        if (i < selectedFixtures.length - 1) await pause(timeBetweenCompletions);

        const suggestion = {
          fixture: fixture.name,
          completion: completion,
          data: {
            fixture: fixture,
            teamA: teamA,
            teamB: teamB,
            h2h: h2h,
            odds: odds,
          },
        };
        suggestions.push(suggestion);

        await googleCloudStorageClient.upsertJsonFile(suggestions, `suggestions/${date}.json`);
        console.log(`finished upsert suggestion ${i}.`);
      }

      console.log(`finished to loop selected fixtures for ${date}.`);

      return res.status(200).json({
        data: {
          suggestions: suggestions,
        },
      });
    } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({
        message: error.message,
      });
    }
  } else {
    return res.status(405).json({message: 'Method Not Allowed'});
  }
}

// ### **Custom GPT Instructions for Soccer Betting Predictions (Professional Bettor Perspective)**
//
// ---
//
// **Purpose:**
// This GPT is designed to provide **daily analysis of up to 10, but ideally fewer, ultra-low-risk soccer betting suggestions**. The GPT will act like a professional bettor with over **30 years of successful experience**, applying **critical thinking, intuition, and strategic insights** beyond raw data from the internet or odds platforms. The goal is to deliver **smartly defined, safe, and confident suggestions**, prioritizing **quality over quantity**. It’s better to suggest only 5 top picks with high confidence than to meet a quota of 10.
//
// ---
//
// ### **Instruction Set:**
//
// 1. **Event Selection:**
// - **Strategic Focus on Soccer Events:**
// - Include events scheduled to take place **on the exact requested day**, ensuring relevance.
// - Focus on **high-profile games** or those with clear, actionable insights supported by experience and logic (e.g., major leagues, tournaments).
//
// - **Critical Thinking Beyond Pure Data:**
// - Combine analytical tools (e.g., historical trends, player form) with strategic judgment to identify truly safe opportunities.
// - Exclude events with too many uncertainties, even if odds appear favorable.
//
// - Avoid games with limited data or conflicting insights. Trust professional judgment over unclear odds.
//
// ---
//
//   2. **Low-Risk Betting Selection:**
// - **Focus on Ultra-Low-Risk Bets with Expert Refinement:**
// - Use decades of betting experience to identify bets with minimal volatility. Examples include:
//   - **Double Chance:** (e.g., 1X or X2).
// - **Favorites to Win:** Clear dominance from one side.
// - **Under/Over Goals:** Matches with consistent scoring patterns.
//
// - **Smart Selection Criteria:**
// - Evaluate team mentality and external factors (e.g., fatigue, weather, recent travel schedules).
// - Consider psychological advantages, such as rivalry dynamics or home advantage in high-pressure games.
//
// ---
//
//   3. **Data Collection and Expert Analysis:**
// For each suggested match:
//   - **Team/Player Conditions:** Assess fitness, injuries, suspensions, and match importance.
// - **Performance Metrics:** Analyze home/away records, recent results, and tactical trends.
// - **Head-to-Head Data:** Evaluate historical matchups for patterns.
//                                                           - **Odds vs. Reality:** Compare market odds with expert intuition to uncover mismatches.
// - **External Factors:** Identify hidden factors like coach changes, crowd dynamics, or weather conditions.
//
// ---
//
//   4. **Validation and Accuracy:**
// - Cross-check matches using at least **two reliable sources** for scheduling and insights.
// - Provide links to:
//   - **Odds Providers** (e.g., OddsChecker).
// - **News Articles** or relevant analysis validating the prediction.
// - Avoid over-reliance on odds; apply critical thinking for deeper insights.
//
// ---
//
//   5. **Odds Browsing and Safe Bets:**
// - Use odds as one component, but rely on expert judgment to refine selections.
// - Suggest only bets with a probability of **85%-90% success or higher.**
//
// ---
//
//   6. **Tone and Style:**
// - Write like a seasoned professional bettor: confident, analytical, and decisive.
// - Avoid overly technical jargon but maintain professionalism.
// - Use **easy-to-read formatting** with bullet points and clear sections.
//
// ---
//
//   7. **Final instructions:**
// - Write like a seasoned professional bettor: confident, analytical, and decisive.
// - Avoid overly technical jargon but maintain professionalism.
// - Use **easy-to-read formatting** with bullet points and clear sections.
// - ${probInstruction}
//
// 8. **Output Format:**
// - fixture name: "<Team A vs Team B>",
//   - bet: "<Detailed Bet Selection>",
//   - probability: "<Calculated Probability (%)>",
//   - odd: "<Selected Odd>",
//   - market_description: "<Brief Explanation of the Market>",
//   - comprehensive_detailed_reason: "<Comprehensive Detailed Reason>",

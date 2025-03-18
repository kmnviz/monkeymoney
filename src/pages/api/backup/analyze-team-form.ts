// @ts-nocheck
import type {NextApiRequest, NextApiResponse} from 'next';
import OpenAI from 'openai';
import SportmonksApiClient from '../../../services/sportmonksApiClient';
import {ParticipantEnum} from '../../../enums/sportmonks';
import {leagueNameById, positionNameById} from '../../../utils';
import sportmonksTypes from '../../../database/sportmonks/types.json';
import {TOdd} from '../../../types/sportmonks/Odd';
import sportmonksMarkets from '../../../database/sportmonks/markets.json';
import Decimal from 'decimal.js';

const sportmonksApiClient = new SportmonksApiClient();
const openai = new OpenAI({
  baseURL:'https://api.deepseek.com/beta',
  // baseURL: process.env.DEEPSEEK_API_URL,
  // apiKey: process.env.OPENAI_API_KEY as string,
  apiKey: process.env.DEEPSEEK_API_KEY as string,
});

const createTeamFormAnalysis = async (content) => {
  const lContent = { ...content };
  lContent['odds'] = lContent['odds'].map(({ probability, ...rest }) => rest);

  // const messages = [
  //   {
  //     role: 'system',
  //     content: `You are a world-class football data analyst. Your task is to analyze the form of a football teams based on the provided JSON data. This analysis will later be compared with another team to determine which team has a higher probability of winning, making corners, or other key performance metrics.`,
  //   },
  //   {
  //     role: 'user',
  //     content:
  //     `
  //     You are a world-class professional football analyst with deep expertise in tactics, betting markets, and psychological dynamics.
  //     Your task is to conduct an elite-level analysis of both teams’ current form, strategies, and all external factors influencing the upcoming match.
  //     Your goal is to find the most probable and most profitable betting opportunity in terms of risk/reward ratio.
  //
  //     Step 1: Comprehensive Team & Player Analysis
  //     Perform an in-depth breakdown of both teams' current form, momentum, and season trends.
  //     Identify key players' statistics, strengths, weaknesses, injuries, and suspensions.
  //     Assess the psychological state of teams and players, including fatigue, confidence, and pressure levels.
  //
  //     Step 2: Tactical & Strategic Insights
  //     Analyze each team’s tactical approach, including formations, pressing intensity, and set-piece effectiveness.
  //     Assess the coaches' impact, their adaptability, and historical head-to-head performances.
  //     Dig deep into venue influence: home vs. away performance, weather conditions, and pitch type impact.
  //
  //     Step 3: Contextual & Motivational Factors
  //     Evaluate the motivation levels of both teams in each competition they participate in.
  //     Consider the importance of the match in the context of the league standings or knockout stages.
  //     Analyze previous and upcoming matches to gauge potential squad rotations or fatigue risks.
  //
  //     Step 4: Betting & Probability Optimization
  //     Identify the most probable match outcome using a logical, data-driven approach.
  //     Find the most valuable betting market by balancing probability and odds efficiency.
  //     Think critically and identify a high-value bet that may not be obvious but offers superior returns.
  //     Ensure the final recommendation is based on probability models, betting market inefficiencies, and tactical analysis.
  //
  //     **Output Format (Strictly Follow This JSON Structure):**
  //     {
  //       "bet": "<Bet Selection>",
  //       "probability": "<Calculated Probability (%)>",
  //       "odd": "<Selected Odd>",
  //       "market_description": "<Brief Explanation of the Market>",
  //       "reasoning": "<Justification based on the provided statistics>"
  //     }
  //
  //     Final Instruction:
  //     Think outside of the box and leverage your deepest football knowledge.
  //     Do not provide generic answers—focus on unique insights, tactical angles, and betting inefficiencies that others might overlook.
  //     Your goal is to find the smartest and most profitable bet, not just the most obvious one.
  //     Try your best to find THE MOST UNOBVIOUS MARKET OVER 2.00 with the HIGHEST PROBABILITY OVER 75%
  //     `
  //     ,
  //   },
  //   {
  //     role: 'assistant',
  //     content: JSON.stringify(lContent),
  //   },
  //   {
  //     role: 'user',
  //     content: 'Analyze the data above and return a JSON response starting with: { "analysis": "',
  //   },
  //   {
  //     role: 'assistant',
  //     content: '{ "analysis": "',
  //   },
  // ];

  const messages = [
    {
      role: 'system',
      content: `You are a world-class football data analyst. Analyze the JSON data and provide insights. Return a JSON response.`,
    },
    {
      role: 'user',
      content:
        `
        You are a world-class professional football analyst with deep expertise in tactics, betting markets, and psychological dynamics.
        Your task is to conduct an elite-level analysis of both teams’ current form, strategies, and all external factors influencing the upcoming match.
        Your goal is to find the most probable and most profitable betting opportunity in terms of risk/reward ratio.

        Step 1: Comprehensive Team & Player Analysis
        Perform an in-depth breakdown of both teams' current form, momentum, and season trends.
        Identify key players' statistics, strengths, weaknesses, injuries, and suspensions.
        Assess the psychological state of teams and players, including fatigue, confidence, and pressure levels.

        Step 2: Tactical & Strategic Insights
        Analyze each team’s tactical approach, including formations, pressing intensity, and set-piece effectiveness.
        Assess the coaches' impact, their adaptability, and historical head-to-head performances.
        Dig deep into venue influence: home vs. away performance, weather conditions, and pitch type impact.

        Step 3: Contextual & Motivational Factors
        Evaluate the motivation levels of both teams in each competition they participate in.
        Consider the importance of the match in the context of the league standings or knockout stages.
        Analyze previous and upcoming matches to gauge potential squad rotations or fatigue risks.

        Step 4: Betting & Probability Optimization
        Identify the most probable match outcome using a logical, data-driven approach.
        Find the most valuable betting market by balancing probability and odds efficiency.
        Think critically and identify a high-value bet that may not be obvious but offers superior returns.
        Ensure the final recommendation is based on probability models, betting market inefficiencies, and tactical analysis.
      `,
    },
    {
      role: 'assistant',
      content: JSON.stringify(lContent),
    },
    {
      role: 'user',
      content:
      `
        Final Instruction:
        Think outside of the box and leverage your deepest football knowledge.
        Do not provide generic answers—focus on unique insights, tactical angles, and betting inefficiencies that others might overlook.
        Your goal is to find the smartest and most profitable bet, not just the most obvious one.
        Try your best to find THE MOST UNOBVIOUS MARKET OVER 2.00 with the HIGHEST PROBABILITY OVER 75%

        **Output Format (Strictly Follow This JSON Structure):**
        {
          "bet": "<Bet Selection>",
          "probability": "<Calculated Probability (%)>",
          "odd": "<Selected Odd>",
          "market_description": "<Brief Explanation of the Market>",
          "reasoning": "<Justification based on the provided statistics>"
        }
      `,
    },
  ];

  const completion = await openai.chat.completions.create({
    model: 'deepseek-reasoner',
    messages: messages,
    // response_format: { type: 'json_object' },
    temperature: 0,
    // prefix_mode: true,
  } as any);

  try {
    console.log((JSON.parse(completion.choices[0].message.content as string)));
  } catch (error) {
    console.log('error: ', error);
  }

  return completion.choices[0].message;
}

export const modifyTeam = (team) => {
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

const modifyPlayers = (players) => {
  return players.map((pl) => {
    return {
      id: pl.id,
      player_id: pl.player_id,
      start: pl.start,
      end: pl.end,
      name: pl.name,
      position: positionNameById(pl.position_id),
    };
  });
}

const modifyCoaches = async (coaches) => {
  const result = [];
  for (let i = 0; i < coaches.length; i++) {
    const coach = await sportmonksApiClient.getCoachById(coaches[i]['coach_id']);
    result.push({
      start: coaches[i].start,
      end: coaches[i].end,
      name: coach.name,
      date_of_birth: coach.date_of_birth,
      position: positionNameById(coaches[i].position_id),
    });
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
            type: type ? type.name : null,
            value: detail.value,
          }
        }),
      }
    })
    .flat();
}

const modifyStandings = (standings, team) => {
  return standings.map((st) => {
    return {
      participant_id: st.participant_id,
      points: st.points,
      is_current_team: st.participant_id === team.id,
    };
  });
}

const modifySchedules = (schedules, team) => {
  return schedules.map((sc) => {
    return {
      name: sc.name,
      finished: sc.finished,
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
          name: rd.name,
          starting_at: rd.starting_at,
          result_info: rd.result_info,
          length: rd.length,
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
}

const modifyOdds = (odds: TOdd[], probability = '0%') => {
  const markets = sportmonksMarkets;
  const marketsIds = markets.map((m) => m.id);

  return odds
    .filter((odd) => marketsIds.includes(odd.market_id))
    .map((odd) => {
      const newOdd = {
        label: odd.label,
        // value: odd.value,
        market_description: odd.market_description,
        probability: odd.probability,
        odd: odd.dp3,
      };

      if (odd.handicap) newOdd['handicap'] = odd.handicap;
      if (odd.total) newOdd['total'] = odd.total;

      return newOdd;
    })
    .filter((odd) => {
      const prob = odd.probability
        .replace('%', '');

      return Decimal(prob).gt(probability.replace('%', ''));
    });
}

const appendSeasonsStatistics = async (team) => {
  const statistics = modifyStatistics(await sportmonksApiClient
    .getSeasonStatisticsByParticipant(ParticipantEnum.Teams, team.id));
  team['activeseasons'].forEach((as) => {
    as['statistics'] = statistics
      .filter((stat) => stat.season_id === as.id)[0].details;
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

    team['players'][i] = { ...team['players'][i], ...{ name: playerData.name } };
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

    team['activeseasons'][i]['schedules'] = modifySchedules(team['activeseasons'][i]['schedules'], team);
  }

  return team;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    if (
      !req.body
      || !('teamId' in req.body)
    ) {
      return res.status(422).json({
        message: 'There are required fields',
        fields: {
          teamId: 'X',
          seasonId: 'X',
        },
      });
    }

    try {
      // const teamId = +req.body.teamId;
      // let team = modifyTeam (await sportmonksApiClient.getTeamById(teamId));
      // team['activeseasons'] = modifyActiveSeasons(team['activeseasons']);
      // team['players'] = modifyPlayers(team['players']);
      // team['coaches'] = await modifyCoaches(team['coaches']);
      // team = await appendSeasonsStatistics(team);
      // team = await appendPlayersStatistics(team);
      // team = await appendPlayersData(team);
      // team = await appendSeasonsStandings(team);
      // team = await appendSeasonsSchedules(team);
      //
      // const completion = await createTeamFormAnalysis(team);

      const teamAId = +req.body.teamAId;
      const teamBId = +req.body.teamBId;
      const fixtureId = +req.body.fixtureId;

      let teamA = modifyTeam (await sportmonksApiClient.getTeamById(teamAId));
      teamA['activeseasons'] = modifyActiveSeasons(teamA['activeseasons']);
      teamA['players'] = modifyPlayers(teamA['players']);
      teamA['coaches'] = await modifyCoaches(teamA['coaches']);
      teamA = await appendSeasonsStatistics(teamA);
      teamA = await appendPlayersStatistics(teamA);
      teamA = await appendPlayersData(teamA);
      teamA = await appendSeasonsStandings(teamA);
      teamA = await appendSeasonsSchedules(teamA);

      let teamB = modifyTeam (await sportmonksApiClient.getTeamById(teamBId));
      teamB['activeseasons'] = modifyActiveSeasons(teamB['activeseasons']);
      teamB['players'] = modifyPlayers(teamB['players']);
      teamB['coaches'] = await modifyCoaches(teamB['coaches']);
      teamB = await appendSeasonsStatistics(teamB);
      teamB = await appendPlayersStatistics(teamB);
      teamB = await appendPlayersData(teamB);
      teamB = await appendSeasonsStandings(teamB);
      teamB = await appendSeasonsSchedules(teamB);

      const fixture = await sportmonksApiClient
        .getFixtureById(fixtureId);
      const h2h = await sportmonksApiClient
        .getFixturesByHeadToHead(teamAId, teamBId);
      const odds = modifyOdds(await sportmonksApiClient
        .getOddsByFixtureIdAndBookmakerId(fixtureId, 2));

      const content = {
        fixture: fixture,
        teamA: teamA,
        teamB: teamB,
        h2h: h2h,
        odds: odds,
      };

      const completion = await createTeamFormAnalysis(content);

      return res.status(200).json({
        data: {
          completion: completion,
          fixture: fixture,
          teamA: teamA,
          teamB: teamB,
          h2h: h2h,
          odds: odds,
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

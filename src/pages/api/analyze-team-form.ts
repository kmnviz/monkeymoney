// @ts-nocheck
import type {NextApiRequest, NextApiResponse} from 'next';
import OpenAI from 'openai';
import SportmonksApiClient from '../../services/sportmonksApiClient';
import {ParticipantEnum} from '../../enums/sportmonks';
import {leagueNameById, positionNameById} from '../../utils';
import sportmonksTypes from '../../database/sportmonks/types.json';

const sportmonksApiClient = new SportmonksApiClient();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string,
});

const createTeamFormAnalysis = async (content) => {
  const messages = [
    {
      role: 'system',
      content: `You are a world-class football data analyst. Your task is to analyze the form of a football team based on the provided JSON data. This analysis will later be compared with another team to determine which team has a higher probability of winning, making corners, or other key performance metrics.`,
    },
    {
      role: 'user',
      content: `
        ### **Analysis Requirements:**
        **Overall Team Performance:**
          - Summarize the team's performance over the active seasons, considering win/loss ratios, goals scored/conceded, and key statistics.
          - Identify trends in performance (e.g., improving, declining, or inconsistent form).
          - Compare the team’s current season form with previous seasons.

        ### **Output Format:**
        Provide a structured analysis in a clear and concise manner. Use bullet points, tables, and numerical insights when applicable. The analysis should be objective and backed by statistical reasoning. If possible, suggest key indicators that can be directly compared with another team later.
     `,
    },
    {
      role: "assistant",
      content: JSON.stringify(content),
    },
  ];

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: messages,
    // response_format: { type: 'json_object' },
    temperature: 0,
  } as any);

  // return (JSON.parse(completion.choices[0].message.content as string)) ?? [];
  return completion.choices[0].message.content as string;
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
      const teamId = +req.body.teamId;
      let team = modifyTeam (await sportmonksApiClient.getTeamById(teamId));
      team['activeseasons'] = modifyActiveSeasons(team['activeseasons']);
      team['players'] = modifyPlayers(team['players']);
      team['coaches'] = await modifyCoaches(team['coaches']);
      team = await appendSeasonsStatistics(team);
      team = await appendPlayersStatistics(team);
      team = await appendPlayersData(team);
      team = await appendSeasonsStandings(team);
      team = await appendSeasonsSchedules(team);

      const completion = await createTeamFormAnalysis(team);

      return res.status(200).json({
        data: {
          completion: completion,
          team: team,
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

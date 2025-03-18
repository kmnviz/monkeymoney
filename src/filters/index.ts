import {leagueNameById, positionNameById} from '../utils';
import sportmonksTypes from '../database/sportmonks/types.json';
import {TOdd} from '../types/sportmonks/Odd';
import sportmonksMarkets from '../database/sportmonks/markets.json';
import Decimal from 'decimal.js';
import {removeEmptyArrays, removeNullValues} from '../helpers';

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

export const modifyActiveSeasons = (activeSeasons) => {
  return activeSeasons.map((as) => {
    return {
      id: as.id,
      name: as.name,
      league: leagueNameById(as.league_id),
    };
  });
}

export const modifyPlayerStatistics = (data) => {
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

export const modifyPlayers = (players) => {
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

export const modifyCoaches = async (coaches) => {
  const result = [];
  for (let i = 0; i < coaches.length; i++) {
    if (coaches[i].data) {
      result.push({
        start: coaches[i]?.start,
        end: coaches[i]?.end,
        name: coaches[i].data?.name,
        date_of_birth: coaches[i].data?.date_of_birth,
        position: positionNameById(coaches[i]?.position_id),
      });
    }
  }

  return result;
}

export const modifyStatistics = (statistics) => {
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

export const modifyStandings = (standings, team) => {
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

export const modifyScores = (obj) => {
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

export const modifySchedules = (schedules) => {
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

export const modifyOdds = (odds: TOdd[], minProbability = '0%', maxProbability = '100%') => {
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

export const modifyH2h = (h2h) => {
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

export const modifyLeague = (fixture) => {
  fixture['league'] = leagueNameById(fixture.league_id);
  return fixture;
}

export const modifyLineups = (fixture) => {
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

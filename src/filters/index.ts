import Decimal from 'decimal.js';
import { TDailySchedule } from '../types/sportradar/DailySchedule';
import { TSportEventMarket } from '../types/sportradar/SportEventMarket';
import { TCompetitorSummary } from '../types/sportradar/CompetitorSummary';
import { TTeam } from '../types/sportmonks/Team';
import { TOdd } from '../types/sportmonks/Odd';
import { TSquad } from '../types/sportmonks/Squad';
import sportmonksTypes from '../database/sportmonks/types.json';
import sportmonksMarkets from '../database/sportmonks/markets.json';

export const filterDailySchedules = (dailySchedules: TDailySchedule[]) => {
  const countries = [
    'England',
    'Spain',
    'Italy',
    'Germany',
    'France',
  ];

  return dailySchedules.filter((ds: TDailySchedule) => {
    return countries.includes(ds.sport_event.sport_event_context.category.name);
  }).map((ds: TDailySchedule) => {
    return {
      id: ds.sport_event.id,
      start_time: ds.sport_event.start_time,
      sport: {
        id: ds.sport_event.sport_event_context.sport.id,
        name: ds.sport_event.sport_event_context.sport.name,
      },
      country: {
        id: ds.sport_event.sport_event_context.category.id,
        name: ds.sport_event.sport_event_context.category.name,
        country_code: ds.sport_event.sport_event_context.category.country_code,
      },
      competition: {
        id: ds.sport_event.sport_event_context.competition.id,
        name: ds.sport_event.sport_event_context.competition.name,
        gender: ds.sport_event.sport_event_context.competition.gender,
      },
      competitors: [
        {
          id: ds.sport_event.competitors[0].id,
          name: ds.sport_event.competitors[0].name,
          abbr: ds.sport_event.competitors[0].abbreviation,
          qualifier: ds.sport_event.competitors[0].qualifier,
        },
        {
          id: ds.sport_event.competitors[1].id,
          name: ds.sport_event.competitors[1].name,
          abbr: ds.sport_event.competitors[1].abbreviation,
          qualifier: ds.sport_event.competitors[1].qualifier,
        },
      ],
      fixture: `${ds.sport_event.competitors[0].name} vs ${ds.sport_event.competitors[1].name}`,
    };
  });
}

export const filterSportEventMarkets = (sportEventMarkets: TSportEventMarket[]) => {
  return sportEventMarkets.map((sev: TSportEventMarket) => {
    return {
      id: sev.id,
      market: sev.name,
      books: sev.books.map((b) => {
        return {
          id: b.id,
          name: b.name,
          outcomes: b.outcomes.map((o) => {
            return {
              id: o.id,
              type: o.type,
              odds_decimal: o.odds_decimal,
            };
          })
        };
      })
    };
  });
}

export const filterCompetitorSummaries = (competitorSummaries: TCompetitorSummary[]) => {
  return competitorSummaries
    .filter((cs) => {
      return cs.sport_event_status?.match_status === 'ended' && cs.statistics;
    })
    .map((cs: TCompetitorSummary) => {
      return {
        id: cs.sport_event.id,
        start_time: cs.sport_event.start_time,
        sport_event_status: {
          home_score: cs.sport_event_status.home_score,
          away_score: cs.sport_event_status.away_score,
          period_scores: cs.sport_event_status.period_scores,
          // qualifier: cs.sport_event_status?.match_situation?.qualifier,
        },
        statistics: cs.statistics.totals.competitors.map((c) => {
          return {
            name: c.name,
            abbr: c.abbreviation,
            qualifier: c?.qualifier,
            statistics: c.statistics,
            players: c.players.map((p) => {
              return {
                name: p.name,
                starter: p.starter,
                statistics: Object.fromEntries(
                  Object.entries(p.statistics).filter(([_, value]) => value !== 0)
                ),
              };
            }).filter((p) => Object.keys(p.statistics).length > 0)
          };
        }),
      };
    });
}

// --- SportMonks filter --- //

export const filterTeams = (teams: TTeam[]) => {
  return teams.map((team) => {
    return {
      id: team.id,
      name: team.name,
      type: team.type,
      last_played_at: team.last_played_at,
      meta: {
        location: team.meta.location,
        position: team.meta.position,
      },
    };
  });
}

export const filterOdds = (odds: TOdd[], probability = '0%') => {
  const markets = sportmonksMarkets;
  const marketsIds = markets.map((m) => m.id);

  return odds
    .filter((odd) => marketsIds.includes(odd.market_id))
    .map((odd) => {
      const newOdd = {
        label: odd.label,
        value: odd.value,
        market_description: odd.market_description,
        probability: odd.probability,
        dp3: odd.dp3,
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

export const filterStatistics = (statistics: any[], seasonId: number) => {
  // const types = sportmonksTypes;
  //
  // return statistics
  //   .filter((stat) => stat.has_values && stat.season_id === seasonId)
  //   .map((stat) => {
  //     return {
  //       season_id: stat.season_id,
  //       details: stat.details.map((detail) => {
  //         const type = types.find((t) => t.id === detail.type_id);
  //
  //         return {
  //           type: type ? type.name : null,
  //           value: detail.value,
  //         };
  //       }),
  //     }
  //   });

  const types = sportmonksTypes;

  return statistics
    .filter((stat) =>
      stat.has_values
      && stat.hasOwnProperty('details')
      && stat.details.length > 0
      && stat.season_id === seasonId
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
    .map((stat) => {
      return stat.details.map((detail) => {
        return {[detail.type]: detail.value};
      })
    })
    .flat();
}

// export const filterSquad = (squad: TSquad[]) => {
//   const types = sportmonksTypes;
//
//   return squad
//     .map((sq: TSquad) => {
//       return {
//         squad_id: sq.id,
//         player_id: sq.player.id,
//         name: sq.player.name,
//         height: sq.player.height,
//         weight: sq.player.weight,
//         date_of_birth: sq.player.date_of_birth,
//         position: types.find((type) => type.id === sq.position_id).name,
//       };
//     });
// }

export const filterPlayerStatistics = (statistics: any[], seasonId: number) => {
  const types = sportmonksTypes;

  return statistics
    .filter((stat) =>
      stat.has_values
      && stat.hasOwnProperty('details')
      && stat.details.length > 0
      && stat.season_id === seasonId
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
    .map((stat) => {
      return stat.details.map((detail) => {
        return {[detail.type]: detail.value};
      })
    })
    .flat();
}

export const filterSchedules = () => {

}

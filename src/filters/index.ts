import TDailySchedule from '../types/DailySchedule';
import TSportEventMarket from '../types/SportEventMarket';
import TCompetitorSummary from '../types/CompetitorSummary';

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

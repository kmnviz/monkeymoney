import TDailySchedule from '../types/DailySchedule';

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
          abbr: ds.sport_event.competitors[0].abbr,
          qualifier: ds.sport_event.competitors[0].qualifier,
        },
        {
          id: ds.sport_event.competitors[1].id,
          name: ds.sport_event.competitors[1].name,
          abbr: ds.sport_event.competitors[1].abbr,
          qualifier: ds.sport_event.competitors[1].qualifier,
        },
      ],
    };
  });
}

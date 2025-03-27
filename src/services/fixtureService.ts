// @ts-nocheck
import {DateTime} from 'luxon';
import SportmonksApiClient from '../services/sportmonksApiClient';
import {
  leagueNameById,
  seasonNameById,
  roundNameById,
  venueNameById,
  typeNameById,
  positionNameById,
  teamNameById,
  removeEmptyObjects,
  removeZeroValues,
  removeEmptyArrays,
  removeNullValues,
} from '../utils';
import {TFixture} from '../types/sportmonks/Fixture';
import {TTeam} from '../types/sportmonks/Team';
import {ParticipantEnum} from '../enums/sportmonks';
import {countContentTokens} from '../helpers';

const sportmonksApiClient = new SportmonksApiClient();

const formatParticipants = (participants: TTeam[]) => {
  return participants.map((p: TTeam) => {
    return {
      id: p.id,
      name: p.name,
      location: p.meta.location,
    };
  });
};

const formatMatchScores = (matchScores) => {
  const result = {};
  const descriptions = matchScores.map((s) => s.description);
  descriptions.forEach((d) => {
    const home = matchScores.find((s) => s.description === d && s.score.participant === 'home');
    const away = matchScores.find((s) => s.description === d && s.score.participant === 'away');
    result[d] = `${home.score.goals}:${away.score.goals}`;
  });

  return result;
}

const formatStatistics = (matchStatistics) => {
  const result = {home: {}, away: {}};
  matchStatistics.forEach((s) => {
    const type = typeNameById(s.type_id);
    if (s.location === 'home') result.home[type] = s.data.value;
    if (s.location === 'away') result.away[type] = s.data.value;
  });

  return result;
};

const formatEvents = (matchEvents) => {
  return matchEvents.map((e) => {
    const r = {
      type: typeNameById(e.type_id),
      player: `${e.player_name}${e.related_player_name ? ` ${e.related_player_name}` : ''}`,
      minute: e.minute,
      participant_id: e.participant_id,
    };
    if (e.addition) r['addition'] = e.addition;
    if (e.injured) r['injured'] = e.injured;

    return r;
  }).reduce((acc, { type, ...rest }) => {
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(rest);
    return acc;
  }, {});
};

const formatCoaches = (matchCoaches) => {
  return matchCoaches.map((c) => {
    return {
      name: c.name,
    };
  });
};

const formatLineups = (matchLineups) => {
  return matchLineups.map((l) => {
    return {
      name: l.player_name,
      position: positionNameById(l.position_id),
      participant_id: l.team_id,
    };
  });
};

const fetchPastFixtures = async (fixture, teamId) => {
  const dateFrom = DateTime
    .fromFormat(fixture.starting_at, 'yyyy-MM-dd HH:mm:ss')
    .minus({days: 90})
    .toFormat('yyyy-MM-dd');
  const dateTo = DateTime
    .fromFormat(fixture.starting_at, 'yyyy-MM-dd HH:mm:ss')
    .minus({days: 1})
    .toFormat('yyyy-MM-dd');

  let tmAFxs1 = await sportmonksApiClient
    .getFixturesByDateRangeForTeam(dateFrom, dateTo, teamId, 'scores;statistics;events');
  let tmAFxs2 = await sportmonksApiClient
    .getFixturesByDateRangeForTeam(dateFrom, dateTo, teamId, 'coaches;lineups;participants');

  return tmAFxs1.map((obj, index) => ({
    ...obj,
    ...tmAFxs2[index],
  }));
};

const fetchNextFixtures = async (fixture, teamId) => {
  const dateFrom = DateTime
    .fromFormat(fixture.starting_at, 'yyyy-MM-dd HH:mm:ss')
    .plus({days: 1})
    .toFormat('yyyy-MM-dd');
  const dateTo = DateTime
    .fromFormat(fixture.starting_at, 'yyyy-MM-dd HH:mm:ss')
    .plus({days: 30})
    .toFormat('yyyy-MM-dd');

  return await sportmonksApiClient
    .getFixturesByDateRangeForTeam(dateFrom, dateTo, teamId, 'participants');
};

const preparePastFixtures = (fixtures: TFixture[]) => {
  const pastFixtures = fixtures.map((fx: TFixture) => {
    return {
      fixture: fx.name,
      league: leagueNameById(fx.league_id),
      season: seasonNameById(fx.season_id),
      round: roundNameById(fx.round_id),
      venue: venueNameById(fx.venue_id),
      starting_at: fx.starting_at,
      match_result: formatMatchScores(fx.scores),
      participants: formatParticipants(fx.participants),
      statistics: formatStatistics(fx.statistics),
      events: formatEvents(fx.events),
      coaches: formatCoaches(fx.coaches),
      lineups: formatLineups(fx.lineups),
    };
  });

  pastFixtures.forEach((pfx) => {
    const home = pfx.participants.find((p) => p.location === 'home');
    const away = pfx.participants.find((p) => p.location === 'away');

    if (home && away) {
      home['statistics'] = pfx['statistics']['home'];
      away['statistics'] = pfx['statistics']['away'];
      home['events'] = Object.fromEntries(
        Object.entries(pfx['events']).map(([eventType, eventList]) => [
          eventType,
          eventList.filter(event => event.participant_id === home.id)
        ]).filter(([_, filteredList]) => filteredList.length > 0)
      );
      away['events'] = Object.fromEntries(
        Object.entries(pfx['events']).map(([eventType, eventList]) => [
          eventType,
          eventList.filter(event => event.participant_id === away.id)
        ]).filter(([_, filteredList]) => filteredList.length > 0)
      );
      home['lineups'] = pfx.lineups.filter((l) => l.participant_id === home.id)
        .map((l) => { return { name: l.name, position: l.position } });
      away['lineups'] = pfx.lineups.filter((l) => l.participant_id === away.id)
        .map((l) => { return { name: l.name, position: l.position } });

      home['coaches'] = pfx['coaches'][0];
      away['coaches'] = pfx['coaches'][1];

      delete pfx['statistics'];
      delete pfx['events'];
      delete pfx['lineups'];
      delete pfx['coaches'];
    }
  });

  return pastFixtures;
};

const prepareNextFixtures = (fixtures: TFixture[]) => {
  return fixtures.map((fx: TFixture) => {
    return {
      fixture: fx.name,
      league: leagueNameById(fx.league_id),
      season: seasonNameById(fx.season_id),
      round: roundNameById(fx.round_id),
      venue: venueNameById(fx.venue_id),
      starting_at: fx.starting_at,
      participants: fx.participants.map((p) => {
        return {
          name: p.name,
          location: p.meta.location,
        };
      }),
    };
  });
};

const formatFixture = (fx: TFixture) => {
  let formattedFx = {
    id: fx.id,
    // league: fx.league_id,
    // season: fx.season_id,
    // venue: fx.venue_id,
    league: leagueNameById(fx.league_id),
    season: seasonNameById(fx.season_id),
    venue: venueNameById(fx.venue_id),
    name: fx.name,
    starting_at: fx.starting_at,
    has_odds: fx.has_odds,
    participants: fx.participants.map((p: TTeam, index: number) => {
      return {
        id: p.id,
        name: p.name,
        location: p.meta.location,
        past_matches: p['past_matches'].reverse().splice(0, 12),
        next_matches: p['next_matches'].splice(0, 5),
        players: p['players'] && p['players'].length ? p['players'].map((p) => {
          return {
            name: p.name,
            date_of_birth: p.date_of_birth,
            height: p.height,
            position: positionNameById(p.position_id),
            statistics: p.statistics && p.statistics.length ? p.statistics
              .filter((s) => s.season_id === fx.season_id)
              .map((s) => {
                return s.details && s.details.length ? s.details.map((d) => {
                  return {
                    type: typeNameById(d.type_id),
                    value: d.value,
                  };
                }): [];
              }).map((s) => {
                return s.map((ss) => ({[ss.type]: ss?.value?.total}))
              }).flat() : [],
          };
        }) : [],
        active_seasons: p['active_seasons'] && p['active_seasons'].length
          ? p['active_seasons'].map((a) => {
            return {
              leagues: leagueNameById(a.league_id),
              name: seasonNameById(a.id),
              starting_at: a.starting_at,
              ending_at: a.ending_at,
              standings: a.standings && a.standings.length ? a.standings.map((s) => {
                return {
                  participant: teamNameById(s.participant_id),
                  points: s.points,
                  position: s.position,
                };
              }) : [],
            }
          }) : [],
      };
    }).reduce((acc, { name, ...rest }) => {
      acc[name] = rest;
      return acc;
    }, {}),
    // TODO: RESEARCH WHY LINEUPS ARE NOT RETURNED
    // lineups: fx.lineups,
    round: fx.round ? {
      name: fx.round.name,
      fixtures: fx.round.fixtures && fx.round.fixtures.length ? fx.round.fixtures.map((f) => {
        return {
          name: f.name,
          starting_at: f.starting_at,
        };
      }) : [],
    } : {},
    head_to_head_matches: fx['head_to_head_matches'] && fx['head_to_head_matches'].length ? fx['head_to_head_matches'].map((h) => {
      return {
        league: leagueNameById(h.league_id),
        season: seasonNameById(h.season_id),
        venue: venueNameById(h.venue_id),
        round: h.round_id ? roundNameById(h.round_id) : null,
        starting_at: h.starting_at,
        result_info: h.result_info,
      };
    }).splice(0, 10) : [],
  };

  formattedFx = removeEmptyObjects(formattedFx);
  formattedFx = removeZeroValues(formattedFx);
  formattedFx = removeEmptyArrays(formattedFx);
  formattedFx = removeNullValues(formattedFx);

  return formattedFx;
};

class FixtureService {

  async collectData(fixtureId: number) {
    const fx = await sportmonksApiClient.getFixtureById(fixtureId, 'participants');

    fx['participants'][0]['past_matches'] = preparePastFixtures(await fetchPastFixtures(fx, fx['participants'][0].id));
    fx['participants'][1]['past_matches'] = preparePastFixtures(await fetchPastFixtures(fx, fx['participants'][1].id));

    const teamA =  await sportmonksApiClient.getTeamById(fx['participants'][0].id);
    const teamB =  await sportmonksApiClient.getTeamById(fx['participants'][1].id);
    fx['participants'][0]['active_seasons'] = teamA['activeseasons'];
    fx['participants'][1]['active_seasons'] = teamB['activeseasons'];

    for (let i = 0; i < fx['participants'][0]['active_seasons'].length; i++) {
      fx['participants'][0]['active_seasons'][i]['standings']
        = await sportmonksApiClient.getStandingsBySeasonId(fx['participants'][0]['active_seasons'][i].id);
    }
    for (let i = 0; i < fx['participants'][1]['active_seasons'].length; i++) {
      fx['participants'][1]['active_seasons'][i]['standings']
        = await sportmonksApiClient.getStandingsBySeasonId(fx['participants'][1]['active_seasons'][i].id);
    }

    fx['participants'][0]['next_matches'] = prepareNextFixtures(await fetchNextFixtures(fx, fx['participants'][0].id));
    fx['participants'][1]['next_matches'] = prepareNextFixtures(await fetchNextFixtures(fx, fx['participants'][1].id));

    fx['participants'][0]['players'] = teamA['players'];
    for (let i = 0; i < fx['participants'][0]['players'].length; i++) {
      const playerId = fx['participants'][0]['players'][i]['player_id'];
      fx['participants'][0]['players'][i] = await sportmonksApiClient.getPlayerById(playerId);
      if (fx['participants'][0]['players'][i] && fx['participants'][0]['players'][i]['statistics']) {
        fx['participants'][0]['players'][i]['statistics']
          = await sportmonksApiClient.getSeasonStatisticsByParticipant(ParticipantEnum.Players, playerId);
      }
    }

    fx['participants'][1]['players'] = teamB['players'];
    for (let i = 0; i < fx['participants'][1]['players'].length; i++) {
      const playerId = fx['participants'][1]['players'][i]['player_id'];
      fx['participants'][1]['players'][i] = await sportmonksApiClient.getPlayerById(playerId);
      if (fx['participants'][1]['players'][i] && fx['participants'][1]['players'][i]['statistics']) {
        fx['participants'][1]['players'][i]['statistics']
          = await sportmonksApiClient.getSeasonStatisticsByParticipant(ParticipantEnum.Players, playerId);
      }
    }

    fx['head_to_head_matches'] = await sportmonksApiClient.getFixturesByHeadToHead(fx['participants'][0].id, fx['participants'][1].id);
    if (fx.round_id) fx['round'] = await sportmonksApiClient.getRoundById(fx.round_id);

    const formattedFx = formatFixture(fx)

    return {
      tokens: countContentTokens(formattedFx, 'gpt-4-turbo'),
      data: formattedFx,
    }
  }
}

export default FixtureService;

import { writeFileSync, readFileSync } from 'fs';
import path from 'path';
import sportmonksTypes from '../database/sportmonks/types.json';
import sportmonksMarkets from '../database/sportmonks/markets.json';
import sportmonksBookmakers from '../database/sportmonks/bookmakers.json';
import sportmonksLeagues from '../database/sportmonks/leagues.json';
import sportmonksSeasons from '../database/sportmonks/seasons.json';
import sportmonksRounds from '../database/sportmonks/rounds.json';
import sportmonksVenues from '../database/sportmonks/venues.json';
import sportmonksTeams from '../database/sportmonks/teams.json';
import Decimal from "decimal.js";

export const pause = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const writeIntoFile = async (data: object, filepath: string) => {
  try {
    const dataJson = JSON.stringify(data, null, 2);
    const filePath = path.resolve(process.cwd(), `src/database${filepath}`);
    writeFileSync(filePath, dataJson, 'utf-8');
    return true;
  } catch (error) {
    throw error;
  }
}

export const readFromFile = async (filepath: string) => {
  try {
    const filePath = path.resolve(process.cwd(), `src/prompts${filepath}`);
    return readFileSync(filePath, 'utf8');
  } catch (error) {
    throw error;
  }
}

export const formatJsonStringToJson = (jsonString: string | null) => {
  try {
    return jsonString ? JSON.parse(
      jsonString
      .replace('```json', '')
      .replace('```', '')
    ) : {};
  } catch (error) {
    throw error;
  }
}

export const leagueNameById = (leagueId: number): string => {
  const league = sportmonksLeagues.find((lg) => lg.id === leagueId);
  return league ? league.name : '';
}

export const seasonNameById = (seasonId: number): string => {
  const season = sportmonksSeasons.find((ss) => ss.id === seasonId);
  return season ? season.name : '';
}

export const positionNameById = (positionId: number): string => {
  const position = sportmonksTypes.find((tp) => tp.id === positionId);
  return position ? position.name : '';
}

export const typeNameById = (typeId: number): string => {
  const type = sportmonksTypes.find((tp) => tp.id === typeId);
  return type ? type.name : '';
}

export const bookmakerNameById = (bookmakerId: number): string => {
  const bookmaker = sportmonksBookmakers.find((bk) => bk.id === bookmakerId);
  return bookmaker ? bookmaker.name : '';
}

export const roundNameById = (roundId: number): string => {
  const round = sportmonksRounds.find((r) => r.id === roundId);
  return round ? round.name : '';
}

export const venueNameById = (venueId: number): string => {
  const venue = sportmonksVenues.find((v) => v.id === venueId);
  return venue ? venue.name : '';
}

export const teamNameById = (teamId: number): string => {
  const team = sportmonksTeams.find((t) => t.id === teamId);
  return team ? team.name : '';
}

export const groupOdds = (allOdds) => {
  return allOdds.reduce((acc, obj) => {
    const key = `market_id:${obj.market_id || ':'}-label:${obj.label || ':'}-total:${obj.total || ':'}-handicap:${obj.handicap || ':'}-name:${obj.name || ':'}`;

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(obj);
    return acc;
  }, {});
}

export const findHighestOdds = (allOdds) => {
  const groupedOdds = groupOdds(allOdds);
  const result = {};

  for (const marketKey in groupedOdds) {
    const marketData = groupedOdds[marketKey];

    if (Array.isArray(marketData)) {
      if (marketData.length > 0) {
        result[marketKey] = marketData.reduce((max, current) => {
          return new Decimal(current.value).gt(new Decimal(max.value)) ? current : max;
        });
      }
    }
  }

  return result;
};

export const findLowestOdds = (allOdds) => {
  const groupedOdds = groupOdds(allOdds);
  const result = {};

  for (const marketKey in groupedOdds) {
    const marketData = groupedOdds[marketKey];

    if (Array.isArray(marketData)) {
      if (marketData.length > 0) {
        result[marketKey] = marketData.reduce((min, current) => {
          return new Decimal(current.value).lt(new Decimal(min.value)) ? current : min;
        });
      }
    }
  }

  return result;
};

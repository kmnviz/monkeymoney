import { writeFileSync, readFileSync } from 'fs';
import path from 'path';
import sportmonksTypes from '../database/sportmonks/types.json';
import sportmonksMarkets from '../database/sportmonks/markets.json';
import sportmonksBookmakers from '../database/sportmonks/bookmakers.json';
import sportmonksLeagues from '../database/sportmonks/leagues.json';
import sportmonksSeasons from '../database/sportmonks/seasons.json';

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
  const season = sportmonksLeagues.find((ss) => ss.id === seasonId);
  return season ? season.name : '';
}

export const positionNameById = (positionId: number): string => {
  const position = sportmonksTypes.find((tp) => tp.id === positionId);
  return position ? position.name : '';
}

export const bookmakerNameById = (bookmakerId: number): string => {
  const bookmaker = sportmonksBookmakers.find((bk) => bk.id === bookmakerId);
  return bookmaker ? bookmaker.name : '';
}

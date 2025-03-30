import { writeFileSync, readFileSync } from 'fs';
import tiktoken from 'tiktoken';
import path from 'path';
import {DateTime} from 'luxon';
import Decimal from 'decimal.js';
import sportmonksTypes from '../database/sportmonks/types.json';
import sportmonksMarkets from '../database/sportmonks/markets.json';
import sportmonksBookmakers from '../database/sportmonks/bookmakers.json';
import sportmonksLeagues from '../database/sportmonks/leagues.json';
import sportmonksSeasons from '../database/sportmonks/seasons.json';
import sportmonksRounds from '../database/sportmonks/rounds.json';
import sportmonksVenues from '../database/sportmonks/venues.json';
import sportmonksTeams from '../database/sportmonks/teams.json';

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

export const countTokens = (messages, model) => {
  const encoding = tiktoken.encoding_for_model(model);
  let tokenCount = 0;

  for (const message of messages) {
    tokenCount += encoding.encode(message.content).length;
    tokenCount += 4;
  }

  return tokenCount;
};

export const countContentTokens = (content, model) => {
  const messages = [
    {
      role: 'system',
      content: `Test`,
    },
    {
      role: 'user',
      content: `Test`,
    },
    {
      role: 'assistant',
      content: JSON.stringify(content),
    },
  ];

  return countTokens(messages, model);
}

export const removeEmptyArrays = (obj) => {
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

export const removeNullValues = (obj) => {
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

export const removeZeroValues = (obj) => {
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

export const removeEmptyObjects = (obj) => {
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

export const daysBetweenIncludingBoth = (start, end) => {
  const startDate = DateTime.fromISO(start);
  const endDate = DateTime.fromISO(end);

  return endDate.diff(startDate, 'days').days + 1;
}

export const getDatesInRange = (start, end) => {
  let dates: any[] = [];
  let currentDate: any = DateTime.fromISO(start);
  const endDate = DateTime.fromISO(end);

  while (currentDate <= endDate) {
    dates.push(currentDate.toFormat('yyyy-MM-dd'));
    currentDate = currentDate.plus({ days: 1 });
  }

  return dates;
}

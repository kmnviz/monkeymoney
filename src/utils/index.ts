import { writeFileSync } from 'fs';
import path from 'path';

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

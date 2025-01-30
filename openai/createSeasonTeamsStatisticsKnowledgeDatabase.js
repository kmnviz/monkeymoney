import dotenv from 'dotenv';
dotenv.config();
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';
import axios from 'axios';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
  maxRetries: 5,
});

const pcIndex = await pc.index('ai-agent');

(async () => {
  // scotland
  const leagueId = '501';
  const seasonId = '23690';

  const pause = (ms = 1000) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  async function fetchData() {
    try {
      const apiToken = 'O6in4flhBPGNkSZncwWUJzQXZP1R5ARwRVYaU5avunP5yAyC7892e60LhqG0'
      const url = 'https://api.sportmonks.com/v3/football';
      const typesData = (await axios.get(`https://api.sportmonks.com/v3/core/types?api_token=${apiToken}`)).data.data;
      console.log('typesData: ', typesData);
      process.exit(1);
      const seasonTeamsData = (await axios.get(`${url}/teams/seasons/${seasonId}?api_token=${apiToken}`)).data.data;
      console.log('seasonTeamsData: ', seasonTeamsData);
      const teamsIds = seasonTeamsData.map((team) => team.id);
      console.log('teamsIds: ', teamsIds);
      const seasonTeamsStats = [];
      for (let i = 0; i < teamsIds.length; i++) {
        const seasonTeamStats = (await axios.get(`${url}/statistics/seasons/teams/${teamsIds[i]}?api_token=${apiToken}`)).data.data;
        console.log('seasonTeamStats: ', seasonTeamStats[1].details[1]);
        process.exit(1);
        seasonTeamsStats.push(seasonTeamStats);
      }
      console.log('seasonTeamsStats: ', seasonTeamsStats);

      const text = ``;
      const metadata = {
        text: text,
      };

      return { text, metadata };
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  }

  const { text, metadata } = await fetchData();

  // const embeddingResponse = await openai.embeddings.create({
  //   model: 'text-embedding-3-small',
  //   input: text,
  // });
  //
  // const embedding = embeddingResponse.data[0].embedding;
  // const upsertData = [
  //   {
  //     id: `league-season-team-statistics-${metadata.league}-${metadata.season}`,
  //     values: embedding,
  //     metadata: metadata,
  //   },
  // ];
  //
  // await pcIndex.upsert(upsertData);
  //
  // console.log('knowledge database should be finished.');
  // process.exit(1);
})();

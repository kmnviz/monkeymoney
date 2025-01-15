import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';
import axios from 'axios';

const openai = new OpenAI({
  apiKey: '',
});

const pc = new Pinecone({
  apiKey: '',
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

  async function fetchSeasonsRoundsAndFixtures() {
      try {
        const apiToken = 'O6in4flhBPGNkSZncwWUJzQXZP1R5ARwRVYaU5avunP5yAyC7892e60LhqG0'
        const url = 'https://api.sportmonks.com/v3/football';
        const leagueData = (await axios.get(`${url}/leagues/${leagueId}?api_token=${apiToken}`)).data.data;
        // console.log('seasonData: ', leagueData);
        await pause();
        const seasonData = (await axios.get(`${url}/seasons/${seasonId}?api_token=${apiToken}`)).data.data;
        // console.log('seasonData: ', seasonData);
        await pause();
        const seasonRoundsData = (await axios.get(`${url}/rounds/seasons/${seasonId}?api_token=${apiToken}`)).data.data;
        // console.log('seasonRoundsData: ', seasonRoundsData.length);
        await pause();
        const seasonSchedulesData = (await axios.get(`${url}/schedules/seasons/${seasonId}?api_token=${apiToken}`)).data.data;
        // console.log('seasonSchedulesData: ', seasonSchedulesData);
        await pause();
        const scheduleRoundsData = seasonSchedulesData.flatMap((data) => data.rounds);
        // console.log('scheduleRoundsData: ', scheduleRoundsData);
        await pause();
        const roundsFixturesData = scheduleRoundsData.flatMap((data) => {data.fixtures.forEach((fixture) => {fixture.round_name = data.name;});return data.fixtures;});
        // console.log('roundsFixturesData: ', roundsFixturesData);
        await pause();
        const seasonStagesData = (await axios.get(`${url}/stages/seasons/${seasonId}?api_token=${apiToken}`)).data.data;
        // console.log('seasonStagesData: ', seasonStagesData);
        await pause();
        const seasonTeamsData = (await axios.get(`${url}/teams/seasons/${seasonId}?api_token=${apiToken}`)).data.data;
        // console.log('seasonTeamsData: ', seasonTeamsData);
        await pause();
        const listOfTeams = seasonTeamsData.map((team) => team.name).join(', ').trim().slice(0,-1);
        // console.log('listOfTeams: ', listOfTeams);
        await pause();
        let listOfFixturesByRound = '';
        scheduleRoundsData.forEach((round) => {
          listOfFixturesByRound += ` | Round ${round.name}: ${round.fixtures.map((fixture) => `${fixture.name} starting at ${fixture.starting_at}`).join(', ').trim()}`;
        });
        // console.log('listOfFixturesByRound: ', listOfFixturesByRound);

        const text = `Scottish ${leagueData.name} league, season ${seasonData.name} runs from ${seasonData.starting_at} to ${seasonData.ending_at}.
The season has ${seasonRoundsData.length} rounds in total and is consists of ${seasonStagesData.length} stages.
The league consists of ${seasonTeamsData.length} teams: ${listOfTeams}. During the season will be played ${roundsFixturesData.length} matches.
I am providing a list of all matches by round: ${listOfFixturesByRound}.
`;
        const metadata = {
          text: text,
          league: leagueData.name,
          season: seasonData.name,
          teams: listOfTeams,
        };

        return { text, metadata };
      } catch (error) {
          console.error('Error fetching schedules:', error);
      }
  }

  const { text, metadata } = await fetchSeasonsRoundsAndFixtures();

  const embeddingResponse = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });

  const embedding = embeddingResponse.data[0].embedding;
  const upsertData = [
    {
      id: `season-data-${metadata.league}-${metadata.season}`,
      values: embedding,
      metadata: metadata,
    },
  ];

  await pcIndex.upsert(upsertData);

  console.log('knowledge database should be finished.');
  process.exit(1);
})();

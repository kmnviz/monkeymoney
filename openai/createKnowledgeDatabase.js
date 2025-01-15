import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';
import axios from "axios";

const openai = new OpenAI({
    apiKey: '',
});

const pc = new Pinecone({
    apiKey: '',
    maxRetries: 5,
});

const pcIndex = await pc.index('ai-agent');

const fetchSportMonksData = async () => {
    const seasonId = '23690';
    const roundId = 23;
    const schedulesUrl = 'https://api.sportmonks.com/v3/football/schedules/seasons/' + seasonId;
    const apiToken = 'O6in4flhBPGNkSZncwWUJzQXZP1R5ARwRVYaU5avunP5yAyC7892e60LhqG0';

    const options = {headers: {Accept: 'application/json'}};
    const schedulesResponse = await axios.get(`${schedulesUrl}?api_token=${apiToken}`, options);
    const roundFixtures = schedulesResponse.data.data[0].rounds[roundId].fixtures;

    const data = [];
    for (let i = 0; i < roundFixtures.length; i++) {
        if (roundFixtures[i].has_odds) {
            const oddsUrl = 'https://api.sportmonks.com/v3/football/odds/pre-match/fixtures/' + roundFixtures[i].id;
            const oddsResponse = await axios.get(`${oddsUrl}?api_token=${apiToken}`, options);
            const correctScoreOdds = oddsResponse.data.data.filter((odd) => odd.market_description === 'Correct Score');
            const correctScoreOdd = correctScoreOdds[0]

            const hda = correctScoreOdd.label === '1' ? 'Home' : (correctScoreOdd.label === '2' ? 'Away' : 'Draw');
            const metadata = {
                teams: roundFixtures[i].name,
                league: 'Scottish Premiership',
                match_date: roundFixtures[i].starting_at,
                betting_market: 'Correct Score',
                prediction: `${correctScoreOdd.name} ${hda}`,
                odds: correctScoreOdd.value,
                probability: correctScoreOdd.probability,
            };
            const text = `The teams are ${metadata.teams}
The league is ${metadata.league}
The date when the match will be played is ${metadata.match_date}
The betting market is 'Correct Score'
The prediction is ${metadata.prediction}
The odds are '${metadata.odds}' with probability of '${metadata.probability}'`;

            data.push({
                metadata: metadata,
                text: text,
            });
        }
    }

    return data;
}

const createEmbedding = async (data) => {
    const embeddingResponse = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: data.text,
    });

    return embeddingResponse.data[0].embedding;
}

const upsertEmbedding = async (mIndex, embedding, metadata) => {
    const upsertData = [
        {
            id: `match-${mIndex}`,
            values: embedding,
            metadata: metadata,
        },
    ];

    await pcIndex.upsert(upsertData);
}

const createKnowledgeDatabase = async () => {
    const data = await fetchSportMonksData();
    console.log('data is fetched and returned.');
    for (let i = 0; i < data.length; i++) {
        const embedding = await createEmbedding(data[i]);
        await upsertEmbedding(i, embedding, data[i].metadata);
        console.log(`embedding ${i} is created and upserted.`);
    }
}

await createKnowledgeDatabase();

console.log('knowledge database should be finished.');
process.exit(1);


// await fetchSportMonksData();

// const index = await pc.index('ai-agent');
//
// const matchData = `The teams are Celtic vs Dundee.
// The league is Scottish Premiership.
// The date when the match will be played is 25-01-2025 (DD-MM-YYYY).
// The betting market is 'Correct Score'.
// The prediction is '2-1' Home.
// The odds are '8.50' with a probability of '11.76%'.`;
//
// const embeddingResponse = await openai.embeddings.create({
//     model: 'text-embedding-3-small',
//     input: matchData,
// });
// console.log('embeddingResponse: ', embeddingResponse);
// const embedding = embeddingResponse.data[0].embedding;
// console.log('embedding: ', embedding);
//
// const metadata = {
//     teams: 'Celtic vs Dundee',
//     league: 'Scottish Premiership',
//     match_date: '25-01-2025',
//     betting_market: 'Correct Score',
//     prediction: '2-1 Home',
//     odds: '8.50',
//     probability: '11.76%',
// };
// const upsertData = [
//     {
//         id: 'match-0', // Unique ID for this vector
//         values: embedding, // The embedding vector
//         metadata: metadata, // Additional metadata (structured info)
//     },
// ];
//
// const upsertResponse = await index.upsert(upsertData);
// console.log('upsertResponse: ', upsertResponse);

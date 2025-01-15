import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: '',
});

const pc = new Pinecone({
    apiKey: 'pcsk_7PwKVR_CZCDgtMCc1oLNQNV87V7oVNhCEWf4Eonpt4FBkY6dEFTANfa4hXnsvXfZs33njU',
    maxRetries: 5,
});

(async () => {
    const index = await pc.index('ai-agent');

    const queryText = 'What are the odds for 2-1 for Celtic vs Dundee?';
    const embeddingResponse = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: queryText,
    });

    const queryEmbedding = embeddingResponse.data[0].embedding;
    console.log('queryEmbedding: ', queryEmbedding);

    const queryResponse = await index.query({
        vector: queryEmbedding,
        topK: 3,
        includeMetadata: true,
    });
    const matches = queryResponse.matches;
    console.log('matches: ', matches);

    if (!matches || matches.length === 0) {
        return "I'm sorry, I couldn't find any relevant information.";
    }

    const context = matches
        .map((match) =>
            `Match details:\n- Teams: ${match.metadata.teams}\n- League: ${match.metadata.league}\n- Date: ${match.metadata.match_date}\n- Market: ${match.metadata.betting_market}\n- Prediction: ${match.metadata.prediction}\n- Odds: ${match.metadata.odds}\n- Probability: ${match.metadata.probability}\n`
        ).join("\n");

    const messages = [
        {
            role: "system",
            content: "You are a helpful sports betting assistant.",
        },
        {
            role: "user",
            content: 'What are the odds for Celtic vs Dundee on 25.01.2025?',
        },
        {
            role: "assistant",
            content: `Here's the relevant context based on the database:\n${context}`,
        },
    ];
    const chatResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
    });

    console.log('chatResponse: ', chatResponse.choices[0].message);
})();

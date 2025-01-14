// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next';
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const prompt = req.body.prompt;
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY as string,
    });

    const pc = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY as string,
      maxRetries: 5,
    });

    const index = await pc.index('ai-agent');

    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: prompt,
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

    const match = matches[0];
    const context = `Match details:\n- Teams: ${match?.metadata?.teams}\n- League: ${match?.metadata?.league}\n- Date: ${match?.metadata?.match_date}\n- Market: ${match?.metadata?.betting_market}\n- Prediction: ${match?.metadata?.prediction}\n- Odds: ${match?.metadata?.odds}\n- Probability: ${match?.metadata?.probability}\n`

    const messages = [
      {
        role: "system",
        content: "You are a helpful sports betting assistant. Use only the provided context to answer questions.",
      },
      {
        role: "user",
        content: prompt,
      },
      {
        role: "assistant",
        content: `Here is the context with the relevant information:\n${context}`,
      },
    ];
    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
    });

    console.log('chatResponse: ', chatResponse.choices[0].message);

    return res.status(200).json({ message: chatResponse.choices[0].message.content });
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

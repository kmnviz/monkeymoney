// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next';
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';
import SportradarApiClient from '../../services/sportradarApiClient';
import {
  filterDailySchedules,
  filterSportEventMarkets,
  filterCompetitorSummaries,
} from '../../filters';
import { pause } from '../../utils';
import TDailySchedule from '../../types/DailySchedule';
import TSportEventMarket from '../../types/SportEventMarket';
import TCompetitorSummary from '../../types/CompetitorSummary';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const sportradarApiClient = new SportradarApiClient();
    const dailySchedules: TDailySchedule[] = await sportradarApiClient
      .dailySchedules('2025-02-02');
    const filteredDailySchedules = filterDailySchedules(dailySchedules);
    console.log(`Starting with ${filteredDailySchedules.length} filtered daily schedules`);

    const eventsWithMarkets = [];
    for (let i = 0; i < filteredDailySchedules.length; i++) {
      if (i !== 28) {
        continue;
      }

      // Fetch markets for sport event
      const sportEventMarkets: TSportEventMarket[] = await sportradarApiClient
        .sportEventMarkets(filteredDailySchedules[i].id);
      console.log(`Sport event ${filteredDailySchedules[i].fixture} has ${sportEventMarkets ? sportEventMarkets?.length : 0} markets`);

      if (sportEventMarkets && sportEventMarkets?.length > 0) {
        // Fetch summaries for sport event competitors
        const competitorsSummaries = [];
        for (let y = 0; y < filteredDailySchedules[i].competitors.length; y++) {
          const competitorSummaries: TCompetitorSummary[] = await sportradarApiClient
            .competitorSummaries(filteredDailySchedules[i].competitors[y].id);

          competitorsSummaries.push({
            competitor: filteredDailySchedules[i].competitors[y].name,
            summaries: filterCompetitorSummaries(competitorSummaries).slice(0, 10),
          });
        }

        const lastMeetings = await sportradarApiClient
          .competitorVsCompetitor(filteredDailySchedules[i].competitors[0].id, filteredDailySchedules[i].competitors[1].id);

        eventsWithMarkets.push({
          event: filteredDailySchedules[i],
          markets: filterSportEventMarkets(sportEventMarkets),
          summaries: competitorsSummaries,
          headToHead: filterCompetitorSummaries(lastMeetings),
        });
      }

      await pause(1500);
    }

    // console.log('eventsWithMarkets: ', eventsWithMarkets[0].summaries[0].summaries[0].statistics[0].statistics);
    // console.log('eventsWithMarkets: ', eventsWithMarkets[0].summaries[0].summaries[0].statistics[0].players);
    // console.log('eventsWithMarkets: ', eventsWithMarkets[0].headToHead);
    // console.log('eventsWithMarkets: ', JSON.stringify(eventsWithMarkets[0]).length);
    // console.log('markets: ', eventsWithMarkets[0].markets);
    // console.log('markets: ', eventsWithMarkets[0].markets[0].books[0]);
    // console.log('statistics: ', eventsWithMarkets[0].statistics);

    // console.log('filteredDailySchedules: ', filteredDailySchedules);
    // console.log('sportEventMarkets: ', sportEventMarkets);

    const prompt = req.body.prompt;
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY as string,
    });

    const pc = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY as string,
      maxRetries: 5,
    });

    // const index = await pc.index('ai-agent');
    //
    // const embeddingResponse = await openai.embeddings.create({
    //   model: 'text-embedding-3-small',
    //   input: prompt,
    // });
    //
    // const queryEmbedding = embeddingResponse.data[0].embedding;
    // console.log('queryEmbedding: ', queryEmbedding);
    //
    // const queryResponse = await index.query({
    //   vector: queryEmbedding,
    //   topK: 10,
    //   includeMetadata: true,
    // });
    // const matches = queryResponse.matches;
    // console.log('matches: ', matches);
    //
    // if (!matches || matches.length === 0) {
    //   return "I'm sorry, I couldn't find any relevant information.";
    // }
    //
    // const match = matches[0];
    //
    // let context;
    // if (match?.metadata?.text) {
    //   context = match.metadata.text;
    // } else {
    //   context = `Match details:\n- Teams: ${match?.metadata?.teams}\n- League: ${match?.metadata?.league}\n- Date: ${match?.metadata?.match_date}\n- Market: ${match?.metadata?.betting_market}\n- Prediction: ${match?.metadata?.prediction}\n- Odds: ${match?.metadata?.odds}\n- Probability: ${match?.metadata?.probability}\n`
    // }

    const messages = [
      {
        role: "system",
        // content: "You are a helpful sports betting assistant. Use only the provided context to answer questions.",
        content: "This GPT is designed to provide single odd with highest risk-reward-probability (with probability highest then 80%) ratio in JSON format. Add the probability in percents the response. Add reasoning to the response. Add reasoning related to players performance with more specifics to the response.",
      },
      {
        role: "user",
        // content: prompt,
        content: `Provide one odd with the highest risk-reward ratio ${eventsWithMarkets[0].event.fixture} match?`,
      },
      {
        role: "assistant",
        // content: `Here is the context with the relevant information:\n${context}`,
        content: JSON.stringify(eventsWithMarkets[0]),
      },
    ];

    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: messages,
      response_format: { type: 'json_object' },
    });

    console.log('chatResponse: ', chatResponse.choices[0].message);

    return res.status(200).json({ message: chatResponse.choices[0].message.content });
    return res.status(200).json({ message: 'asdf' });
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

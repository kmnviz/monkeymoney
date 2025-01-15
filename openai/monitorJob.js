import dotenv from 'dotenv';
dotenv.config();
import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: '',
});

const id = 'ftjob-Llm7uYG1XDkyHtVKiGA8iZ0C';
const response = await client.fineTuning.jobs.retrieve(id);
console.log(response);

// const responseEvents = await client.fineTuning.jobs.listEvents(id, {limit: 10});
// console.log(responseEvents);

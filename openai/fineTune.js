import dotenv from 'dotenv';
dotenv.config();
import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: '',
});

const id = 'file-F9NxX2EyuNp1qT38Y9EUva';
const response = await client.fineTuning.jobs.create({
    training_file: id,
    // model: 'gpt-3.5-turbo',
    // model: 'gpt-4o-mini',
    model: 'ft:gpt-3.5-turbo-0125:personal::AoacelaX',
});
console.log(response);

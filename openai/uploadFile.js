import dotenv from 'dotenv';
dotenv.config();
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: '',
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'chat.jsonl');

console.log('filePath: ', filePath);

try {
    const response = await client.files.create({
        file: fs.createReadStream(filePath),
        purpose: 'fine-tune',
    });
    console.log(response);
} catch (error) {
    console.error('Error uploading file:', error.message);
}

// setInterval(async () => {
//     const response2 = await client.fineTuning.jobs.retrieve(response.id);
//     console.log(response2);
// }, 10000);
// import { OpenAIApi, Configuration } from 'openai';
//
// const configuration = new Configuration({
//     apiKey: process.env.OPEN_AI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);
//
// async function fineTuneModel() {
//     try {
//         const response = await openai.createFineTune({
//             training_file: './chat.jsonl',
//             model: 'gpt-3.5-turbo',
//         });
//
//         console.log(response.data);
//     } catch (error) {
//         console.error("Error during fine-tuning:", error.response?.data || error.message);
//     }
// }
//
// // Run the function
// fineTuneModel();

import dotenv from 'dotenv';
dotenv.config();
import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: '',
});

const response = await client.chat.completions.create({
    messages: [
        {
            'role': 'user',
            // 'content': 'Is Lokomotiv Gorna Oryahovitsa a winner in football match between Montana and Lokomotiv Gorna Oryahovitsa on 08.12.2024?',
            // 'content': 'Is Montana a winner in football match between Montana and Lokomotiv Gorna Oryahovitsa on 08.12.2024?',
            // 'content': 'Did Montana and Lokomotiv Gorna Oryahovitsa played on 05.12.2024 or on 08.12.2024?',
            'content': 'What is the chance and what is the odd of a home win in the Celtic vs Dundee game?',
        },
    ],
    model: 'ft:gpt-3.5-turbo-0125:personal::AoacelaX',
});
console.log(response.choices[0].message);

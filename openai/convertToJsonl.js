import fs from 'fs';

function convertJsonl(data, filename) {
    const fileStream = fs.createWriteStream(filename);
    data.forEach((item) => {
        const messages = [
            { role: 'user', content: item.question },
            { role: 'assistant', content: item.answer }
        ];
        fileStream.write(JSON.stringify({ messages }) + '\n');
    });
    fileStream.end();
}

const qas = [];

await convertJsonl(qas, './openai/chat.jsonl');


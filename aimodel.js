// const { OpenAIApi } = require('openai');
// require('dotenv').config();

// const apiKey = process.env.OPEN_AI_KEY;

// const openai = new OpenAIApi(apiKey);

// // controller.js

// const generateData = async (msg) => {
//   try {
//     const description = await openai.create({
//       engine: 'gpt-3.5-turbo',
//       prompt: `help with this query ${msg}`,
//       max_tokens: 100,
//     });

//     const aimsg = description.data.choices[0].text;
//     console.log(aimsg);

//     const tags = await openai.create({
//       engine: 'gpt-3.5-turbo',
//       prompt: `help with this query ${msg}`,
//       max_tokens: 100,
//     });

//     const aitag = tags.data.choices[0].text;
//     console.log(aitag);
//   } catch (error) {
//     console.error('OpenAI API error:', error);
//   }
// }

// generateData('Your message here');
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function generateChatCompletion() {
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "Organization: org-ZuOnVEmHdOBQEHU2qQm9gM9p" },
                { role: "user", content: "Say this is a test" }
            ],
            model: "gpt-3.5-turbo",
        });
        console.log(chatCompletion.data);
    } catch (error) {
        console.error('OpenAI API error:', error);
    }
}

generateChatCompletion();

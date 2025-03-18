import betSuggestionPrompt from '../prompts/bet-suggestion';
import {formatJsonStringToJson, pause} from '../utils';
import OpenAI from 'openai';

const deepSeek = new OpenAI({
  baseURL: process.env.DEEPSEEK_API_URL,
  apiKey: process.env.DEEPSEEK_API_KEY as string,
});

const createBetSuggestionDeepSeekReasoner = async (content, retries = 1000) => {
  const lContent = {...content};
  lContent['odds'] = lContent['odds'].map(({prob, ...rest}) => rest);
  const probInstruction = `Think strategically and prioritize bets where **real probability > 70% and odds > 1.70.**`;

  const messages = [
    {
      role: 'system',
      content: `You are a world-class football data analyst. Analyze the JSON data and provide insights. Return a JSON response.`,
    },
    {
      role: 'user',
      content: betSuggestionPrompt(probInstruction),
    },
    {
      role: 'assistant',
      content: JSON.stringify(lContent),
    },
    {
      role: 'user',
      content: `
        **Final Instruction**
          - ${probInstruction}
          - ** Think outside the box and leverage your deepest football knowledge. **
          - If the selected bet does not meet these criteria, **recalculate** the selection.
          - ** IN ANY CASE THERE SHOULD BE A RECOMMENDED BET **

        **Output Format (Strictly Follow This JSON Structure):**
          {
            "fixture": "<Team A vs Team B>",
            "bet": "<Detailed Bet Selection>",
            "probability": "<Calculated Probability (%)>",
            "odd_id": "<Selected Odd ID>",
            "odd": "<Selected Odd>",
            "market_id": "<Selected Market ID>",
            "market_description": "<Brief Explanation of the Market>",
            "comprehensive_detailed_reason": "<Comprehensive Detailed Reason>"
          }
      `,
    },
  ];

  const model = 'deepseek-reasoner';
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`Attempt ${attempt}: Sending request...`);
      const completion = await deepSeek.chat.completions.create({
        model: model,
        messages: messages,
        temperature: 0,
      } as any);

      return {
        model: model,
        data: formatJsonStringToJson(completion.choices[0].message.content),
        reasoning: completion.choices[0].message['reasoning_content'],
        tokens: completion.usage?.total_tokens,
      };
    } catch (error) {
      console.error(`createBetSuggestionDeepSeekReasoner attempt ${attempt} failed:`, error.message);

      if (attempt < retries) {
        const delay = attempt * 60 * 1000;
        console.log(`createBetSuggestionDeepSeekReasoner retrying in ${delay / 1000} seconds...`);
        await pause(delay);
      } else {
        console.log('createBetSuggestionDeepSeekReasoner max retries reached. Returning error.');
        return {
          data: `fixture ${lContent.fixture.name} failed with ${error.message}`,
        };
      }
    }
  }
};

export default createBetSuggestionDeepSeekReasoner;

// @ts-nocheck
import OpenAI from 'openai';
import selectFixturesPrompt from '../prompts/select-fixtures';
import betSuggestionPrompt from '../prompts/bet-suggestion';
import betSuggestionExp0001Prompt from '../prompts/exp/bet-suggestion-0001';
import betSuggestionExp0002Prompt from '../prompts/exp/bet-suggestion-0002';
import freeSuggestionsPostPrompt from '../prompts/free-suggestions-post';
import premiumSuggestionsPostPrompt from '../prompts/premium-suggestions-post';
import freeSuggestionPostPrompt from '../prompts/free-suggestion-post';
import suggestionCheckPrompt from '../prompts/suggestion-check';
import recapSuggestionsPostPrompt from '../prompts/recap-suggestions-post';
import fixtureMostPossibleOutcome from '../prompts/fixture-most-possible-outcome';
import {formatJsonStringToJson, pause} from '../utils';

class DeepSeekService {

  models = {
    deepSeekReasoner: 'deepseek-reasoner',
    deepSeekChat: 'deepseek-chat',
  };

  client;

  constructor() {
    this.client = new OpenAI({
      baseURL: process.env.DEEPSEEK_API_URL,
      apiKey: process.env.DEEPSEEK_API_KEY as string,
    });
  }

  async createSelectFixturesCompletion(count: number, fixtures: any[]) {
    const content = fixtures.map((fixture) => {
      return {
        fixture_id: fixture.id,
        fixture: `${fixture.participants[0].name} vs ${fixture.participants[1].name}`,
      };
    });

    const messages = [
      {
        role: 'system',
        content: `You are an expert football analyst and betting strategist. Your task is to analyze a given list of football fixtures and select the top ${count} fixtures that have the highest potential for successful betting promotion. Use a data-driven approach based on value, team's popularity, historical number of viewer, overall fixture popularity.`,
      },
      {
        role: 'user',
        content: selectFixturesPrompt(count),
      },
      {
        role: 'assistant',
        content: JSON.stringify(content),
      },
      {
        role: 'user',
        content: `
        ### INSTRUCTIONS:
        - Return ONLY a comma-separated list of exactly ${count} fixture_ids.
        - NO explanations, NO formatting, NO JSON, NO extra text.
        - STRICTLY follow this format: X,Y,Z (e.g., 12345,67890,54321).
        - DO NOT include quotes, brackets, new lines, or any additional words.
        - If you provide anything other than just fixture IDs, the response is INVALID.
        `
      }
    ];

    const completion = await this.client.chat.completions.create({
      model: this.models.deepSeekReasoner,
      messages: messages,
      temperature: 0,
    } as any);

    console.log(`DeepSeek.createSelectFixturesCompletion`);
    console.log(`-- used ${completion.usage?.total_tokens} tokens`);

    return {
      data: completion.choices[0].message.content,
    };
  }

  async createBetSuggestionCompletion(content, retries = 1000) {
    const probInstruction = `Think strategically and prioritize bets where ** ODD IS GREATER THAN 1.65 **`;

    const messages = [
      {
        role: 'system',
        content: `You are a world-class football data analyst. Analyze the JSON data and provide insights. Return a JSON response.`,
      },
      {
        role: 'user',
        // content: betSuggestionPrompt(probInstruction),
        content: betSuggestionExp0001Prompt(),
      },
      {
        role: 'assistant',
        content: JSON.stringify(content),
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
            "bet": "<Bet Selection>",
            "probability": "<Calculated Probability (%)>",
            "odd_id": "<Selected Odd ID>",
            "odd": "<Selected Odd>",
            "market_id": "<Selected Market ID>",
            "market_description": "<Market Description>",
            "comprehensive_detailed_reason": "<Comprehensive Detailed Reason>"
          }
      `,
      },
    ];

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`createBetSuggestionWithDeepSeekReasoner attempt ${attempt}`);
        const startTime = performance.now();
        const completion = await this.client.chat.completions.create({
          model: this.models.deepSeekReasoner,
          messages: messages,
          temperature: 0,
        } as any);
        const endTime = performance.now();
        console.log(`DeepSeek.createBetSuggestionCompletion`);
        console.log(`-- finished in: ${((endTime - startTime) / 1000).toFixed(2)}s`);
        console.log(`-- used ${completion.usage?.total_tokens} tokens`);

        return {
          model: this.models.deepSeekReasoner,
          data: formatJsonStringToJson(completion.choices[0].message.content),
          // reasoning: completion.choices[0].message['reasoning_content'],
          tokens: completion.usage?.total_tokens,
        };
      } catch (error) {
        console.error(`createBetSuggestionWithDeepSeekReasoner attempt ${attempt} failed:`, error.message);

        if (attempt < retries) {
          const delay = attempt * 60 * 1000;
          console.log(`Retrying in ${delay / 1000} seconds...`);
          await pause(delay);
        } else {
          console.log('Max retries reached. Returning error.');
          return {
            data: `fixture ${content.fixture.name} failed with ${error.message}`,
          };
        }
      }
    }
  }

  async createBetSuggestionExp0001Completion(content, retries = 1000) {
    const messages = [
      {
        role: 'system',
        content: `You are a world-class football data analyst. Analyze the JSON data and provide insights. Return a JSON response.`,
      },
      {
        role: 'user',
        content: betSuggestionExp0001Prompt(),
      },
      {
        role: 'assistant',
        content: JSON.stringify(content),
      },
      {
        role: 'user',
        content: `
        **Final Instruction**
          - ** Think outside the box and leverage your deepest football knowledge. **
          - If the selected bet does not meet these criteria, **recalculate** the selection.
          - ** IN ANY CASE THERE SHOULD BE A RECOMMENDED BET **

        **Output Format (Strictly Follow This JSON Structure):**
          {
            "fixture": "<Team A vs Team B>",
            "bet": "<Bet Selection>",
            "probability": "<Calculated Probability (%)>",
            "odd_id": "<Selected Odd ID>",
            "odd": "<Selected Odd>",
            "market_id": "<Selected Market ID>",
            "market_description": "<Market Description>",
            "comprehensive_detailed_reason": "<Comprehensive Detailed Reason>"
          }
      `,
      },
    ];

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`createBetSuggestionWithDeepSeekReasoner attempt ${attempt}`);
        const startTime = performance.now();
        const completion = await this.client.chat.completions.create({
          model: this.models.deepSeekReasoner,
          messages: messages,
          temperature: 0,
        } as any);
        const endTime = performance.now();
        console.log(`DeepSeek.createBetSuggestionCompletion`);
        console.log(`-- finished in: ${((endTime - startTime) / 1000).toFixed(2)}s`);
        console.log(`-- used ${completion.usage?.total_tokens} tokens`);

        return {
          model: this.models.deepSeekReasoner,
          data: formatJsonStringToJson(completion.choices[0].message.content),
          // reasoning: completion.choices[0].message['reasoning_content'],
          tokens: completion.usage?.total_tokens,
        };
      } catch (error) {
        console.error(`createBetSuggestionWithDeepSeekReasoner attempt ${attempt} failed:`, error.message);

        if (attempt < retries) {
          const delay = attempt * 60 * 1000;
          console.log(`Retrying in ${delay / 1000} seconds...`);
          await pause(delay);
        } else {
          console.log('Max retries reached. Returning error.');
          return {
            data: `fixture ${content.fixture.name} failed with ${error.message}`,
          };
        }
      }
    }
  }

  async createBetSuggestionExp0002Completion(content, retries = 1000) {
    const messages = [
      {
        role: 'system',
        content: `You are a world-class football data analyst. Analyze the JSON data and provide insights. Return a JSON response.`,
      },
      {
        role: 'user',
        content: betSuggestionExp0002Prompt(),
      },
      {
        role: 'assistant',
        content: JSON.stringify(content),
      },
      {
        role: 'user',
        content: `
        **Final Instruction**
          - ** Think outside the box and leverage your deepest football knowledge. **
          - If the selected bet does not meet these criteria, **recalculate** the selection.
          - ** IN ANY CASE THERE SHOULD BE A RECOMMENDED OUTCOME **

        **Output Format (Strictly Follow This JSON Structure):**
          {
            "fixture": "<Team A vs Team B>",
            "bet": "<Under or Over>",
            "comprehensive_detailed_reason": "<Comprehensive Detailed Reason>"
          }
      `,
      },
    ];

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`createBetSuggestionExp0002Completion attempt ${attempt}`);
        const startTime = performance.now();
        const completion = await this.client.chat.completions.create({
          model: this.models.deepSeekReasoner,
          messages: messages,
          temperature: 0,
        } as any);
        const endTime = performance.now();
        console.log(`DeepSeek.createBetSuggestionExp0002Completion`);
        console.log(`-- finished in: ${((endTime - startTime) / 1000).toFixed(2)}s`);
        console.log(`-- used ${completion.usage?.total_tokens} tokens`);

        return {
          model: this.models.deepSeekReasoner,
          data: formatJsonStringToJson(completion.choices[0].message.content),
          // reasoning: completion.choices[0].message['reasoning_content'],
          tokens: completion.usage?.total_tokens,
        };
      } catch (error) {
        console.error(`createBetSuggestionExp0002Completion attempt ${attempt} failed:`, error.message);

        if (attempt < retries) {
          const delay = attempt * 60 * 1000;
          console.log(`Retrying in ${delay / 1000} seconds...`);
          await pause(delay);
        } else {
          console.log('Max retries reached. Returning error.');
          return {
            data: `fixture ${content.fixture.name} failed with ${error.message}`,
          };
        }
      }
    }
  }

  async createFreeSuggestionsPostCompletion(suggestions, odds, date) {
    const messages = [
      {
        role: 'system',
        content: ``,
      },
      {
        role: 'user',
        content: freeSuggestionsPostPrompt(date, odds),
      },
      {
        role: 'assistant',
        content: JSON.stringify(suggestions),
      },
    ];

    const startTime = performance.now();
    const completion = await this.client.chat.completions.create({
      model: this.models.deepSeekChat,
      messages: messages,
      temperature: 0,
    } as any);
    const endTime = performance.now();
    console.log(`DeepSeek.createFreeSuggestionsPostCompletion`);
    console.log(`-- finished in: ${((endTime - startTime) / 1000).toFixed(2)}s`);
    console.log(`-- used ${completion.usage?.total_tokens} tokens`);

    return {
      model: this.models.deepSeekChat,
      data: completion.choices[0].message.content,
    };
  }

  async createPremiumSuggestionsPostCompletion(suggestions, odds, date) {
    const messages = [
      {
        role: 'system',
        content: ``,
      },
      {
        role: 'user',
        content: premiumSuggestionsPostPrompt(date, odds),
      },
      {
        role: 'assistant',
        content: JSON.stringify(suggestions),
      },
    ];

    const startTime = performance.now();
    const completion = await this.client.chat.completions.create({
      model: this.models.deepSeekChat,
      messages: messages,
      temperature: 0,
    } as any);
    const endTime = performance.now();
    console.log(`DeepSeek.createPremiumSuggestionsPostCompletion`);
    console.log(`-- finished in: ${((endTime - startTime) / 1000).toFixed(2)}s`);
    console.log(`-- used ${completion.usage?.total_tokens} tokens`);

    return {
      model: this.models.deepSeekChat,
      data: completion.choices[0].message.content,
    };
  }

  async createFreeSuggestionPostCompletion(suggestion) {
    const messages = [
      {
        role: 'system',
        content: ``,
      },
      {
        role: 'user',
        content: freeSuggestionPostPrompt(),
      },
      {
        role: 'assistant',
        content: JSON.stringify(suggestion),
      }
    ];

    const startTime = performance.now();
    const completion = await this.client.chat.completions.create({
      model: this.models.deepSeekChat,
      messages: messages,
      temperature: 0,
    } as any);
    const endTime = performance.now();
    console.log(`DeepSeek.createFreeSuggestionPostCompletion`);
    console.log(`-- finished in: ${((endTime - startTime) / 1000).toFixed(2)}s`);
    console.log(`-- used ${completion.usage?.total_tokens} tokens`);

    return {
      model: this.models.deepSeekChat,
      data: completion.choices[0].message.content,
    };
  }

  async createSuggestionCheckCompletion(content, retries = 1000) {
    console.log('content: ', content);
    const messages = [
      {
        role: 'system',
        content: ``,
      },
      {
        role: 'user',
        content: suggestionCheckPrompt(),
      },
      {
        role: 'assistant',
        content: JSON.stringify(content),
      },
      {
        role: 'user',
        content: `You answer must be just YES or NO`,
      }
    ];

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const startTime = performance.now();
        const completion = await this.client.chat.completions.create({
          model: this.models.deepSeekReasoner,
          messages: messages,
          temperature: 0,
        } as any);
        const endTime = performance.now();
        console.log(`DeepSeek.createSuggestionCheckCompletion`);
        console.log(`-- finished in: ${((endTime - startTime) / 1000).toFixed(2)}s`);
        console.log(`-- used ${completion.usage?.total_tokens} tokens`);

        return {
          model: this.models.deepSeekReasoner,
          data: completion.choices[0].message.content,
        };
      } catch (error) {
        console.error(`createSuggestionCheckCompletion attempt ${attempt} failed:`, error.message);

        if (attempt < retries) {
          const delay = 60 * 1000;
          console.log(`Retrying in ${delay / 1000} seconds...`);
          await pause(delay);
        } else {
          console.log('Max retries reached. Returning error.');
          return {
            data: `fixture ${content.fixture.name} failed with ${error.message}`,
          };
        }
      }
    }
  }

  async createRecapSuggestionPostCompletion(content, date) {
    const messages = [
      {
        role: 'system',
        content: ``,
      },
      {
        role: 'user',
        content: recapSuggestionsPostPrompt(date),
      },
      {
        role: 'assistant',
        content: JSON.stringify(content),
      },
    ];

    const startTime = performance.now();
    const completion = await this.client.chat.completions.create({
      model: this.models.deepSeekChat,
      messages: messages,
      temperature: 0,
    } as any);
    const endTime = performance.now();
    console.log(`DeepSeek.createRecapSuggestionPostCompletion`);
    console.log(`-- finished in: ${((endTime - startTime) / 1000).toFixed(2)}s`);
    console.log(`-- used ${completion.usage?.total_tokens} tokens`);

    return {
      model: this.models.deepSeekChat,
      data: completion.choices[0].message.content,
    };
  }

  async createFixtureMostPossibleOutcomeCompletion(content, retries = 1000) {

    const messages = [
      {
        role: 'system',
        content: `You are a world-class football data analyst. Analyze the JSON data and provide insights. Return a JSON response.`,
      },
      {
        role: 'user',
        content: fixtureMostPossibleOutcome(),
      },
      {
        role: 'assistant',
        content: JSON.stringify(content),
      },
      {
        role: 'user',
        content: `
          **Final Instruction**
            - ** Think outside the box and leverage your deepest football knowledge. **

          **Output Format (Strictly Follow This JSON Structure):**
            {
              "fixture": "<Team A vs Team B>",
              "outcome": "<Most possible outcome>",
            }
        `,
      },
    ];

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`createBetSuggestionWithDeepSeekReasoner attempt ${attempt}`);
        const startTime = performance.now();
        const completion = await this.client.chat.completions.create({
          model: this.models.deepSeekReasoner,
          messages: messages,
          temperature: 0,
        } as any);
        const endTime = performance.now();
        console.log(`DeepSeek.createFixtureMostPossibleOutcomeCompletion`);
        console.log(`-- finished in: ${((endTime - startTime) / 1000).toFixed(2)}s`);
        console.log(`-- used ${completion.usage?.total_tokens} tokens`);

        return {
          model: this.models.deepSeekReasoner,
          data: formatJsonStringToJson(completion.choices[0].message.content),
          // reasoning: completion.choices[0].message['reasoning_content'],
          tokens: completion.usage?.total_tokens,
        };
      } catch (error) {
        console.error(`createFixtureMostPossibleOutcomeCompletion attempt ${attempt} failed:`, error.message);

        if (attempt < retries) {
          const delay = attempt * 60 * 1000;
          console.log(`Retrying in ${delay / 1000} seconds...`);
          await pause(delay);
        } else {
          console.log('Max retries reached. Returning error.');
          return {
            data: `fixture ${content.fixture.name} failed with ${error.message}`,
          };
        }
      }
    }
  }
}

export default DeepSeekService;

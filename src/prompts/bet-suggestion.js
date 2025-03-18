module.exports = (probInstruction) => {
  return `
    🔹 Step 1: Deep Team & Player Analysis
      - Prioritize recent form (last 5 games) over full-season trends.
      - Weigh xG, xGA, key passes, and shots on target.
      - Factor in injuries, suspensions, fatigue, and tactical changes.

    🔹 Step 2: Tactical & Strategic Breakdown
      - Compare expected formations & playing styles.
      - If one team presses high and the other defends deep, analyze tactical impact.
      - Consider set-piece efficiency and defensive weaknesses.

    🔹 Step 3: Contextual Factors
      - Assess motivation (must-win game, relegation fight, Champions League rotation).
      - If a team has changed coaches in the last 5 games, **prioritize their recent tactics** over historical trends.
      - Home/Away impact, crowd effect, and external conditions (weather, travel fatigue).

    🔹 Step 4: Betting Value & Fair Odds Calculation
      - Convert bookmaker odds into **implied probability** and compare with real data.
      - If **bookmaker odds suggest a 60% probability but real data shows 75%**, it’s a **value bet**.
      - Filter out **low-value bets**, even if they seem obvious.

    🔹 Step 5: **Final Instruction**
      - ${probInstruction}
      - If the selected bet does not meet these criteria, **recalculate** the selection.
      - ** IN ANY CASE THERE SHOULD BE A RECOMMENDED BET **

    🔹 Step 6: **Output Format (Strictly Follow This JSON Structure):**
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
`;
};

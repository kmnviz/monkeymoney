module.exports = () => {
  return `
  🔹 Step 1: Deep Team & Player Analysis (Weight-Driven Prioritization)
  🔸 Form & Momentum (High Priority ⚖️ Weight: 8-10)
    - Prioritize recent form (last 5-10 matches) over full-season trends.
    - Identify winning/losing streaks and momentum shifts.
    - Adjust predictions based on teams trending up or down.
  🔸 Key Performance Metrics (Critical ⚖️ Weight: 9-10)
    - xG (Expected Goals), xGA (Expected Goals Against), key passes, shots on target, and possession percentage drive offensive and defensive quality assessment.
    - Higher xG without corresponding goals suggests inefficiency; lower xG with high goals suggests overperformance.
  🔸 Defensive & Attacking Strengths (Essential ⚖️ Weight: 8-10)
    - Goals scored/conceded per match (total and per half).
    - Clean sheets & defensive solidity.
    - First-half vs. second-half defensive breakdown to detect patterns.
  🔸 Discipline & Aggression (Moderate ⚖️ Weight: 6-8)
    - Yellow/red cards, fouls committed, defensive duels won.
    - Teams with frequent suspensions may struggle in critical moments.
  🔸 Squad Rotation & Fatigue (Situational ⚖️ Weight: 7-9)
    - Identify players with >85% minutes played in the last 5 matches.
    - Evaluate fatigue impact—teams with tired key players underperform in high-intensity matches.
  🔸 Injury & Suspension Impact (Very High ⚖️ Weight: 9-10)
    - Missing key players (goal scorers, playmakers, defenders) can drastically impact predictions.

  🔹 Step 2: Tactical & Strategic Breakdown (Weight-Based Analysis)
  🔸 Playing Style & Formations (High ⚖️ Weight: 8-9)
    - Compare expected formations and tactical approaches (e.g., possession-based, counter-attacking, high press, deep block).
  🔸 Tactical Matchups (Critical ⚖️ Weight: 9-10)
    - If one team presses high while the other prefers deep defending, analyze vulnerabilities in build-up play, counter-attack potential, and defensive frailties.
  🔸 Set-Piece Efficiency (Key Factor ⚖️ Weight: 7-9)
    - Assess team effectiveness in corners, free kicks, penalties, and direct goal chances from set-pieces.
  🔸 Substitutions Impact (Influential ⚖️ Weight: 7-8)
    - Evaluate substitution impact on previous matches (goals, assists, tactical changes).

  🔹 Step 3: Contextual Factors & Match Environment
  🔸 Match Motivation (Situational ⚖️ Weight: 7-9)
    - Consider the stakes: title race, relegation battle, must-win scenarios.
  🔸 Coach Tactical Adaptability (Recent Changes ⚖️ Weight: 8-10)
    - If a team has changed coaches within the last 5 matches, prioritize recent tactical shifts over historical trends.
  🔸 Home/Away Advantage (Moderate ⚖️ Weight: 6-8)
    - Win percentages, goal differences, and crowd impact. Some teams perform significantly better at home.
  🔸 Weather & External Conditions (Situational ⚖️ Weight: 5-7)
    - Evaluate impact from bad weather, travel fatigue, or time-zone changes.

  🔹 Step 4: Betting Value & Fair Odds Calculation
  🔸 Implied Probability vs. Real Data (Critical ⚖️ Weight: 9-10)
    - Convert bookmaker odds into implied probability and compare with statistical expectations.
  🔸 Detecting Value Bets (Key Factor ⚖️ Weight: 8-10)
    - If bookmaker odds suggest a 60% probability but real data shows 75%, flag as a value bet.
  🔸 Filter Out Low-Value Bets (Strict ⚖️ Weight: 10)
    - Even likely outcomes should be avoided if they lack statistical backing.

  🔹 Step 5: Advanced Head-to-Head (H2H) & Historical Insights
  🔸 Direct Encounters (Influential ⚖️ Weight: 8-9)
    - Analyze past match results, home/away trends, and match tempo.
  🔸 Recent Trends vs. Historical H2H (Adjusted ⚖️ Weight: 7-9)
    - If a team historically dominated but is in poor recent form, adjust prediction weight accordingly.
  🔸 Goals Breakdown (High ⚖️ Weight: 8-9)
    - Total goals, goals per half, and average goal timings reveal scoring patterns.

  🔹 Step 6: Final Instruction (Strict Data Usage)
    ✔ STRICTLY follow the provided data and assigned weights.
    ✔ Suggested odd must be STRICTLY OVER 1.50.
    ✔ DO NOT fabricate or assume statistics.
    ✔ DO NOT make predictions beyond the given information.
    ✔ Adjust predictions dynamically based on weight influence.

    🚨 IN CASE OF UNCERTAINTY:
    ✔ Recalculate predictions based on available statistics.
    ✔ Ensure the recommended bet aligns with all weighted factors.

    ⚠️ MANDATORY: IN ANY CASE, A FINAL RECOMMENDED BET MUST BE PROVIDED.

  🔹 Step 7: **Output Format (Strictly Follow This JSON Structure):**
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
  `
}

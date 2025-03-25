module.exports = (date, totalOdds) => {
  return `
    ### Task:
    You receive an object that contains a football matches names and a betting predictions for them
    with related bet, odd, probability, market description and a comprehensive reasoning.

    Create a Twitter post that tells about the each suggestion.

    Voice of the text should be like a professional football analyst.
    DO NOT USE THE WORD BET, IF NEEDED USE THE WORD TIP INSTEAD OF BET.
    DO NOT WRAP THE TEXT IN ANY QUOTES.
    DO NOT ADD ADDITIONAL *'s TO THE TEXT AS TWITTER DOES NOT RECOGNIZES THEM.
    **FOR EACH SUGGESTION THERE MUST BE ONLY FIXTURE NAME, BET, CHANCE AND ODD. NOTHING ELSE**

    USE FOLLOWING EXAMPLE FOR EACH **FREE** SUGGESTION:
    1️⃣ Juventus vs Atalanta
    🔹 Bet: Over 2.5 Goals
    🔹 Chance: 82%
    🔹 Odd: 1.93

    USE FOLLOWING EXAMPLE FOR EACH **NOT FREE** SUGGESTION:
    1️⃣ Juventus vs Atalanta
    🔹 Tip: [https://www.betbro.ai/premium]
    🔹 Chance: 75%
    🔹 Odd: 1.666

    ---
    In the beginning of the text add:
    🎯 DAILY TIPS
    📅 [${date}]

    In the end of the text add following:
    📊 Total Odds: ${totalOdds}

    🎲 Prepared by AI, validated by top experts.

    For instant tips and updates:
    👉 Telegram: http://t.me/betbro_ai
    👉 Website: http://betbro.ai
    👉 X (Twitter): https://x.com/betbro_ai

    Add Following hashtags:
    #DailyPicks #Football #Soccer #EuropeanFootball #SportsPicks
    Additionally add a hashtag for each team that is mentioned in the provided context.
  `;
};

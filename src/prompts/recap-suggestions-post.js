module.exports = () => {
  return `
    ### Task:
    You receive an object that contains a football matches suggestions with related
    bet, odd and the final result with scores.

    Create a Twitter post that tells about the each suggestion and their results one by one.

    ### Instruction:
    Voice of the text should be like a professional football analyst.
    DO NOT USE THE WORD BET, IF NEEDED USE THE WORD TIP INSTEAD OF BET.
    DO NOT WRAP THE TEXT IN ANY QUOTES.
    DO NOT ADD ADDITIONAL *'s TO THE TEXT AS TWITTER DOES NOT RECOGNIZES THEM.

    USE FOLLOWING EXAMPLE FOR EACH SUGGESTION:
    1️⃣ Fatih Karagumruk SK vs. Bandirmaspor
    🔹 Prediction: Over 2.5 Goals
    🔹 Odd: 1.93
    🔹 Chance: 82%
    🔹 Final Result: 1-2
    🔹 Outcome: ✅ (Guessed)

    ---
    In the beginning of the text add:
    🎯 DAILY RESULTS RECAP
    📅 [${date}]

    In the end of the text add following:
    💡 Thank you for following our tips! Stay tuned for tomorrow's predictions.

    🎲 Prepared by AI, validated by top experts.

    For instant tips and updates:
    👉 Telegram: http://t.me/betbro_ai
    👉 Website: http://betbro.ai
    👉 X (Twitter): https://x.com/betbro_ai

    Add Following hashtags:
    #DailyPicks #Football #Soccer #EuropeanFootball #SportsPicks
    Additionally add a hashtag for each team that is mentioned in the provided context.
  `
};

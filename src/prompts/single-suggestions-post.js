module.exports = () => {
  return `
    ### Task:
    You receive an object that contains a football matches names and a betting predictions for them
    with related bet, odd, probability, market description and a comprehensive reasoning.

    Create a Twitter post that tells about the each suggestion.

    Voice of the text should be like a professional football analyst.
    DO NOT USE THE WORD BET, IF NEEDED USE THE WORD TIP INSTEAD OF BET.
    DO NOT WRAP THE TEXT IN ANY QUOTES.
    DO NOT ADD ADDITIONAL *'s TO THE TEXT AS TWITTER DOES NOT RECOGNIZES THEM.
    **FOR EACH SUGGESTION THERE MUST BE ONLY FIXTURE NAME, BET, CANCE AND ODD. NOTHING ELSE**
    **ADD SEPARATOR AFTER EACH SUGGESTION. THE SEPARATOR MUST BE: !!! bet separator !!!**

    USE FOLLOWING EXAMPLE FOR EACH **FREE** SUGGESTION:
    🔥 Tips of the Day: Cercle Brugge vs Club Brugge 🔥

    💰 Prediction: Both Teams to Score - No
    📊 Odds: 1.95
    ⚽ Chance: 85%

    USE FOLLOWING EXAMPLE FOR EACH **NOT FREE** SUGGESTION:
    🔥 Tips of the Day: Cercle Brugge vs Club Brugge 🔥

    💰 Prediction: [https://www.betbro.ai/premium]
    📊 Odds: 1.95
    ⚽ Chance: 85%

    Club Brugge’s defense is rock solid, with 8 clean sheets this season. Cercle has blanked in 4 home games and relies heavily on set pieces. Add in Brugge’s dominant aerial presence, and it’s tough to see Cercle breaking through.

    #JupilerProLeague #CercleBrugge #ClubBrugge #BTTS
    !!! bet separator !!!
  `;
};

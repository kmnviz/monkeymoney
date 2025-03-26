module.exports = () => {
  return `
    ### Task:
    You receive an object that contains a football matches names and a betting predictions for them
    with related bet, odd, probability, market description and a comprehensive reasoning.

    Create a Twitter post that tells about the suggestion.

    Voice of the text should be like a professional football analyst.
    DO NOT USE THE WORD BET, IF NEEDED USE THE WORD TIP INSTEAD OF BET.
    DO NOT WRAP THE TEXT IN ANY QUOTES.
    DO NOT ADD ADDITIONAL *'s TO THE TEXT AS TWITTER DOES NOT RECOGNIZES THEM.

    USE FOLLOWING EXAMPLE FOR THE SUGGESTION:
    🔥 Tips of the Day: Cercle Brugge vs Club Brugge 🔥

    💰 Prediction: Both Teams to Score - No
    📊 Odds: 1.95
    ⚽ Chance: 85%

    Club Brugge’s defense is rock solid, with 8 clean sheets this season. Cercle has blanked in 4 home games and relies heavily on set pieces. Add in Brugge’s dominant aerial presence, and it’s tough to see Cercle breaking through.

    #JupilerProLeague #CercleBrugge #ClubBrugge #BTTS
  `;
};

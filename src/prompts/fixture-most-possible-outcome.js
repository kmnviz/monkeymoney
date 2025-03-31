module.exports = () => {
  return `
    1. League Importance
    Evaluate the significance of the competition (e.g., league, championship, tournament, cup, friendly) in determining team motivation and performance intensity.

    High-stakes competitions (e.g., title-deciding matches, relegation battles, knockout rounds) impact team strategies significantly.

    Relevant Data Points: "league", "participants.team_name.active_seasons*.leagues"

    2. Season Context
    Identify the phase of the season (early, mid, or late) to understand team objectives and rotation policies.

    Early-season matches may involve tactical experimentation, while late-season matches impact title races, European qualification, and relegation battles.

    Relevant Data Points: "season", "participants.team_name.active_seasons*.starting_at", "participants.team_name.active_seasons*.ending_at"

    3. Venue Influence
    Analyze whether the fixture is played at home, away, or a neutral venue and compare past performances in similar environments.

    Some teams exhibit strong home dominance, while others excel in away settings.

    Relevant Data Points: "venue", "participants.team_name.past_matches*.venue", "head_to_head_matches*.venue"

    4. Match Timing & Player Fatigue
    Compare the match start time with previous fixtures to identify player adaptation challenges due to jet lag or unusual scheduling.

    Time-zone shifts and short recovery periods affect player stamina and tactical execution.

    Relevant Data Points: "starting_at", "participants.team_name.past_matches*.starting_at"

    5. Team & Player Performance Breakdown
    5.1 Home vs. Away Performance
    Determine which team is home vs. away and analyze historical performance trends in both scenarios.

    Evaluate head-to-head data to assess team strengths in specific locations.

    Relevant Data Points: "participants.team_name.location", "participants.team_name.past_matches*.participants*.location"

    5.2 Past Match Analysis
    Compare previous results against similar opponents and match conditions.

    Evaluate past match performances based on match results, key statistics, and event data.

    Key Metrics to Analyze:
    ✔ Match result trends ("participants.team_name.past_matches*.match_result.CURRENT", "match_result.1ST_HALF", "match_result.2ND_HALF")
    ✔ Possession & attacking stats ("Ball Possession %", "Successful Dribbles Percentage")
    ✔ Defensive solidity ("Goals Conceded", "Cleansheets")
    ✔ Set-piece effectiveness ("Corners", "Penalty*.player")
    ✔ Discipline & suspensions ("Yellowcards", "Redcards", "Yellowred Cards")

    5.3 Tactical & Lineup Considerations
    Identify key players and their contributions (goals, assists, defensive actions).

    Analyze lineup consistency (frequent changes vs. stable squads).

    Relevant Data Points: "participants.team_name.lineup*.player_name", "participants.team_name.players*.statistics*", "participants.team_name.players*.statistics*.Appearances", "participants.team_name.players*.statistics*.Lineups"

    6. Upcoming Matches & Motivation Factors
    Assess upcoming fixtures to determine squad rotation risks.

    If a team has a critical match (e.g., Champions League fixture after a league match), they may prioritize squad rotation.

    Relevant Data Points: "participants.team_name.next_matches*.fixture", "participants.team_name.next_matches*.starting_at"

    7. Head-to-Head Performance Trends
    Compare previous direct encounters between both teams.

    Identify historical dominance patterns and recurring match outcomes.

    Relevant Data Points: "head_to_head_matches*.result_info", "head_to_head_matches*.round", "head_to_head_matches*.league", "head_to_head_matches*.starting_at"
  `;
};

// {
//   "id": 0,
//   "league": 0,
//   "season": 0,
//   "venue": 0,
//   "name": 0,
//   "starting_at": 0,
//   "participants.team_name.id": 0,
//   "participants.team_name.location": 0,
//   "participants.team_name.past_matches*.fixture": 0,
//   "participants.team_name.past_matches*.league": 0,
//   "participants.team_name.past_matches*.season": 0,
//   "participants.team_name.past_matches*.round": 0,
//   "participants.team_name.past_matches*.venue": 0,
//   "participants.team_name.past_matches*.starting_at": 0,
//   "participants.team_name.past_matches*.match_result.CURRENT": 0,
//   "participants.team_name.past_matches*.match_result.2ND_HALF": 0,
//   "participants.team_name.past_matches*.match_result.1ST_HALF": 0,
//   "participants.team_name.past_matches*.match_result.2ND_HALF_ONLY": 0,
//   "participants.team_name.past_matches*.participants*.id": 0,
//   "participants.team_name.past_matches*.participants*.name": 0,
//   "participants.team_name.past_matches*.participants*.location": 0,
//   "participants.team_name.past_matches*.participants*.statistics.Ball Possession %": 0,
//   "participants.team_name.past_matches*.participants*.statistics.Corners": 0,
//   "participants.team_name.past_matches*.participants*.statistics.Yellowcards": 0,
//   "participants.team_name.past_matches*.participants*.statistics.Successful Dribbles Percentage": 0,
//   "participants.team_name.past_matches*.participants*.statistics.Goals": 0,
//   "participants.team_name.past_matches*.participants*.events.Yellowcard*.player": 0,
//   "participants.team_name.past_matches*.participants*.events.Yellowcard*.minute": 0,
//   "participants.team_name.past_matches*.participants*.events.Yellowcard*.participant_id": 0,
//   "participants.team_name.past_matches*.participants*.events.Yellowcard*.addition": 0,
//   "participants.team_name.past_matches*.participants*.events.Goal*.player": 0,
//   "participants.team_name.past_matches*.participants*.events.Goal*.minute": 0,
//   "participants.team_name.past_matches*.participants*.events.Goal*.participant_id": 0,
//   "participants.team_name.past_matches*.participants*.events.Goal*.addition": 0,
//   "participants.team_name.past_matches*.participants*.events.Substitution*.player": 0,
//   "participants.team_name.past_matches*.participants*.events.Substitution*.minute": 0,
//   "participants.team_name.past_matches*.participants*.events.Substitution*.participant_id": 0,
//   "participants.team_name.past_matches*.participants*.events.Substitution*.addition": 0,
//   "participants.team_name.past_matches*.participants*.lineups*.name": 0,
//   "participants.team_name.past_matches*.participants*.lineups*.position": 0,
//   "participants.team_name.past_matches*.participants*.coaches.name": 0,
//   "participants.team_name.past_matches*.participants*.statistics.Assists": 0,
//   "participants.team_name.past_matches*.participants*.statistics.Redcards": 0,
//   "participants.team_name.past_matches*.participants*.statistics.Yellowred Cards": 0,
//   "participants.team_name.past_matches*.participants*.events.Yellow/Red card*.player": 0,
//   "participants.team_name.past_matches*.participants*.events.Yellow/Red card*.minute": 0,
//   "participants.team_name.past_matches*.participants*.events.Yellow/Red card*.participant_id": 0,
//   "participants.team_name.past_matches*.participants*.events.Yellow/Red card*.addition": 0,
//   "participants.team_name.past_matches*.participants*.events.Redcard*.player": 0,
//   "participants.team_name.past_matches*.participants*.events.Redcard*.minute": 0,
//   "participants.team_name.past_matches*.participants*.events.Redcard*.participant_id": 0,
//   "participants.team_name.past_matches*.participants*.events.Redcard*.addition": 0,
//   "participants.team_name.past_matches*.participants*.events.Penalty*.player": 0,
//   "participants.team_name.past_matches*.participants*.events.Penalty*.minute": 0,
//   "participants.team_name.past_matches*.participants*.events.Penalty*.participant_id": 0,
//   "participants.team_name.past_matches*.participants*.events.Penalty*.addition": 0,
//   "participants.team_name.past_matches*.participants*.events.Own Goal*.player": 0,
//   "participants.team_name.past_matches*.participants*.events.Own Goal*.minute": 0,
//   "participants.team_name.past_matches*.participants*.events.Own Goal*.participant_id": 0,
//   "participants.team_name.past_matches*.participants*.events.Own Goal*.addition": 0,
//   "participants.team_name.next_matches*.fixture": 0,
//   "participants.team_name.next_matches*.league": 0,
//   "participants.team_name.next_matches*.season": 0,
//   "participants.team_name.next_matches*.round": 0,
//   "participants.team_name.next_matches*.venue": 0,
//   "participants.team_name.next_matches*.starting_at": 0,
//   "participants.team_name.next_matches*.participants*.name": 0,
//   "participants.team_name.next_matches*.participants*.location": 0,
//   "participants.team_name.players*.name": 0,
//   "participants.team_name.players*.date_of_birth": 0,
//   "participants.team_name.players*.height": 0,
//   "participants.team_name.players*.position": 0,
//   "participants.team_name.players*.statistics*.Captain": 0,
//   "participants.team_name.players*.statistics*.Yellowcards": 0,
//   "participants.team_name.players*.statistics*.Goals Conceded": 0,
//   "participants.team_name.players*.statistics*.Minutes Played": 0,
//   "participants.team_name.players*.statistics*.Cleansheets": 0,
//   "participants.team_name.players*.statistics*.team_name Wins": 0,
//   "participants.team_name.players*.statistics*.team_name Draws": 0,
//   "participants.team_name.players*.statistics*.team_name Lost": 0,
//   "participants.team_name.players*.statistics*.Appearances": 0,
//   "participants.team_name.players*.statistics*.Lineups": 0,
//   "participants.team_name.players*.statistics*.Goals": 0,
//   "participants.team_name.players*.statistics*.Assists": 0,
//   "participants.team_name.players*.statistics*.Yellowred Cards": 0,
//   "participants.team_name.players*.statistics*.Redcards": 0,
//   "participants.team_name.players*.statistics*.Own Goals": 0,
//   "participants.team_name.active_seasons*.leagues": 0,
//   "participants.team_name.active_seasons*.name": 0,
//   "participants.team_name.active_seasons*.starting_at": 0,
//   "participants.team_name.active_seasons*.ending_at": 0,
//   "participants.team_name.active_seasons*.standings*.participant": 0,
//   "participants.team_name.active_seasons*.standings*.points": 0,
//   "participants.team_name.active_seasons*.standings*.position": 0,
//   "participants.team_name.lineup*.player_name": 0,
//   "participants.team_name.lineup*.position": 0,
//   "participants.team_name.lineup*.formation": 0,
//   "round.name": 0,
//   "round.fixtures*.name": 0,
//   "round.fixtures*.starting_at": 0,
//   "head_to_head_matches*.league": 0,
//   "head_to_head_matches*.season": 0,
//   "head_to_head_matches*.venue": 0,
//   "head_to_head_matches*.round": 0,
//   "head_to_head_matches*.starting_at": 0,
//   "head_to_head_matches*.result_info": 0
// }

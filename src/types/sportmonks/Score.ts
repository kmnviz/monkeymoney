export type TScore = {
    id: number; // Unique score ID
    fixture_id: number; // Associated fixture ID
    type_id: number; // Type of score (1ST_HALF, 2ND_HALF, etc.)
    participant_id: number; // Team or player ID
    score: {
        goals: number; // Number of goals scored
        participant: "home" | "away"; // Which team scored
    };
    description: string; // Description of score type (e.g., "1ST_HALF", "CURRENT")
};

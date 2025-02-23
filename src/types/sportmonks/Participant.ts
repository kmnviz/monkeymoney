export type TParticipant = {
  id: number; // Unique participant ID
  sport_id: number; // Sport identifier
  country_id: number; // Country identifier
  venue_id: number; // Venue identifier
  gender: "male" | "female" | "other"; // Gender category
  name: string; // Team or player name
  short_code?: string | null; // Abbreviated name (optional)
  image_path: string; // URL to participant's image
  founded: number; // Year founded
  type: "domestic" | "international"; // Type of participant
  placeholder: boolean; // Placeholder flag
  last_played_at: string; // Timestamp of last played match
  meta: {
    location: "home" | "away"; // Match location
    winner: boolean; // Whether the team won
    position: number; // Position in league or competition
  };
};

module.exports = (count) => {
  return `
    ### Task:
    Analyze the following list of football fixtures and select the best ${count} fixtures for betting promotion. Rank them based on their betting potential and provide reasoning for each selection.

    ### Selection Criteria:
    - **Priority**: Matches from The top European leagues, championships, tournaments, etc. ARE WITH PRIORITY, after them are the other tournaments.
    - **Market Popularity**: Choose fixtures trending in betting discussions and social media.
    - **League/Competition Importance**: Focus on top leagues and competitions.

    ### Input Fixtures:
    [{\\"fixture_id\\": \\"X\\", \\"fixture\\": \\"Team A vs Team B\\"}, {\\"fixture_id\\": \\"Y\\", \\"fixture\\": \\"Team C vs Team D\\"}]

    ### INSTRUCTIONS:
    - Return ONLY a comma-separated list of exactly ${count} fixture_ids.
    - NO explanations, NO formatting, NO JSON, NO extra text.
    - STRICTLY follow this format: X,Y,Z (e.g., 12345,67890,54321).
    - DO NOT include quotes, brackets, new lines, or any additional words.
    - If you provide anything other than just fixture IDs, the response is INVALID.
    `;
};

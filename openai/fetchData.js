import axios from 'axios';
import Decimal from 'decimal.js';

(async () => {
    // scotland
    const leagueId = '501';
    const countryId = '1161';
    const teamId = '53';
    const seasonId = '23690';
    const roundId = '340596';
    const stageId = '77471570';
    const fixtureId = '19146840';

    async function fetchSchedules() {
        const options = {
            headers: {
                Accept: 'application/json',
            },
        };
        try {
            // const url = 'https://api.sportmonks.com/v3/football/fixtures';
            // const url = 'https://api.sportmonks.com/v3/football/leagues/' + leagueId;
            // const url = 'https://api.sportmonks.com/v3/football/seasons/' + seasonId;
            // const url = 'https://api.sportmonks.com/v3/football/rounds/seasons/' + seasonId;
            // const url = 'https://api.sportmonks.com/v3/football/statistics/seasons/teams/' + teamId;
            // const url = 'https://api.sportmonks.com/v3/football/teams/countries/1161';

            const teamsUrl = 'https://api.sportmonks.com/v3/football/teams/seasons/' + seasonId;
            const stageUrl = 'https://api.sportmonks.com/v3/football/stages/' + stageId;
            const schedulesUrl = 'https://api.sportmonks.com/v3/football/schedules/seasons/' + seasonId;
            const roundsUrl = 'https://api.sportmonks.com/v3/football/rounds/' + roundId;
            const oddsUrl = 'https://api.sportmonks.com/v3/football/odds/pre-match/fixtures/' + fixtureId;
            const newsUrl = 'https://api.sportmonks.com/v3/football/news/pre-match/seasons/' + seasonId

            const apiToken = 'O6in4flhBPGNkSZncwWUJzQXZP1R5ARwRVYaU5avunP5yAyC7892e60LhqG0';

            // const teamsResponse = await axios.get(`${teamsUrl}?api_token=${apiToken}`, options);
            // console.log(teamsResponse.data.data.map((team) => {
            //     return {
            //         id: team.id,
            //         name: team.name,
            //     };
            // }));

            // const stageResponse = await axios.get(`${stageUrl}?api_token=${apiToken}`, options);
            // console.log(stageResponse.data);

            const schedulesUrlResponse = await axios.get(`${schedulesUrl}?api_token=${apiToken}`, options);
            console.log(schedulesUrlResponse.data.data[0].rounds[23]);

            // const oddsResponse = await axios.get(`${oddsUrl}?api_token=${apiToken}`, options);
            // console.log(oddsResponse.data.data[1]);
            //
            // const formattedOddsResponse = oddsResponse.data.data
            //     .filter((odd) => odd.market_description === 'Correct Score')
            //     .map((odd) => {
            //     return {
            //         market_description: odd.market_description,
            //         label: odd.label,
            //         name: odd.name,
            //         value: odd.value,
            //         probability: odd.probability,
            //     };
            // });
            // console.log(formattedOddsResponse);

            // let answer = 'Here are the odds for Celtic vs Dundee match: ';
            // formattedOddsResponse.forEach((odd) => {
            //     if (odd.label === '1') {
            //         answer += `for correct score ${odd.name} in favour of Home team probability is ${odd.probability} with odd of ${odd.value}; `;
            //     } if (odd.labe === '2') {
            //         answer += `for correct score ${odd.name} in favour of Away team probability is ${odd.probability} with odd of ${odd.value}; `;
            //     } else {
            //         answer += `for correct score ${odd.name} with probability ${odd.probability} with odd of ${odd.value}; `;
            //     }
            // });
            //
            // console.log('answer: ', answer);

            // const hpOdds = oddsResponse.data.data.filter(
            //     (odd) => Decimal(odd.probability.replace('%', '')).gt(84.9)
            //     && Decimal(odd.probability.replace('%', '')).lt(90.1)
            // ).map((odd) => odd.value);
            // console.log(hpOdds);

            // const newsResponse = await axios.get(`${newsUrl}?api_token=${apiToken}`, options);
            // console.log(newsResponse.data);
        } catch (error) {
            console.error('Error fetching schedules:', error);
        }
    }

    await fetchSchedules();
})();

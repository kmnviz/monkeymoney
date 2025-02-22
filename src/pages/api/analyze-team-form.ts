// @ts-nocheck
import type {NextApiRequest, NextApiResponse} from 'next';
import OpenAI from 'openai';
import SportmonksApiClient from '../../services/sportmonksApiClient';
import {ParticipantEnum} from '../../enums/sportmonks';
import {filterSquad, filterStatistics} from '../../filters';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    if (
      !req.body
      || !('teamId' in req.body)
      || !('seasonId' in req.body)
    ) {
      return res.status(422).json({
        message: 'There are required fields',
        fields: {
          teamId: 'X',
          seasonId: 'X',
        },
      });
    }

    try {
      const teamId = +req.body.teamId;
      const seasonId = +req.body.seasonId;
      const sportmonksApiClient = new SportmonksApiClient();
      const team = await sportmonksApiClient.getTeamById(teamId);

      const statistics = await sportmonksApiClient.getSeasonStatisticsByParticipant(ParticipantEnum.Teams, teamId);
      const fStatistics = filterStatistics(statistics, +seasonId);

      const squad = await sportmonksApiClient.getTeamSquadByTeamId(teamId);
      const fSquad = filterSquad(squad);

      for (let i = 0; i < fSquad.length; i++) {
        fSquad[i]['statistics'] = await sportmonksApiClient
          .getSeasonStatisticsByParticipant(ParticipantEnum.Players, fSquad[i]['player_id']);
        fSquad[i]['statistics'] = filterStatistics(fSquad[i]['statistics'], seasonId);
      }

      return res.status(200).json({
        data: {
          team: team,
          statistics: fStatistics,
          squad: fSquad,
        },
      });
    } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({
        message: error.message,
      });
    }
  } else {
    return res.status(405).json({message: 'Method Not Allowed'});
  }
}

import SequelizeTeam from '../database/models/SequelizeTeam';
import SequelizeMatches from '../database/models/SequelizeMatches';
import IMatches from '../Interfaces/Match/IMatches';
import { IMatchesModel } from '../Interfaces/Match/IMatchesModel';

export default class MatchModel implements IMatchesModel {
  private model = SequelizeMatches;

  async findAll(): Promise<IMatches[]> {
    const matches = await this.model.findAll({
      include: [
        {
          model: SequelizeTeam,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: SequelizeTeam,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });

    return matches;
  }

  async findAllQuery(query: boolean): Promise<IMatches[]> {
    const matches = await this.model.findAll({
      where: {
        inProgress: query,
      },
      include: [
        {
          model: SequelizeTeam,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: SequelizeTeam,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],

    });

    return matches;
  }
}

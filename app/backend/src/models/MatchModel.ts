import SequelizeTeam from '../database/models/SequelizeTeam';
import SequelizeMatches from '../database/models/SequelizeMatches';
import IMatches, { UpdateMatch } from '../Interfaces/Match/IMatches';
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

  async findById(id: number): Promise<IMatches | null> {
    const match = await this.model.findOne({
      where: {
        id,
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

    return match;
  }

  async update(id: number, data: UpdateMatch): Promise<IMatches | null> {
    const [updated] = await this.model.update(data, {
      where: {
        id,
      },
    });

    if (updated === 0) return null;
    return this.findById(id);
  }
}

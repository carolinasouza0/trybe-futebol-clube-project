import { IMatchesModel } from '../Interfaces/Match/IMatchesModel';
import IMatches, { UpdateTeamsGoals } from '../Interfaces/Match/IMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';
import { ITeamsModel } from '../Interfaces/Team/ITeamsModel';

export default class MatchService {
  constructor(
    private matchesModel: IMatchesModel = new MatchModel(),
    private teamsModel: ITeamsModel = new TeamModel(),
  ) {}

  async getAllMatches(query: string): Promise<ServiceResponse<IMatches[]>> {
    if (query) {
      const matches = await this.matchesModel.findAllQuery(query === 'true');
      return {
        status: 'SUCCESSFUL',
        data: matches,
      };
    }
    const matches = await this.matchesModel.findAll();
    return {
      status: 'SUCCESSFUL',
      data: matches,
    };
  }

  async finishMatch(id: IMatches['id']): Promise<ServiceResponse<{ message: string }>> {
    const match = await this.matchesModel.findById(id);
    if (!match) {
      return {
        status: 'NOT_FOUND',
        data: { message: `Match ${id} not found` },
      };
    }
    const matchToUpdate = { inProgress: false };
    const updatedMatch = await this.matchesModel.update(id, matchToUpdate);
    if (!updatedMatch) {
      return {
        status: 'CONFLICT',
        data: { message: `Match ${id} could not be updated` },
      };
    }
    return { status: 'SUCCESSFUL',
      data: { message: 'Finished' },
    };
  }

  async updateMatch(id: IMatches['id'], match: UpdateTeamsGoals):
  Promise<ServiceResponse<{ message: string, match: IMatches }>> {
    const foundMatch = await this.matchesModel.findById(id);

    if (!foundMatch) {
      return {
        status: 'NOT_FOUND',
        data: { message: `Match ${id} not found` },
      };
    }
    const updatedMatch = await this.matchesModel.update(id, match);
    if (!updatedMatch) {
      return { status: 'CONFLICT',
        data: { message: `Match ${id} could not be updated` },
      };
    }
    return { status: 'SUCCESSFUL',
      data: { message: 'Updated', match: updatedMatch },
    };
  }

  async createMatch(match: IMatches): Promise<ServiceResponse<IMatches>> {
    if (match.homeTeamId === match.awayTeamId) {
      return { status: 'UNPROCESSABLE_ENTITY',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }

    const foundTeam = await this.teamsModel.findTeams(match.homeTeamId, match.awayTeamId);
    if (foundTeam.length !== 2) {
      return { status: 'NOT_FOUND',
        data: { message: 'There is no team with such id!' } };
    }

    const createdMatch = await this.matchesModel.create({ ...match, inProgress: true });
    return { status: 'CREATED',
      data: createdMatch,
    };
  }
}

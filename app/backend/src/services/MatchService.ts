import { IMatchesModel } from '../Interfaces/Match/IMatchesModel';
import IMatches from '../Interfaces/Match/IMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchModel from '../models/MatchModel';

export default class MatchService {
  constructor(
    private matchesModel: IMatchesModel = new MatchModel(),
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
}

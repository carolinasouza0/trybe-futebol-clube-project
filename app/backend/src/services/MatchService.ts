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
}

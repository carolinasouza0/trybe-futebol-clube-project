import { IMatchesModel } from '../Interfaces/Match/IMatchesModel';
import IMatches from '../Interfaces/Match/IMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchModel from '../models/MatchModel';

export default class MatchService {
  constructor(
    private matchesModel: IMatchesModel = new MatchModel(),
  ) {}

  async getAllMatches(): Promise<ServiceResponse<IMatches[]>> {
    const matches = await this.matchesModel.findAll();
    return {
      status: 'SUCCESSFUL',
      data: matches,
    };
  }
}

// import { NewEntity } from 'src/Interfaces';
import TeamModel from '../models/TeamModel';
import ITeams from '../Interfaces/Team/ITeams';
import { ITeamsModel } from '../Interfaces/Team/ITeamsModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatchesModel } from '../Interfaces/Match/IMatchesModel';
import MatchModel from '../models/MatchModel';
// import IMatches from '../Interfaces/Match/IMatches';

export default class TeamService {
  constructor(
    private teamModel: ITeamsModel = new TeamModel(),
    private matchesModel: IMatchesModel = new MatchModel(),
  ) {}

  public async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const teams = await this.teamModel.findAll();
    return {
      status: 'SUCCESSFUL',
      data: teams,
    };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<ITeams | null>> {
    const team = await this.teamModel.findById(id);
    if (!team) {
      return {
        status: 'NOT_FOUND',
        data: { message: `Team ${id} not found` },
      };
    }
    return {
      status: 'SUCCESSFUL',
      data: team,
    };
  }
}

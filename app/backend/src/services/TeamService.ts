// import { NewEntity } from 'src/Interfaces';
import TeamModel from '../models/TeamModel';
import ITeams from '../Interfaces/Team/ITeams';
import { ITeamsModel } from '../Interfaces/Team/ITeamsModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamService {
  constructor(
    private teamModel: ITeamsModel = new TeamModel(),
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

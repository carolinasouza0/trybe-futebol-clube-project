import SequelizeTeam from '../database/models/SequelizeTeam';
import ITeams from '../Interfaces/Team/ITeams';
import { ITeamsModel } from '../Interfaces/Team/ITeamsModel';
// import { NewEntity } from '../Interfaces';

export default class TeamModel implements ITeamsModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeams[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async findById(id: number): Promise<ITeams | null> {
    const team = await this.model.findByPk(id);
    return team;
  }
}

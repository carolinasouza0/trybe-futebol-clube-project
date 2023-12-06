import ITeams from './ITeams';

export interface ITeamsModel {
  findAll(): Promise<ITeams[]>;
  findById(id: number): Promise<ITeams | null>;
  findTeams(teamId1: number, teamId2: number): Promise<ITeams[]>;
}

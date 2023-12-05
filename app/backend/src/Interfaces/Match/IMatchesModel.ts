import IMatches from './IMatches';

export interface IMatchesModel {
  findAll(): Promise<IMatches[]>;
  findAllQuery(query: boolean): Promise<IMatches[]>;
}

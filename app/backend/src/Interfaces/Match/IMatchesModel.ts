import { NewEntity } from '..';
import IMatches, { UpdateMatch } from './IMatches';

export interface IMatchesModel {
  findAll(): Promise<IMatches[]>;
  findAllQuery(query: boolean): Promise<IMatches[]>;
  findById(id: number): Promise<IMatches | null>;
  update(id: number, data: UpdateMatch): Promise<IMatches | null>;
  create(match: NewEntity<IMatches>): Promise<IMatches>;
}

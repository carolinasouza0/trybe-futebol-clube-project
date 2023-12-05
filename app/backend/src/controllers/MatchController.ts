import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(
    private matchService: MatchService = new MatchService(),
  ) {}

  async getAllMatches(req: Request, res: Response): Promise<void> {
    const { status, data } = await this.matchService.getAllMatches();
    res.status(mapStatusHTTP(status)).json(data);
  }
}

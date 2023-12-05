import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(
    private matchService: MatchService = new MatchService(),
  ) {}

  async getAllMatches(req: Request, res: Response): Promise<void> {
    const inProgress = req.query.inProgress as string;
    const { status, data } = await this.matchService.getAllMatches(inProgress);
    res.status(mapStatusHTTP(status)).json(data);
  }
}

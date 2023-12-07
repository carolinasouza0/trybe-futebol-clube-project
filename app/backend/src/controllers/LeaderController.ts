import { Request, Response } from 'express';
import LeaderService from '../services/LeaderService';

export default class LeaderController {
  constructor(
    private leaderService: LeaderService = new LeaderService(),
  ) { }

  public async getHomeLeaderBoard(req: Request, res: Response) {
    const leaderBoard = await this.leaderService.getHomeMatches();
    res.status(200).json(leaderBoard);
  }
}
import { Request, Response, Router } from 'express';
import LeaderController from '../controllers/LeaderController';

const router = Router();

const leaderController = new LeaderController();

router.get('/home', (req: Request, res: Response) => leaderController.getHomeLeaderBoard(req, res));

export default router;

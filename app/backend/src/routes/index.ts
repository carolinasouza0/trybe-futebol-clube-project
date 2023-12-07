import { Router } from 'express';
import teamRouter from './TeamRoutes';
import loginRouter from './LoginRoutes';
import matchRouter from './MatchRoutes';
import leaderRouter from './LeaderRoutes';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', loginRouter);
router.use('/matches', matchRouter);
router.use('/leaderboard', leaderRouter);

export default router;

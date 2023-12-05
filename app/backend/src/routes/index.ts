import { Router } from 'express';
import teamRouter from './TeamRoutes';
import loginRouter from './LoginRoutes';
import matchRouter from './MatchRoutes';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', loginRouter);
router.use('/matches', matchRouter);

export default router;

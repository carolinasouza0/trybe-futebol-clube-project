import { Router } from 'express';
import teamRouter from './TeamRoutes';
import loginRouter from './LoginRoutes';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', loginRouter);

export default router;

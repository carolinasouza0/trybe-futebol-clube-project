import { Router } from 'express';
import teamRouter from './TeamRoutes';

const router = Router();

router.use('/teams', teamRouter);

export default router;

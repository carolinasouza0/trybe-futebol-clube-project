import { Router, Response, Request } from 'express';
import MatchController from '../controllers/MatchController';
import AuthValidate from '../middlewares/AuthToken';

const router = Router();

const matchController = new MatchController();

router.get('/', (req: Request, res: Response) => matchController.getAllMatches(req, res));
router.patch(
  '/:id/finish',
  AuthValidate.validateToken,

  (req: Request, res: Response) => matchController.finishMatch(req, res),
);
router.patch(
  '/:id',
  AuthValidate.validateToken,

  (req: Request, res: Response) => matchController.updateMatch(req, res),
);

export default router;

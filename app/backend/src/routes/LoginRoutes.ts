import { Router, Request, Response } from 'express';

import LoginController from '../controllers/LoginController';
import {
  validateEmailAndPassword, validateFields } from '../middlewares/validations/LoginValidations';

const loginController = new LoginController();

const router = Router();

router.post(
  '/',
  validateFields,
  validateEmailAndPassword,
  (req: Request, res: Response) => loginController.login(req, res),
);

export default router;

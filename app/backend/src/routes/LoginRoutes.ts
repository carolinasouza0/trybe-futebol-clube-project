import { Router, Request, Response } from 'express';

import LoginController from '../controllers/LoginController';
import {
  validateEmailAndPassword, validateFields } from '../middlewares/validations/LoginValidations';
import AuthValidate from '../middlewares/AuthToken';
import UserController from '../controllers/UserController';

const loginController = new LoginController();
const userController = new UserController();

const router = Router();

router.post(
  '/',
  validateFields,
  validateEmailAndPassword,
  (req: Request, res: Response) => loginController.login(req, res),
);

router.get(
  '/role',
  AuthValidate.validateToken,
  (req: Request, res: Response) => userController.findByRole(req, res),
);

export default router;

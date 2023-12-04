import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LoginService from '../services/LoginService';

export default class LoginController {
  constructor(private loginService: LoginService = new LoginService()) { }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const { status, data } = await this.loginService.login(email, password);
    return res.status(mapStatusHTTP(status)).json(data);
  }
}

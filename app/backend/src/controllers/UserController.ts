import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import UserService from '../services/UserService';

export default class UserController {
  constructor(
    private _userService: UserService = new UserService(),
  ) { }

  async findByRole(req: Request, res: Response) {
    const { id } = res.locals.payload;

    const { status, data } = await this._userService.findByRole(id);
    return res.status(mapStatusHTTP(status)).json({ role: data });
  }
}

import * as bcrypt from 'bcryptjs';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { TokenPayload } from '../Interfaces/Login/Payload';
import Token from '../Interfaces/Login/Token';
import { IUserModel } from '../Interfaces/User/IUserModel';
import jwtUtil from '../utils/jwtUtil';
import UserModel from '../models/UserModel';

export default class LoginService {
  constructor(private userModel: IUserModel = new UserModel()) { }

  public async login(email: string, password: string): Promise<ServiceResponse<Token>> {
    const user = await this.userModel.findByEmail(email);
    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const tokenPayload: TokenPayload = { id: user.id, username: user.username };
    const token = jwtUtil.sign(tokenPayload);

    return { status: 'SUCCESSFUL', data: { token } };
  }
}

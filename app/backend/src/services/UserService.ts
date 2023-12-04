import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IUser from '../Interfaces/User/IUser';
import { IUserModel } from '../Interfaces/User/IUserModel';
import UserModel from '../models/UserModel';

export default class UserService {
  constructor(private _userModel: IUserModel = new UserModel()) { }

  public async findByRole(id: IUser['id']): Promise<ServiceResponse<string>> {
    const user = await this._userModel.findById(id);
    if (!user) {
      return { status: 'NOT_FOUND', data: { message: `User ${id} not found` } };
    }

    return { status: 'SUCCESSFUL', data: user.role };
  }
}

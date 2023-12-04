import IUser from '../Interfaces/User/IUser';
import { IUserModel } from '../Interfaces/User/IUserModel';
import SequelizeUser from '../database/models/SequelizeUser';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }

  async findById(id: IUser['id']): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { id } });
    return user;
  }
}

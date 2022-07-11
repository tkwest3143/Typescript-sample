import ServerAccessr from '../../server/request/request';
import { UserModel } from '../model';

export class RegisterService {
  private accesser = new ServerAccessr();
  async doRegister(
    username: string,
    password: string,
    mail_address: string
  ): Promise<UserModel> {
    const userResponse = await this.accesser.doRegister(
      username,
      password,
      mail_address
    );

    return {
      user_id: userResponse.user_id,
      username: userResponse.user_id,
      password: userResponse.password,
      email: userResponse.email,
    };
  }
}

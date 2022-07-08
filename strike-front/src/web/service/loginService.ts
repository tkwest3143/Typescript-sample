import ServerAccessr from '../../server/request/request';
import { UserModel } from '../model';

export class LoginService {
  private accesser = new ServerAccessr();
  async doLogin(username: string, password: string): Promise<UserModel> {
    const userResponse = await this.accesser.doLogin(username, password);

    return {
      user_id: userResponse.user_id,
      username: userResponse.user_id,
      password: userResponse.password,
      email: userResponse.email,
    };
  }
}

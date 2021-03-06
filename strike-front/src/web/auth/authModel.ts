import { UserModel } from '../model';

export class AuthModel {
  authUser: UserModel | null = null;

  isAuth(): boolean {
    return this.authUser !== null;
  }
}

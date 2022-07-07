import { BaseData } from './base/baseData';

export class LoginData implements BaseData {
  userName: string;
  password: string;
  constructor(userName: string, password: string) {
    this.userName = userName;
    this.password = password;
  }
}

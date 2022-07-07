import { BaseData } from './data/base/baseData';
import { LoginData } from './data/loginData';

export type requestType = {
  url: string;
  method: string;
};

export const REQUEST: { [name: string]: requestType } = {
  login: {
    url: '/doLogin',
    method: 'post',
  },
};

import axios, { AxiosRequestHeaders } from 'axios';
import { ApplicationProperty } from '../../constant';
import { RegisterData, LoginData } from '../data/request';
import { GetNewsData } from '../data/request/newsData';
import { LoginResponse } from '../data/response';
import { NewsResponse } from '../data/response/NewsResponse';
import { SuccesResponse } from '../data/response/SuccessResponse';
import { ServerConstant } from '../serverConstant';

const SERVER_DOMAIN = ApplicationProperty.serverUrl;

export default class ServerAccessr {
  private async request<BODY, RESPONSE>(
    method: string,
    url: string,
    body: BODY,
    headers?: AxiosRequestHeaders
  ): Promise<RESPONSE> {
    return await axios
      .request({ method, url, data: body, headers })
      .then((res) => {
        return res.data as RESPONSE;
      })
      .catch((error) => {
        throw error;
      });
  }
  async doLogin(username: string, password: string): Promise<LoginResponse> {
    const body: LoginData = {
      username,
      password,
    };

    return await this.request<LoginData, LoginResponse>(
      ServerConstant.DoLogin.method,
      SERVER_DOMAIN + ServerConstant.DoLogin.url,
      body
    );
  }
  async doRegister(
    username: string,
    password: string,
    mail_address: string
  ): Promise<LoginResponse> {
    const body: RegisterData = {
      username,
      password,
      mail_address,
    };
    return await this.request<RegisterData, LoginResponse>(
      ServerConstant.DoRegister.method,
      SERVER_DOMAIN + ServerConstant.DoRegister.url,
      body
    );
  }
  async upload(files: File[]): Promise<SuccesResponse> {
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      // iの箇所の名前を使用して、ファイルを抽出する
      data.append(`upload`, files[i]);
    }
    const headers = { 'content-type': 'multipart/form-data' };
    return await this.request<FormData, SuccesResponse>(
      ServerConstant.Upload.method,
      SERVER_DOMAIN + ServerConstant.Upload.url,
      data,
      headers
    );
  }

  async getNewsData(userId: string): Promise<NewsResponse> {
    const body: GetNewsData = {
      user_id: userId,
    };

    return await this.request<GetNewsData, NewsResponse>(
      ServerConstant.GetNewsData.method,
      SERVER_DOMAIN + ServerConstant.GetNewsData.url,
      body
    );
  }
}

import axios, { AxiosError, AxiosResponse } from 'axios';
import { Setting } from '../../electron/process/model/setting';

export class ApiTestService {
  save(
    title: string,
    url: string,
    method: string,
    parameters: { key: string; value: string }[]
  ) {
    console.log('start save');
    const setting: Setting = { title, url, method, parameters };
    window.myAPI.registerSetting(setting);
  }
  update(
    id: string,
    title: string,
    url: string,
    method: string,
    parameters: { key: string; value: string }[]
  ) {
    const setting: Setting = { id: Number(id), title, url, method, parameters };
    console.log('start update');
    window.myAPI.updateSetting(setting);
  }
  async getAllSetting() {
    try {
      const res: Setting[] = await window.myAPI.getAllSetting();
      return res;
    } catch (error) {
      throw error;
    }
  }
  async apiSend(
    url: string,
    method: string,
    parameters: { key: string; value: string }[]
  ): Promise<AxiosResponse> {
    let jsonData: string = '';
    parameters.forEach((param) => {
      jsonData = `${jsonData}"${param.key}":"${param.value}",`;
    });
    jsonData = `{${jsonData.slice(0, -1)}}`;
    try {
      const res = await axios.request({
        method,
        url,
        data: JSON.parse(jsonData),
      });
      res as AxiosResponse;
      return res;
    } catch (err) {
      const res = (err as AxiosError).response;
      if (!res) {
        throw err;
      }
      return res;
    }
  }
}

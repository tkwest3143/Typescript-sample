import axios from 'axios';

export class ApiTestService {
  save(
    title: string,
    url: string,
    method: string,
    parameters: { key: string; value: string }[]
  ) {
    const body = { title, url, method, parameters };
    console.log('start save');
    axios
      .post('api-test/save', body)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getAllSetting() {
    return axios
      .get('api-test/getAllSettings')
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }
  apiSend(
    url: string,
    method: string,
    parameters: { key: string; value: string }[]
  ) {
    let jsonData: string = '';
    parameters.forEach((param) => {
      jsonData = `${jsonData}"${param.key}":"${param.value}",`;
    });
    jsonData = `{${jsonData.slice(0, -1)}}`;

    console.log(jsonData);
    console.log(JSON.parse(jsonData));
    return axios
      .request({
        method,
        url,
        data: JSON.parse(jsonData),
      })
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }
}

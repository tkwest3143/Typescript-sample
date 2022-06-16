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
      .then((req) => {
        console.log(req);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

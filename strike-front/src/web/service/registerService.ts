import axios from 'axios';

export class RegisterService {
  async doRegister(username: string, password: string, mail_address: string) {
    const body = {
      username,
      password,
      mail_address,
    };
    await axios
      .post('http://localhost:8080/doRegister', body)
      .then((res) => {
        console.log(res);
        alert(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

import axios from 'axios';

export class LoginService {
  async doLogin(username: string, password: string) {
    const body = {
      username,
      password,
    };
    await axios
      .post('/doLogin', body)
      .then((res) => {
        alert(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

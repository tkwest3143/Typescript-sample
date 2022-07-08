import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { LoginService } from "../../service/loginService";
import { RegisterService } from "../../service/registerService";

function Register() {
  const [form, setForm] = useState<RegisterForm>({
    username: "",
    password: "",
    mail_addresss: "",
  });
  type RegisterForm = {
    username: string;
    password: string;
    mail_addresss: string;
  };
  const service = new RegisterService();

  const handleChangeUsername = (val: string) => {
    setForm({
      username: val,
      password: form.password,
      mail_addresss: form.mail_addresss,
    });
  };

  const handleChangePassword = (val: string) => {
    setForm({
      username: form.username,
      password: val,
      mail_addresss: form.mail_addresss,
    });
  };
  const handleChangeMailAddress = (val: string) => {
    setForm({
      username: form.username,
      password: form.password,
      mail_addresss: val,
    });
  };
  const handleLoginClick = () => {
    service.doRegister(form.username, form.password, form.mail_addresss);
  };
  return (
    <div>
      <Box color="primary">
        <h2>Register</h2>
      </Box>
      <TextField
        required
        id="username"
        label="username"
        value={form.username}
        onChange={(event) => handleChangeUsername(event.target.value)}
      />
      <TextField
        required
        id="password"
        type="password"
        label="password"
        value={form.password}
        onChange={(event) => handleChangePassword(event.target.value)}
      />
      <TextField
        required
        id="email"
        type="email"
        label="email"
        value={form.mail_addresss}
        onChange={(event) => handleChangeMailAddress(event.target.value)}
      />
      <Box>
        <Button onClick={handleLoginClick}>登録</Button>
      </Box>
    </div>
  );
}

export default Register;

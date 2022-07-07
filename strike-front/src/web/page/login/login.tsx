import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { LoginService } from "../../service/loginService";

function Login() {
  const [form] = useState<LoginForm>({
    username: "",
    password: "",
  });
  type LoginForm = {
    username: string;
    password: string;
  };

  const service = new LoginService();

  const handleLoginClick = () => {
    service.doLogin(form.username, form.password);
  };
  return (
    <div>
      <Box color="primary">
        <h2>LOGIN</h2>
      </Box>
      <TextField
        required
        id="username"
        label="username"
        value={form.username}
      />
      <TextField
        required
        id="password"
        type="password"
        label="password"
        value={form.password}
      />
      <Button onClick={handleLoginClick}>ログイン</Button>
    </div>
  );
}

export default Login;

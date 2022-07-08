import { Box, Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/auth";
import { AuthModel } from "../../auth/authModel";
import { LoginService } from "../../service/loginService";

function Login() {
  const authModel = useContext(AuthContext);
  let navigate = useNavigate();
  let location = useLocation();
  const [form, setForm] = useState<LoginForm>({
    username: "",
    password: "",
  });
  type LoginForm = {
    username: string;
    password: string;
  };
  const service = new LoginService();

  const handleChangeUsername = (val: string) => {
    setForm({
      username: val,
      password: form.password,
    });
  };

  const handleChangePassword = (val: string) => {
    setForm({
      username: form.username,
      password: val,
    });
  };
  const handleLoginClick = async () => {
    const userModel = await service.doLogin(form.username, form.password);
    let model = authModel.authData ? authModel.authData : new AuthModel();
    console.log(model);
    model.authUser = userModel;
    authModel.setAuthData(model);

    navigate("/register");
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
      <Box>
        <Button onClick={handleLoginClick}>ログイン</Button>
      </Box>
    </div>
  );
}

export default Login;

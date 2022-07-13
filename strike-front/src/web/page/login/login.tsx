import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/auth";
import { AuthModel } from "../../auth/authModel";
import { LoginService } from "../../service/loginService";
import MessageService from "../../service/messageService";

function Login() {
  const authModel = useContext(AuthContext);
  let navigate = useNavigate();
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
    model.authUser = userModel;
    authModel.setAuthData(model);

    navigate("/top");
  };
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            <h2>{MessageService.Messages.menu.login}</h2>
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              fullWidth
              required
              margin="normal"
              id="username"
              label="username"
              value={form.username}
              onChange={(event) => handleChangeUsername(event.target.value)}
              autoFocus
            />
            <TextField
              fullWidth
              required
              margin="normal"
              id="password"
              type="password"
              label="password"
              value={form.password}
              onChange={(event) => handleChangePassword(event.target.value)}
            />
            <Box>
              <Button onClick={handleLoginClick}>
                {MessageService.Messages.text.login}
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Login;

import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import MessageService from "../../service/messageService";
import { RegisterService } from "../../service/registerService";
import { AppRegistration as AppRegistrationIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/auth";
function Register() {
  const authModel = useContext(AuthContext);
  const navigate = useNavigate();
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
  const handleRegisterClick = async () => {
    try {
      await service.doRegister(
        form.username,
        form.password,
        form.mail_addresss
      );
    } catch (e) {
      alert(`${MessageService.Messages.alert.registration_failure}`);
      return;
    }

    navigate("/login");
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
            <AppRegistrationIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            <h2>{MessageService.Messages.title.register}</h2>
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
            <TextField
              fullWidth
              required
              margin="normal"
              id="email"
              type="email"
              label="email"
              value={form.mail_addresss}
              onChange={(event) => handleChangeMailAddress(event.target.value)}
            />
            <Box>
              <Button onClick={handleRegisterClick}>
                {MessageService.Messages.text.register}
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Register;

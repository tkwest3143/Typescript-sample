import { Box, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import MessageService from "../../service/messageService";
import { AuthContext } from "../../auth/auth";
import { useNavigate } from "react-router-dom";
function Top() {
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState<{ userId: string; username: string }>({
    userId: "",
    username: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!authContext.authData || !authContext.authData.authUser) {
      navigate("/login");
      return;
    }
    setUser({
      userId: authContext.authData.authUser.user_id,
      username: authContext.authData.authUser.username,
    });
  }, []);

  return (
    <div>
      <Box color="primary" sx={{ display: "inline-flex" }}>
        <Typography gutterBottom variant="h5" component="div">
          {MessageService.Messages.welcome} {user.username}{" "}
        </Typography>
      </Box>
    </div>
  );
}

export default Top;

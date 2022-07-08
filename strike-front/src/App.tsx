import "./App.css";
import Header from "./web/page/header/header";
import Router from "./web/router/router";
import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { AuthContext } from "./web/auth/auth";
import { useState } from "react";
import { AuthModel } from "./web/auth/authModel";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const [authData, setAuthData] = useState<AuthModel | null>(null);
  const value = {
    authData,
    setAuthData,
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AuthContext.Provider value={value}>
        <Box className="App">
          <Box className="header">
            <Header />
          </Box>
          <Box className="main-content">
            <Router />
          </Box>
        </Box>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;

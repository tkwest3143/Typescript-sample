import "./App.css";
import Header from "./web/page/header/header";
import Router from "./web/router/router";
import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box className="App">
        <Box className="header">
          <Header />
        </Box>
        <Box className="main-content">
          <Router />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;

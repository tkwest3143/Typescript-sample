import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { HashRouter } from "react-router-dom";
import "./App.css";
import Header from "./common/header/header";
import Router from "./router";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <HashRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="App">
          <div className="header">
            <Header />
          </div>
          <div className="main-content">
            <Router />
          </div>
        </div>
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;

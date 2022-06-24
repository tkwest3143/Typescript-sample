import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./common/header/header";
import Router from "./router";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="header">
          <Header />
        </div>
        <div className="main-content">
          <Router />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import { Route, Routes } from "react-router-dom";
import ApiTest from "./api-test/apiTest";
import Home from "./home/home";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/api-test" element={<ApiTest />} />
    </Routes>
  );
}
export default Router;

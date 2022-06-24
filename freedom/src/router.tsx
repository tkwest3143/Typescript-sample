import React from "react";
import { Route, Routes } from "react-router-dom";
import ApiTest from "./test/api-test/apiTest";
import Config from "./config/config";
import Home from "./home/home";
import CodeTest from "./test/code-test/codeTest";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/api-test" element={<ApiTest />} />
      <Route path="/code-test" element={<CodeTest />} />
      <Route path="/setting-file" element={<Config />} />
    </Routes>
  );
}
export default Router;

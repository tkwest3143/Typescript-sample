import { BrowserRouter, Route, Routes } from "react-router-dom";
import ApiTest from "./api-test/apiTest";
import Header from "./common/header/header";
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

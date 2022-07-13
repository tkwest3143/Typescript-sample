import { Route, Routes } from "react-router-dom";
import { AuthRoute } from "../auth/auth";
import Login from "../page/login/login";
import Register from "../page/register/register";
import Top from "../page/top/top";
import Upload from "../page/upload/upload";
function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<AuthRoute element={<Register />} />} />
      <Route path="/file-upload" element={<AuthRoute element={<Upload />} />} />
      <Route path="/top" element={<AuthRoute element={<Top />} />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
}
export default Router;

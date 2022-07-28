import { Route, Routes } from "react-router-dom";
import { views } from "../../constant/applicationView";
import { AuthRoute } from "../auth/auth";
function Router() {
  return (
    <Routes>
      {Object.values(views).map((v) => {
        console.log(v.path);
        if (v.type === "auth") {
          return <Route path={v.path} element={v.component} />;
        }
        return (
          <Route path={v.path} element={<AuthRoute element={v.component} />} />
        );
      })}
    </Routes>
  );
}
export default Router;

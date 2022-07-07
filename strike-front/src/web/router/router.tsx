import { Route, Routes } from "react-router-dom";
import { MENU_ITEMS } from "../../constant";
function Router() {
  return (
    <Routes>
      {MENU_ITEMS.map((item, _index) => (
        <Route path={item.path} element={item.element} />
      ))}
    </Routes>
  );
}
export default Router;

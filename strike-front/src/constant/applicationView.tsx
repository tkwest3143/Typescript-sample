import Login from "../web/page/login/login";
import Upload from "../web/page/upload/upload";
import Calendar from "../web/page/management/calendar";
import News from "../web/page/news/news";
import Register from "../web/page/register/register";
import { paths } from "./path";

export const views: { [name: string]: view_type } = {
  root: {
    path: paths.root,
    type: "non_auth",
    component: <Login />,
  },
  file_upload: {
    path: paths.root,
    type: "auth",
    component: <Upload />,
  },
  login: {
    path: paths.login,
    type: "non_auth",
    component: <Login />,
  },
  register: {
    path: paths.register,
    type: "non_auth",
    component: <Register />,
  },
  news: {
    path: paths.news,
    type: "auth",
    component: <News />,
  },
  calendar: {
    path: paths.calendar,
    type: "auth",
    component: <Calendar />,
  },
  setting: {
    path: paths.setting,
    type: "auth",
    component: <Upload />,
  },
  profile: {
    path: paths.profile,
    type: "auth",
    component: <Login />,
  },
};
export type view_type = {
  path: string;
  discription?: string;
  type: "auth" | "non_auth";
  component: JSX.Element;
};

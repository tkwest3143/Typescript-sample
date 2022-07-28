import MessageService from "../web/service/messageService";
import {
  Login as LoginIcon,
  FileUpload as FileUploadIcon,
  Newspaper as NewspaperIcon,
  Settings as SettingsIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import { paths } from "./path";
export const MENU_ITEMS: menu[] = [
  {
    title: MessageService.Messages.title.file_upload,
    path: paths.file_upload,
    type: "auth",
    icon: <FileUploadIcon />,
  },
  {
    title: MessageService.Messages.title.login,
    path: paths.login,
    type: "non_auth",
    icon: <LoginIcon />,
  },
  {
    title: MessageService.Messages.title.news,
    path: paths.news,
    type: "auth",
    icon: <NewspaperIcon />,
  },
];
export const SETTING_MENU_ITEMS: menu[] = [
  {
    title: MessageService.Messages.title.setting,
    path: paths.setting,
    type: "auth",
    icon: <SettingsIcon />,
  },
  {
    title: MessageService.Messages.title.profile,
    path: paths.profile,
    type: "auth",
    icon: <AccountCircleIcon />,
  },
];
export type menu = {
  title: string;
  path: string;
  discription?: string;
  icon: any;
  type: "auth" | "non_auth";
};
export const category = {};

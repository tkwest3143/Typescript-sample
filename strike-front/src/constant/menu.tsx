import MessageService from "../web/service/messageService";
import {
  Login as LoginIcon,
  FileUpload as FileUploadIcon,
} from "@mui/icons-material";
export const MENU_ITEMS: menu[] = [
  {
    title: MessageService.Messages.menu.file_upload,
    path: "/file-upload",
    type: "auth",
    icon: <FileUploadIcon />,
  },
  {
    title: MessageService.Messages.menu.login,
    path: "/login",
    type: "non_auth",
    icon: <LoginIcon />,
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

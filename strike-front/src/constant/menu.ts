import Login from '../web/page/login/login';
import Upload from '../web/page/upload/upload';

export const MENU_ITEMS: menu[] = [
  {
    title: 'file upload',
    path: '/file-upload',
    element: Upload(),
  },
  {
    title: 'login',
    path: '/login',
    element: Login(),
  },
];
export type menu = {
  title: string;
  path: string;
  discription?: string;
  element: JSX.Element;
};
export const category = {};

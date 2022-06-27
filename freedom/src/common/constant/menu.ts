export const MENU_ITEMS: menu[] = [
  {
    title: 'api-test',
    path: '/api-test',
  },
  {
    title: 'memo',
    path: '/memo',
  },
];
export type menu = {
  title: string;
  path: string;
  discription?: string;
};

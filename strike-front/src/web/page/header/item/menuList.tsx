import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { menu } from "../../../../constant";

type MenuItemProp = {
  menuitems: menu[];
  isAuth: boolean;
  openOrCloseClick: React.MouseEventHandler<HTMLAnchorElement>;
  openOrCloseKeyDown: React.KeyboardEventHandler<HTMLAnchorElement>;
};
export default function MenuList(props: MenuItemProp) {
  return (
    <List>
      {props.menuitems.map((item, _index) => {
        const menuItem = (
          <ListItem key={item.title} disablePadding>
            <ListItemButton
              to={item.path}
              component={Link}
              onClick={props.openOrCloseClick}
              onKeyDown={props.openOrCloseKeyDown}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        );
        if (props.isAuth) {
          if (item.type === "auth") {
            return menuItem;
          }
        } else {
          if (item.type === "non_auth") {
            return menuItem;
          }
        }
        return <Box />;
      })}
    </List>
  );
}

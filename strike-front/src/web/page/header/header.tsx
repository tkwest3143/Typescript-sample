import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Login as LoginIcon,
  Close as CloseIcon,
  DensityMediumSharp as DensityMediumSharpIcon,
} from "@mui/icons-material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import {
  ApplicationProperty,
  MENU_ITEMS,
  SETTING_MENU_ITEMS,
} from "../../../constant";
import { AuthContext } from "../../auth/auth";
import MenuList from "./item/menuList";

type HeaderState = {
  configAnchorEl: null | HTMLElement;
  drawerOpen: boolean;
};
function Header() {
  const authContext = useContext(AuthContext);
  const [state, setState] = useState<HeaderState>({
    configAnchorEl: null,
    drawerOpen: false,
  });
  const configOpen = Boolean(state.configAnchorEl);
  const handleConfigClick = (event: React.MouseEvent<HTMLElement>) => {
    setState({ ...state, configAnchorEl: event.currentTarget });
  };
  const handleConfigClose = () => {
    setState({ ...state, configAnchorEl: null });
  };

  const toggleDrawer =
    (drawerOpen: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, drawerOpen });
    };

  const authMenu = () => {
    if (authContext.authData.authUser) {
      return (
        <Box sx={{ marginLeft: "auto", marginRight: 0 }}>
          <Button
            id="basic-button"
            aria-controls={configOpen ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={configOpen ? "true" : undefined}
            onClick={handleConfigClick}
            className="right-btn-area"
            color="inherit"
          >
            {authContext.authData.authUser.username}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={state.configAnchorEl}
            open={configOpen}
            onClose={handleConfigClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleConfigClose}>
              <MenuList
                menuitems={SETTING_MENU_ITEMS}
                isAuth={authContext.authData.isAuth()}
                openOrCloseClick={toggleDrawer(false)}
                openOrCloseKeyDown={toggleDrawer(false)}
              />
            </MenuItem>
          </Menu>
        </Box>
      );
    }
    return (
      <Box sx={{ marginLeft: "auto", marginRight: 0 }}>
        <Button to="/login" component={Link} color="inherit">
          <LoginIcon />
        </Button>
      </Box>
    );
  };

  const menuList = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <MenuList
        menuitems={MENU_ITEMS}
        isAuth={authContext.authData.isAuth()}
        openOrCloseClick={toggleDrawer(false)}
        openOrCloseKeyDown={toggleDrawer(false)}
      />
      <Divider />
      <ListItem disablePadding>
        <ListItemButton
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <ListItemIcon>
            <CloseIcon />
          </ListItemIcon>
          <ListItemText primary="Close" />
        </ListItemButton>
      </ListItem>
    </Box>
  );
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Button onClick={toggleDrawer(true)} color="inherit">
              <DensityMediumSharpIcon />
            </Button>
            <Drawer open={state.drawerOpen} onClose={toggleDrawer(false)}>
              {menuList()}
            </Drawer>
            <Button
              variant="text"
              aria-label="Home"
              to={authContext.authData.isAuth() ? "/top" : "/login"}
              component={Link}
              color="inherit"
            >
              <Typography variant="h4" component="h3">
                {ApplicationProperty.applicationName}
              </Typography>
            </Button>
            <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
            {authMenu()}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default Header;

import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  List,
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
  Settings as SettingsIcon,
} from "@mui/icons-material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { ApplicationProperty, MENU_ITEMS } from "../../../constant";
import { AuthContext } from "../../auth/auth";

function Header() {
  const authContext = useContext(AuthContext);
  const [configAnchorEl, setConfigAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const configOpen = Boolean(configAnchorEl);
  const handleConfigClick = (event: React.MouseEvent<HTMLElement>) => {
    setConfigAnchorEl(event.currentTarget);
  };
  const handleConfigClose = () => {
    setConfigAnchorEl(null);
  };

  const [state, setState] = useState({
    open: false,
  });

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, open });
    };
  const authMenu = () => {
    if (authContext && authContext.authData && authContext.authData.authUser) {
      return (
        <Box sx={{ marginLeft: "auto", marginRight: 0 }}>
          <Button
            id="basic-button"
            aria-controls={configOpen ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={configOpen ? "true" : undefined}
            onClick={handleConfigClick}
            className="right-btn-area"
          >
            {authContext.authData.authUser.username}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={configAnchorEl}
            open={configOpen}
            onClose={handleConfigClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleConfigClose}>
              <Button to="/setting-file" component={Link}>
                <SettingsIcon />
              </Button>
            </MenuItem>
          </Menu>
        </Box>
      );
    }
    return (
      <Box sx={{ marginLeft: "auto", marginRight: 0 }}>
        <Button to="/login" component={Link}>
          <LoginIcon />
        </Button>
      </Box>
    );
  };

  const list = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {MENU_ITEMS.map((item, index) => {
          const isAuth =
            authContext &&
            authContext.authData &&
            authContext.authData.authUser;
          const menuItem = (
            <ListItem key={item.title} disablePadding>
              <ListItemButton
                to={item.path}
                component={Link}
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          );
          if (isAuth) {
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
      <Divider />
      <List>
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
      </List>
    </Box>
  );
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Button onClick={toggleDrawer(true)}>
              <DensityMediumSharpIcon />
            </Button>
            <Drawer open={state["open"]} onClose={toggleDrawer(false)}>
              {list()}
            </Drawer>
            <Button variant="text" aria-label="Home" to="/" component={Link}>
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

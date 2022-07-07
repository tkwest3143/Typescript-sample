import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  Fade,
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
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import CloseIcon from "@mui/icons-material/Close";
import DensityMediumSharpIcon from "@mui/icons-material/DensityMediumSharp";
import SettingsIcon from "@mui/icons-material/Settings";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { application_name, MENU_ITEMS } from "../../../constant";

function Header() {
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

  const list = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {MENU_ITEMS.map((item, index) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton
              to={item.path}
              component={Link}
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
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
        <AppBar position="static" color="primary">
          <Toolbar>
            <Button onClick={toggleDrawer(true)}>
              <DensityMediumSharpIcon />
            </Button>
            <Drawer open={state["open"]} onClose={toggleDrawer(false)}>
              {list()}
            </Drawer>
            <Button variant="text" aria-label="Home" to="/" component={Link}>
              <Typography variant="h4" component="h3">
                {application_name}
              </Typography>
            </Button>
            <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
            <Button
              sx={{ marginLeft: "auto", marginRight: 0 }}
              id="basic-button"
              aria-controls={configOpen ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={configOpen ? "true" : undefined}
              onClick={handleConfigClick}
              className="right-btn-area"
            >
              <SettingsIcon />
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
                  About Setting File
                </Button>
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default Header;

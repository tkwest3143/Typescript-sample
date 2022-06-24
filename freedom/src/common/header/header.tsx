import {
  AppBar,
  Box,
  Button,
  createTheme,
  Divider,
  Fade,
  Menu,
  MenuItem,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2",
      },
    },
  });
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Button
                variant="text"
                aria-label="Home"
                to="/"
                color="success"
                component={Link}
              >
                <Typography variant="h4" component="h3">
                  FREEDOM
                </Typography>
              </Button>
              <Divider
                flexItem
                orientation="vertical"
                sx={{ mx: 0.5, my: 1 }}
              />
              <Button
                color="success"
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                Test
              </Button>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={handleClose}>
                  <Button to="/api-test" color="success" component={Link}>
                    API test
                  </Button>
                </MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default Header;

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import NavDrawer from "./NavDrawer";
import ToggleTheme from "../shared/ToggleTheme";
import { Container, Divider, Stack } from "@mui/material";
import UserMenu from "../shared/UserMenu";

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
  children: React.ReactNode;
}

export default function DashboardWrapper(props: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        elevation={0}
        color="inherit"
        position="fixed"
        sx={{
          backgroundColor: (theme) => theme.palette.background.paper,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <Stack
            direction="row"
            width="100%"
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <ToggleTheme />
              <UserMenu />
            </Stack>
          </Stack>
        </Toolbar>
        <Divider />
      </AppBar>

      <NavDrawer
        mobileOpen={mobileOpen}
        setIsClosing={setIsClosing}
        setMobileOpen={setMobileOpen}
      />

      <Box
        component="main"
        sx={{
          height: "calc( 100vh )",
          overflowY: "auto",
          backgroundColor: (theme) => theme.palette.background.default,
          flexGrow: 1,
          p: { xs: 1, md: 3 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Container maxWidth="md">{props.children}</Container>
      </Box>
    </Box>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  AdminPanelSettings,
  Analytics,
  CardTravelSharp,
  Discount,
  Feedback,
  Settings,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import UpgradeToPro from "../shared/UpgradeToPro";
import { useAppSelector } from "@/store/hooks";

const navItems = [
  {
    title: "Analytics",
    icon: <Analytics />,
    href: "analytics",
    access: "USER",
  },
  {
    title: "Card",
    icon: <CardTravelSharp />,
    href: "card",
    access: "USER",
  },
  {
    title: "Offers",
    icon: <Discount />,
    href: "offers",
    access: "USER",
  },
  {
    title: "Enquiries",
    icon: <Feedback />,
    href: "enquiries",
    access: "USER",
  },
  {
    title: "Settings",
    icon: <Settings />,
    href: "settings",
    access: "USER",
  },
  {
    title: "Admin",
    icon: <AdminPanelSettings />,
    href: "admin",
    access: "ADMIN",
  },
];

const drawerWidth = 240;
const NavDrawer = ({
  setIsClosing,
  setMobileOpen,
  mobileOpen,
}: {
  setIsClosing: React.Dispatch<React.SetStateAction<boolean>>;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mobileOpen: boolean;
}) => {
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split("/")[1];
  const { user } = useAppSelector((state) => state.auth);
  console.log(user);
  // Remove this const when copying and pasting into your project.

  const drawer = (
    <div>
      <Stack
        px={2}
        sx={{ height: 64 }}
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
      >
        <Typography
          variant="h6"
          color="primary"
          fontWeight={700}
          noWrap
          component="div"
        >
          BharatBiz
        </Typography>
      </Stack>
      {/* <Toolbar /> */}
      <Divider />
      <Stack
        sx={{ height: "calc(100vh - 68px)" }}
        justifyContent="space-between"
      >
        <List>
          {navItems
            .filter((n) => n.access === user.role || n.access === "USER")
            .map((Item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  onClick={() => navigate(`/${Item.href}`)}
                  selected={currentPath === Item.href}
                >
                  <ListItemIcon color="primary">{Item.icon}</ListItemIcon>
                  <ListItemText primary={Item.title} />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
        <Stack>
          <UpgradeToPro />
        </Stack>
      </Stack>
    </div>
  );
  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            borderRadius: 0,
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            borderRadius: 0,
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default NavDrawer;

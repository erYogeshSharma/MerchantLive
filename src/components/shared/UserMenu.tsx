import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../store/auth/auth-slice";
import { log_out } from "../../api";

import RandomAvatar from "./RandomAvatar";
import { clearAppData } from "@/store/app/app-slice";
export default function UserMenu() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const { data } = await log_out();
      dispatch(clearAppData());
      localStorage.clear();
      dispatch(signOut());
      navigate("/login");
      console.log(data.message);
    } catch (error) {
      localStorage.clear();
      console.log(error);
    }
  };
  return (
    <div>
      <Stack
        sx={{ cursor: "pointer" }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="subtitle2" fontWeight={500} color="text.primary">
            {user.name}
          </Typography>
          {user.profilePicUrl ? (
            <Avatar src={user.profilePicUrl} sx={{ height: 50, width: 50 }}>
              {user.name[0].toUpperCase()}
            </Avatar>
          ) : (
            <RandomAvatar size={50} name={user.name} />
          )}
        </Stack>
      </Stack>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => navigate("/settings?tab=profile")}>
          My account
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

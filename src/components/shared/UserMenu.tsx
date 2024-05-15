import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../store/auth/auth-slice";
import { log_out } from "../../api";

export default function UserMenu() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const { data } = await log_out();
      console.log(data.message);
    } catch (error) {
      console.log(error);
    }
    localStorage.removeItem("token");
    dispatch(signOut());
    navigate("/login");
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
          <Avatar src={user.profilePicUrl}>
            {user.name.charAt(0).toUpperCase()}
          </Avatar>
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
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

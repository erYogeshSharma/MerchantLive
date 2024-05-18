import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton, Tooltip } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

type Props = {
  icon?: React.ReactNode;
  label?: string;
  onOptionClick: (option: string) => void;
  items: { title: string; value: string }[];
};

export default function ButtonMenu(props: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Tooltip arrow title={props.label || "Menu"}>
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          {props.icon ? props.icon : <MenuIcon />}
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {props.items.map((item, index) => (
          <MenuItem
            key={index}
            value={item.value}
            onClick={() => props.onOptionClick(item.value)}
          >
            {item.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

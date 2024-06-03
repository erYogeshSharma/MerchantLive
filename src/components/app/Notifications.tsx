import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Divider, IconButton, Stack, Tooltip } from "@mui/material";
import { Notifications } from "@mui/icons-material";
import moment from "moment";
import RandomAvatar from "../shared/RandomAvatar";

const notifications = [
  {
    type: "Enquiry",
    title: "New Enquiry form  Jack ",
    time: "2024-05-18T11:29:01.730+00:00",
  },
  {
    type: "Card View",
    title: "Sarah Lee viewed your business card",
    time: "2024-05-21T14:30:15.000+00:00",
  },
  {
    type: "Connection",
    title: "You're now connected with Michael Brown",
    time: "2024-05-20T16:12:43.210+00:00",
  },
  {
    type: "Review",
    title: "John Doe left you a 5-star review!",
    time: "2024-05-19T09:45:00.000+00:00",
  },
  {
    type: "Reminder",
    title: "Follow up with David regarding the project",
    time: "2024-05-22T10:00:00.000+00:00", // Set a future time for reminder
  },
];

export default function BasicPopover() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Tooltip title="Notifications" arrow>
        {/* <Badge badgeContent={10} color="warning"> */}
        <IconButton aria-describedby={id} onClick={handleClick}>
          <Notifications />
        </IconButton>
        {/* </Badge> */}
      </Tooltip>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Stack p={2} spacing={2}>
          <Typography variant="h6">Notifications </Typography>
          <Stack divider={<Divider />} spacing={1}>
            {notifications.map((notification, index) => (
              <Stack
                direction="row"
                alignItems="flex-start"
                key={index}
                spacing={1}
              >
                <RandomAvatar name={`James ${index}`} />
                <Stack key={notification.title} alignItems="flex-start">
                  <Typography variant="body2">{notification.title}</Typography>
                  <Stack alignItems="flex-end">
                    <Typography variant="caption" color="text.secondary">
                      {moment(notification.time).format("DD MMM YY, hh:mm A")}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Popover>
    </div>
  );
}

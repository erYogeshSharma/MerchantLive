import { Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  IconButton,
  Popover,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const DeleteConfirmModal = ({
  loading,
  handleDelete,
}: {
  loading?: boolean;
  handleDelete: () => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

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
      <Tooltip title="Delete">
        <IconButton
          size="small"
          color="error"
          aria-describedby={id}
          onClick={handleClick}
        >
          <Delete />
        </IconButton>
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
        <Stack width={300} px={2} py={1}>
          <Typography sx={{ p: 2 }}>Are you sure</Typography>
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button onClick={handleClose} variant="outlined" size="small">
              Cancel
            </Button>
            <LoadingButton
              onClick={handleDelete}
              loading={loading}
              variant="contained"
              size="small"
            >
              Yes
            </LoadingButton>
          </Stack>
        </Stack>
      </Popover>
    </div>
  );
};

export default DeleteConfirmModal;

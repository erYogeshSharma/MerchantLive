import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Divider, IconButton, Stack } from "@mui/material";
import { Close } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 1,
};

export default function DrawerContainer({
  open,
  handleClose,
  footer,
  children,
  label,
}: {
  open: boolean;
  handleClose: () => void;
  footer?: React.ReactNode;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Stack
            px={2}
            py={1}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography fontWeight={600}>{label}</Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Stack>
          <Divider />

          {/* content of modal */}
          {children}

          {footer && (
            <Stack>
              {footer}
              {/* footer */}
            </Stack>
          )}
        </Box>
      </Fade>
    </Modal>
  );
}

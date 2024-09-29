import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 2,
};

type ModalProps = {
  open: boolean;
  handleClose: () => void;
  userToEdit: string;
};
const EditUser = ({ open, handleClose, userToEdit }: ModalProps) => {
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
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Edit User
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            Edit User Details {userToEdit}
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
};

export default EditUser;

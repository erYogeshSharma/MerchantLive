import { LoadingButton } from "@mui/lab";
import ModalContainer from "../wrappers/ModalContainer";
import { Button, Divider, Stack, Typography } from "@mui/material";

type ConfirmModalProps = {
  open: boolean;
  handleClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  yesText?: string;
  noText?: string;
  loading?: boolean;
};
const ConfirmAction = (props: ConfirmModalProps) => {
  const Footer = (
    <Stack p={2} direction="row" justifyContent="flex-end" spacing={2}>
      <LoadingButton
        loading={props.loading}
        onClick={props.onConfirm}
        variant="contained"
        color="primary"
      >
        {props.yesText || "Yes"}
      </LoadingButton>
      <Button onClick={props.handleClose} variant="outlined">
        {props.noText || "No"}
      </Button>
    </Stack>
  );
  return (
    <ModalContainer
      label={props.title}
      handleClose={props.handleClose}
      open={props.open}
      footer={Footer}
    >
      <Stack>
        <Stack p={2}>
          <Typography>{props.message}</Typography>
        </Stack>
        <Divider />
      </Stack>
    </ModalContainer>
  );
};

export default ConfirmAction;

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  Alert,
  Backdrop,
  Box,
  Fade,
  Grow,
  IconButton,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import ImageUploadButton from "../shared/ImageUploadButton";
import { LoadingButton } from "@mui/lab";

import {
  closeOfferModal,
  updateOfferForm,
} from "@/store/business/business-slice";
import moment from "moment";
import {
  createBusinessOffer,
  updateBusinessOffer,
} from "@/store/business/business-api";
import { DatePicker } from "@mui/x-date-pickers";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90vw", sm: 500 },

  boxShadow: 24,
};

const CreateOfferModal = () => {
  const dispatch = useAppDispatch();
  const { offerForm, openOfferModal } = useAppSelector(
    (state) => state.business
  );

  const [error, setError] = useState("");
  const { savingOffer } = useAppSelector((state) => state.business);

  /* -------------------------------------------------------------------------- */
  /*                                 FORM INPUTS                                */
  /* -------------------------------------------------------------------------- */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleChange(e: any) {
    dispatch(updateOfferForm({ [e.target.name]: e.target.value }));
  }

  /* -------------------------------------------------------------------------- */
  /*                                 CLOSE MODAL                                */
  /* -------------------------------------------------------------------------- */
  const handleClose = () => {
    dispatch(closeOfferModal());
  };

  //handle save
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleSave(e: any) {
    e.preventDefault();

    if (!offerForm.image) {
      setError("Please select a image for the offer.");
    }
    if (offerForm._id) {
      dispatch(
        updateBusinessOffer({
          _id: offerForm._id,
          title: offerForm.title,
          description: offerForm.description,
          image: offerForm.image,
          startsOn: moment(offerForm.startsOn).toISOString(),
          endsOn: moment(offerForm.endsOn).toISOString(),
        })
      );
    } else {
      dispatch(
        createBusinessOffer({
          title: offerForm.title,
          description: offerForm.description,
          startsOn: offerForm.startsOn,
          endsOn: offerForm.endsOn,
          image: offerForm.image,
        })
      );
    }
  }

  //close the modal if form Created
  useEffect(() => {
    if (!savingOffer) {
      dispatch(closeOfferModal());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savingOffer]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openOfferModal}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={openOfferModal}>
        <Box sx={style}>
          <Paper>
            <Stack p={2} spacing={2}>
              <Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h6" component="h2">
                    {
                      // eslint-disable-next-line no-nested-ternary
                      offerForm._id
                        ? "Edit Offer"
                        : offerForm._id === ""
                        ? "Create a offer"
                        : ""
                    }
                  </Typography>
                  <IconButton onClick={handleClose}>
                    <CloseOutlined />
                  </IconButton>
                </Stack>
                <Typography variant="body2">
                  Visiter will see this offer on your business card
                </Typography>
              </Stack>
              <form onSubmit={handleSave}>
                <Stack spacing={2}>
                  <Stack alignItems="center">
                    <ImageUploadButton
                      name={offerForm.title}
                      label="Offer Image"
                      image={offerForm.image}
                      onChange={(image) =>
                        dispatch(updateOfferForm({ image: image }))
                      }
                    />
                  </Stack>
                  <TextField
                    required
                    name="title"
                    value={offerForm.title}
                    label="Offer Name"
                    size="small"
                    inputProps={{ maxLength: 50 }}
                    helperText={`${offerForm.title.length}/50`}
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    name="description"
                    onChange={handleChange}
                    value={offerForm.description}
                    size="small"
                    label="Offer Description"
                    multiline
                    minRows={4}
                    maxRows={5}
                    inputProps={{ maxLength: 200 }}
                    helperText={`${offerForm.description.length}/200`}
                  />
                  <Stack
                    spacing={2}
                    width="100%"
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <DatePicker
                      label="Start On"
                      value={moment(offerForm.startsOn)}
                      slotProps={{ textField: { size: "small" } }}
                      onChange={(newValue: moment.MomentInput) =>
                        dispatch(
                          updateOfferForm({
                            startsOn: moment(newValue).toISOString(),
                          })
                        )
                      }
                    />
                    <DatePicker
                      label="Ends On"
                      value={moment(offerForm.endsOn)}
                      slotProps={{ textField: { size: "small" } }}
                      onChange={(newValue: moment.MomentInput) =>
                        dispatch(
                          updateOfferForm({
                            endsOn: moment(newValue).toISOString(),
                          })
                        )
                      }
                    />
                  </Stack>
                  {error && (
                    <Grow in={error.length > 0}>
                      <Alert severity="error"> {error}</Alert>
                    </Grow>
                  )}
                </Stack>
              </form>
              <Stack alignItems="flex-end">
                <LoadingButton
                  type="submit"
                  loading={savingOffer}
                  variant="contained"
                  onClick={handleSave}
                >
                  Save
                </LoadingButton>
              </Stack>
            </Stack>
          </Paper>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CreateOfferModal;

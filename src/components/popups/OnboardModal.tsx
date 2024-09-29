import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleOnboardModal } from "../../store/app/app-slice";
import {
  Alert,
  Backdrop,
  Box,
  Fade,
  FormControl,
  FormHelperText,
  Grow,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CloseOutlined, Verified, Error } from "@mui/icons-material";
import { Industries } from "../../constants/industry";
import ImageUploadButton from "../shared/ImageUploadButton";
import { get_linkId_availability } from "../../api";
import { createCard } from "../../store/business-form/business-form-api";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90vw", sm: 400 },

  boxShadow: 24,
};

const OnboardModal = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    logo: "",
    name: "",
    linkId: "",
    category: "",
  });

  const [error, setError] = useState("");
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const { openOnboardModal } = useAppSelector((state) => state.app);
  const { saving } = useAppSelector((state) => state.businessForm);
  const createdForm = useAppSelector((state) => state.businessForm.form);

  /* -------------------------------------------------------------------------- */
  /*                                 FORM INPUTS                                */
  /* -------------------------------------------------------------------------- */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleChange(e: any) {
    if (e.target.name === "linkId") {
      setForm((pf) => ({
        ...pf,
        [e.target.name]: e.target.value.replace(" ", "-"),
      }));
      return;
    }
    setForm((pf) => ({ ...pf, [e.target.name]: e.target.value }));
  }

  /* -------------------------------------------------------------------------- */
  /*                                 CLOSE MODAL                                */
  /* -------------------------------------------------------------------------- */
  const handleClose = () => {
    localStorage.setItem("onboard_shown", "true");
    dispatch(toggleOnboardModal(false));
  };

  /* -------------------------------------------------------------------------- */
  /*                           CHECK LINK AVAILABILITY                           */
  /* -------------------------------------------------------------------------- */
  async function checkAvailability() {
    try {
      setCheckingAvailability(true);
      await get_linkId_availability(form.linkId);
      setIsAvailable(true);
      setCheckingAvailability(false);
    } catch (error) {
      setCheckingAvailability(false);
      setIsAvailable(false);
    }
  }
  //Check link availability on form change
  useEffect(() => {
    if (openOnboardModal && form.linkId) {
      checkAvailability();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.linkId]);

  //recommend linkId on name change
  useEffect(() => {
    setForm((pf) => ({
      ...pf,
      linkId: form.name.toLowerCase().replace(/\s/g, "-"),
    }));
  }, [form.name]);

  //handle save
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleSave(e: any) {
    e.preventDefault();

    if (!form.linkId) {
      setError("Business Id is required");
    }
    if (!form.logo) {
      setError("Logo is required");
    }
    if (!form.name) {
      setError("Business Name is required");
    }
    if (!form.category) {
      setError("Category is required");
    }
    if (!isAvailable) {
      return;
    }
    dispatch(createCard(form));
  }

  //close the modal if form Created
  useEffect(() => {
    if (createdForm._id && !saving) {
      dispatch(toggleOnboardModal(false));
      navigate(`/card/edit`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createdForm]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openOnboardModal}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={openOnboardModal}>
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
                    Create you business card
                  </Typography>
                  <IconButton onClick={handleClose}>
                    <CloseOutlined />
                  </IconButton>
                </Stack>
                <Typography variant="body2">
                  Let's get you first business started
                </Typography>
              </Stack>
              <form onSubmit={handleSave}>
                <Stack spacing={2}>
                  <Stack alignItems="center">
                    <ImageUploadButton
                      name={form.name}
                      label="Select Logo"
                      image={form.logo}
                      onChange={(logo) => setForm((pf) => ({ ...pf, logo }))}
                    />
                  </Stack>
                  <TextField
                    name="name"
                    value={form.name}
                    label="Business Name"
                    size="small"
                    inputProps={{ maxLength: 40 }}
                    helperText={`${form.name.length}/40`}
                    onChange={handleChange}
                  />
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={form.category}
                      label="Category"
                      name="category"
                      onChange={handleChange}
                    >
                      {Industries.map((i) => (
                        <MenuItem value={i} key={i}>
                          {i}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Stack>
                    <TextField
                      name="linkId"
                      onChange={handleChange}
                      value={form.linkId}
                      size="small"
                      label="Business Id"
                      inputProps={{ maxLength: 30 }}
                      helperText={`${form.name.length}/30`}
                    />
                    {checkingAvailability && <LinearProgress />}
                    {form.linkId && (
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        {isAvailable ? (
                          <Verified color="success" fontSize="small" />
                        ) : (
                          <Error color="error" fontSize="small" />
                        )}
                        <FormHelperText>
                          {isAvailable
                            ? `${form.linkId} is available`
                            : `${form.linkId} is no available`}
                        </FormHelperText>
                      </Stack>
                    )}
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
                  loading={saving}
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

export default OnboardModal;

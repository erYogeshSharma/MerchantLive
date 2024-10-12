import { User } from "@/types/admin";
import {
  Backdrop,
  Box,
  Button,
  Divider,
  Fade,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Modal,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers";
import { CloseOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { update_user_plan } from "@/api";
import { useAppDispatch } from "@/store/hooks";
import { updateUserPlan } from "@/store/admin/admin-slice";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 500 },
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 2,
};

type ModalProps = {
  open: boolean;
  handleClose: () => void;
  userToEdit: User;
};
const EditUser = ({ open, handleClose, userToEdit }: ModalProps) => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState(userToEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setUser(userToEdit);
  }, [userToEdit]);

  function handlePlanExtend(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const endDate = moment(user.plan_end_date);
    if (value === "6m") {
      setUser((prevUser) => ({ ...prevUser, plan_end_date: endDate.add(6, "months").toISOString() }));
    } else {
      setUser((prevUser) => ({ ...prevUser, plan_end_date: endDate.add(1, "year").toISOString() }));
    }
  }

  async function saveUser() {
    try {
      setSaving(true);
      const { data } = await update_user_plan({
        _id: user._id,
        is_paid_plan: user.is_paid_plan,
        plan_end_date: user.plan_end_date,
      });
      dispatch(updateUserPlan(data.data));
      setSaving(false);
      toast.success("User saved successfully");
      handleClose();
    } catch (error) {
      toast.error("Failed to save user");
    }
  }
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
          {/* HEADER */}

          <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
            <Stack>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Manage User Plan
              </Typography>
              <Typography id="transition-modal-title" variant="caption" component="h2">
                Activate, deactivate or extend plan for {userToEdit.name}.
              </Typography>
            </Stack>
            <IconButton onClick={handleClose}>
              <CloseOutlined />
            </IconButton>
          </Stack>
          <Divider />
          <Stack spacing={1} mt={1}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="body1" fontWeight={600}>
                {" "}
                Payment Done ?
              </Typography>
              <Switch
                onChange={(e) => setUser((prevUser) => ({ ...prevUser, is_paid_plan: e.target.checked ? "ACTIVE" : "INACTIVE" }))}
                checked={user.is_paid_plan == "ACTIVE"}
              />
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="body1" fontWeight={600}>
                PLan Expiry Date
              </Typography>
              <DatePicker
                label="From Date"
                value={moment(user.plan_end_date || new Date())}
                // maxDate={moment(new Date()).add(1, "year")}
                slotProps={{ textField: { size: "small" } }}
                onChange={(newValue) => setUser((prevUser) => ({ ...prevUser, plan_end_date: moment(newValue).toISOString() }))}
              />
            </Stack>
            <Stack>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  <Typography variant="body1" fontWeight={600}>
                    Extend Plan By
                  </Typography>
                </FormLabel>
                <RadioGroup onChange={handlePlanExtend} row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                  <FormControlLabel value="6m" control={<Radio />} label="6 Moths" />
                  <FormControlLabel value="1y" control={<Radio />} label="1 Year" />
                </RadioGroup>
              </FormControl>
            </Stack>
          </Stack>
          <Stack spacing={2} direction="row" alignItems="center" justifyContent="flex-end">
            <Button variant="outlined">Cancel</Button>
            <LoadingButton loading={saving} onClick={saveUser} variant="contained">
              Save Changes
            </LoadingButton>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default EditUser;

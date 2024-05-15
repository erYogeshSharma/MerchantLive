import CompleteImage from "../../assets/Completed-bro.svg";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";

//whatsapp link
//
import { useAppSelector } from "../../store/hooks";
const Review = () => {
  const { form } = useAppSelector((state) => state.businessForm);
  return (
    <Stack alignItems="center">
      <Stack width="40%">
        <img
          style={{ maxWidth: "100%", maxHeight: "100%" }}
          src={CompleteImage}
          alt="form complete"
        />
      </Stack>
      {/* <Typography variant="h6">Completed</Typography>
      <Typography variant="body2" color="text.secondary">
        Thank you for submitting your business card
      </Typography> */}
      <Stack width="100%">
        <FormGroup>
          <Typography variant="h6">Review Settings</Typography>
          <FormControlLabel
            checked={form.enableAppointmentForm}
            control={<Checkbox defaultChecked />}
            label="Enable Appointment Booking"
          />
          <FormControlLabel
            checked={form.enableEnquiryForm}
            control={<Checkbox />}
            label="Enable Enquiry Form"
          />
        </FormGroup>
      </Stack>
    </Stack>
  );
};

export default Review;

import { Checkbox, FormControlLabel, FormGroup, Stack } from "@mui/material";

//whatsapp link
//
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import PhoneMockup from "../shared/PhoneMockup";
import ThemeSelector from "../shared/ThemeSelector";
import { update_settings } from "../../api";
import { updateForm } from "../../store/business-form/business-form-slice";
import { useState } from "react";
const Review = () => {
  const dispatch = useAppDispatch();
  const [updatingTheme, setUpdatingTheme] = useState(false);
  const { form } = useAppSelector((state) => state.businessForm);

  async function handleTheme(theme: string) {
    try {
      setUpdatingTheme(true);
      await update_settings({
        _id: form._id,
        theme,
      });
      setTimeout(() => {
        dispatch(updateForm({ theme }));
        setUpdatingTheme(false);
      }, 2000);
    } catch (error) {
      setUpdatingTheme(false);
      console.log(error);
    }
  }
  return (
    <Stack
      direction={{ xs: "column-reverse", sm: "row" }}
      justifyContent="center"
      spacing={{ xs: 1, md: 3 }}
    >
      <PhoneMockup
        theme={form.theme}
        src={`https://id.bharatbizportal.com/${form.linkId}`}
      />
      <Stack key={form.theme} spacing={2}>
        <ThemeSelector
          loading={updatingTheme}
          value={form.theme}
          onClick={handleTheme}
        />
        <Stack width="100%">
          <FormGroup>
            <FormControlLabel
              checked={form.enableEnquiryForm}
              control={
                <Checkbox
                  onChange={(e) =>
                    dispatch(
                      updateForm({ enableEnquiryForm: e.target.checked })
                    )
                  }
                />
              }
              label="Enable Enquiry Form"
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              checked={form.enableAppointmentForm}
              control={
                <Checkbox
                  onChange={(e) =>
                    dispatch(
                      updateForm({ enableAppointmentForm: e.target.checked })
                    )
                  }
                />
              }
              label="Show business hours"
            />
          </FormGroup>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Review;

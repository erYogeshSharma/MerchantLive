import { Alert, Button, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setActiveStep,
  setErrors,
} from "../../store/business-form/business-form-slice";
import { validateForm } from "./validateForm";
import { LoadingButton } from "@mui/lab";
import {
  createCard,
  updateCard,
} from "../../store/business-form/business-form-api";
import { useParams } from "react-router-dom";

const FormNav = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { form, activeStep, saving } = useAppSelector(
    (state) => state.businessForm
  );

  console.log(activeStep);

  const isEdit = params.id === form?._id;

  function handleNext() {
    const { isValid, errors } = validateForm(activeStep, form);
    if (!isValid) {
      dispatch(setErrors(errors));
      return;
    } else {
      if (isEdit) {
        dispatch(updateCard({ step: activeStep, form }));
      } else {
        dispatch(createCard(form));
      }
    }
  }
  function handleBack() {
    if (activeStep === 0) return;
    dispatch(setActiveStep(activeStep - 1));
  }
  return (
    <Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Button disabled={saving} variant="outlined" onClick={handleBack}>
          Back
        </Button>
        <LoadingButton
          loading={saving}
          variant="contained"
          onClick={handleNext}
        >
          Next
        </LoadingButton>
      </Stack>
    </Stack>
  );
};

export default FormNav;

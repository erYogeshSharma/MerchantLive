import { green, yellow } from "@mui/material/colors";
import { useAppSelector } from "../../store/hooks";
import { Stack, Step, StepButton, Stepper } from "@mui/material";

const FormSteps = () => {
  const { steps, activeStep, completedSteps } = useAppSelector((state) => state.businessForm);
  return (
    <Stack sx={{ maxWidth: "100%", overflowX: "hidden", overflowY: "hidden" }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step
            sx={{
              "& .MuiStepLabel-root .Mui-completed": {
                color: green[500], // circle color (COMPLETED)
              },
              "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel": {
                color: "grey.500", // Just text label (COMPLETED)
              },
              "& .MuiStepLabel-root .Mui-active": {
                color: yellow[900],
                fill: yellow[900],

                // circle color (ACTIVE)
              },
              "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel": {
                color: "common.white", // Just text label (ACTIVE)
              },
              "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                fill: "white",
                fontWeight: 600, // circle's number (ACTIVE)
              },
            }}
            active={activeStep === index}
            key={index}
            completed={completedSteps.includes(index)}
          >
            <StepButton color="inherit">{step.title}</StepButton>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
};

export default FormSteps;

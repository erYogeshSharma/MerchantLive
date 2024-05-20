import {
  Box,
  Divider,
  LinearProgress,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import FormSteps from "./FormSteps";
import BasicDetails from "./BasicDetails";
import FormNav from "./FormNav";
import { useAppSelector } from "../../store/hooks";
import AddAddress from "./AddAddress";
import AddProducts from "./AddProducts";
import AddSchedule from "./AddSchedule";
import Review from "./Review";
import AddLinks from "./AddLinks";

const CreateCardForm = () => {
  const { steps, activeStep } = useAppSelector((state) => state.businessForm);
  const isSmallScreen = useMediaQuery("(max-width: 800px)");
  return (
    <Box>
      <Paper elevation={1}>
        <Stack>
          <Stack p={2}>
            {isSmallScreen ? (
              <LinearProgress
                variant="determinate"
                value={(activeStep / steps.length) * 100}
              />
            ) : (
              <FormSteps />
            )}
          </Stack>
          <Divider />

          <Stack
            p={2}
            spacing={2}
            sx={{
              height: { xs: "calc(100vh - 240px)", md: "calc(100vh - 300px)" },
              overflowY: "auto",
            }}
          >
            <Stack>
              <Typography variant="body1" fontWeight={600}>
                {steps[activeStep].title}
              </Typography>
              <Typography color="text.secondary" variant="subtitle2">
                {steps[activeStep].desc}
              </Typography>
            </Stack>
            {
              {
                0: <BasicDetails />,
                1: <AddAddress />,
                2: <AddLinks />,
                3: <AddProducts />,
                4: <AddSchedule />,
                5: <Review />,
              }[activeStep]
            }
          </Stack>
          <Stack>
            <Divider />
            <Stack p={2}>
              <FormNav />
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default CreateCardForm;

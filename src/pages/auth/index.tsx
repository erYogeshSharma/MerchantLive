import SignIn from "./Auth";
import { Grid, Stack, Typography } from "@mui/material";
import image from "../../assets/auth.svg";
import ToggleTheme from "../../components/shared/ToggleTheme";
const AuthPage = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={5} lg={7}>
        <Stack height="100vh" alignItems="center" justifyContent="center">
          <SignIn />
        </Stack>
      </Grid>

      <Grid item xs={0} md={7} lg={5}>
        <Stack
          p={5}
          justifyContent="center"
          height="100vh"
          sx={{ background: (theme) => theme.palette.background.paper }}
        >
          <Stack spacing={2}>
            <ToggleTheme />
            <Stack alignItems="center">
              <img src={image} style={{ maxWidth: "70%", maxHeight: "100%" }} />
            </Stack>
            <Stack textAlign="center">
              <Typography variant="h5" color="primary" fontWeight={600}>
                Create Your Digital Business Card
              </Typography>
              <Typography variant="body1">
                Welcome to MerchantLive, where you can create and share your
                personalized digital business card. Sign in or sign up to get
                started and make a lasting impression.
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default AuthPage;

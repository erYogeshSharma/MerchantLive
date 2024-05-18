import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert, Paper, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { signIn, signUp } from "../../store/auth/auth-api";
import { LoadingButton } from "@mui/lab";
import { clearErrors } from "../../store/auth/auth-slice";
import PasswordInput from "../../components/form/PasswordInput";

export default function SignIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticating, error } = useAppSelector((state) => state.auth);
  const isSignUp = location.pathname.split("/")[1] === "register";
  React.useEffect(() => {
    dispatch(clearErrors());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (isSignUp) {
      dispatch(
        signUp({
          name: data.get("name") as string,
          email: data.get("email") as string,
          password: data.get("password") as string,
        })
      );
    } else {
      dispatch(
        signIn({
          email: data.get("email") as string,
          password: data.get("password") as string,
        })
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={2}>
        <Stack
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack alignItems="center" mb={3}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isSignUp ? "Sign up" : "Welcome back!"}
            </Typography>
          </Stack>

          <Stack component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Stack spacing={2}>
              {isSignUp && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Full Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                />
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <PasswordInput
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              {!isSignUp && (
                <Stack alignItems="flex-end">
                  <Link
                    onClick={() => navigate("/forgot-password")}
                    variant="body2"
                  >
                    Forgot password?
                  </Link>
                </Stack>
              )}
            </Stack>
            <Stack direction="row" alignItems="center">
              <Checkbox />
              <Typography variant="body2">
                I agree to <Link>Term and conditions</Link>{" "}
              </Typography>
            </Stack>
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <LoadingButton
              size="large"
              loading={isAuthenticating}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isSignUp ? "Sign up" : "Sign in"}
            </LoadingButton>
            {error && <Alert severity="error">{error.toString()}</Alert>}
            <Grid container>
              <Grid item>
                <Typography variant="body2">
                  {isSignUp
                    ? "Already have an account?"
                    : "Don't have an account?"}
                  <Link
                    onClick={() => navigate(isSignUp ? "/login" : "/register")}
                  >
                    &nbsp;
                    {isSignUp ? "Sign in" : "Sign up"}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}

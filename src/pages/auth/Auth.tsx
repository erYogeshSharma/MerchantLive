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
        <Box
          sx={{
            p: 4,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isSignUp ? "Sign up" : "Welcome back!"}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}>
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
            <TextField
              margin="normal"
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
                  variant="body2">
                  Forgot password?
                </Link>
              </Stack>
            )}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <LoadingButton
              loading={isAuthenticating}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
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
                    onClick={() => navigate(isSignUp ? "/login" : "/register")}>
                    &nbsp;
                    {isSignUp ? "Sign in" : "Sign up"}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

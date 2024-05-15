import {
  Routes,
  Route,
  BrowserRouter,
  Outlet,
  Navigate,
} from "react-router-dom";
import Auth from "../pages/auth/Auth";

import { useAppSelector } from "../store/hooks";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import Home from "../pages/home/Home";
import { Grid } from "@mui/material";
import ToggleTheme from "../components/shared/ToggleTheme";
import DashboardWrapper from "../components/wrappers/DashboardWrapper";
import CreateForm from "../pages/createForm/CreateForm";
import Cards from "../pages/cards.tsx/Cards";
import { Analytics } from "@mui/icons-material";
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/doc" element={<Home />} />
          <Route path="/analytics" element={<Analytics />} />

          <Route path="/cards" element={<Cards />} />
          <Route path="/cards/edit/:id" element={<CreateForm />} />
          <Route path="/cards/create" element={<CreateForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const AuthRoutes = () => {
  const { accessToken } = useAppSelector((state) => state.auth.tokens);
  if (accessToken) {
    return <Navigate to="/doc" replace />;
  }
  return (
    <Grid>
      <ToggleTheme />
      <Outlet />
    </Grid>
  );
};
const ProtectedRoutes = () => {
  const { accessToken } = useAppSelector((state) => state.auth.tokens);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return (
    <DashboardWrapper>
      <Outlet />
    </DashboardWrapper>
  );
};
export default AppRouter;

import {
  Routes,
  Route,
  BrowserRouter,
  Outlet,
  Navigate,
} from "react-router-dom";

import { useAppSelector } from "../store/hooks";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import Home from "../pages/home/Home";
import { Grid } from "@mui/material";
import DashboardWrapper from "../components/wrappers/DashboardWrapper";
import CreateForm from "../pages/createForm/CreateForm";
import Cards from "../pages/cards.tsx/Cards";
import { Analytics } from "@mui/icons-material";
import useRefreshToken from "../hooks/useRefreshToken";
import AuthPage from "../pages/auth";
import Enquiries from "../pages/enquiries/Enquiries";
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<AuthPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/doc" element={<Home />} />
          <Route path="/analytics" element={<Analytics />} />

          <Route path="/cards" element={<Cards />} />
          <Route path="/enquiries" element={<Enquiries />} />
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
      {/* <ToggleTheme /> */}
      <Outlet />
    </Grid>
  );
};
const ProtectedRoutes = () => {
  const token = useRefreshToken();
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

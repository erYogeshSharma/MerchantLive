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
import { Grid } from "@mui/material";
import DashboardWrapper from "../components/wrappers/DashboardWrapper";
import CreateForm from "../pages/createForm/CreateForm";
import Cards from "../pages/cards.tsx/Cards";
import AuthPage from "../pages/auth";
import Enquiries from "../pages/enquiries/Enquiries";
import Analytics from "../pages/analytics/Analytics";
import Settings from "../pages/settings";
import ErrorPage from "../pages/static/ErrorPage";
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthRoutes />}>
          <Route path="/register" element={<AuthPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Analytics />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/enquiries" element={<Enquiries />} />
          <Route path="/enquiries/:bId" element={<Enquiries />} />
          <Route path="/cards/edit/:id" element={<CreateForm />} />
          <Route path="/cards/create" element={<CreateForm />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

const AuthRoutes = () => {
  const { accessToken } = useAppSelector((state) => state.auth.tokens);
  if (accessToken) {
    return <Navigate to="/analytics" replace />;
  }
  return (
    <Grid>
      {/* <ToggleTheme /> */}
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

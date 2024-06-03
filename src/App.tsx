import * as React from "react";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CssBaseline } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { store } from "./store";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import getTheme from "./utils/theme";
import AppRouter from "./routes/AppRouter";
import ColorModeContext from "./contexts/themeContext";

const persistor = persistStore(store);
export default function ToggleColorMode() {
  const [mode, setMode] = React.useState<"light" | "dark">(
    (localStorage.getItem("colorMode") as "dark") || "light"
  );

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        localStorage.setItem("colorMode", mode === "light" ? "dark" : "light");
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const theme = React.useMemo(
    () => responsiveFontSizes(createTheme(getTheme(mode))),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <CssBaseline />
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={mode}
              />
              <AppRouter />
            </LocalizationProvider>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

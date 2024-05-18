import * as React from "react";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import ColorModeContext from "./contexts/themeContext";
import { Provider } from "react-redux";
import { store } from "./store";
import AppRouter from "./routes/AppRouter";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "./App.css";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { CssBaseline } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import getTheme from "./utils/theme";

const persistor = persistStore(store);
export default function ToggleColorMode() {
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
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
              <AppRouter />
            </LocalizationProvider>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

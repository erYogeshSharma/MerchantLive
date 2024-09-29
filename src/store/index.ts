import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import authSlice from "./auth/auth-slice";
import cardFormSlice from "./business-form/business-form-slice";
import businessSlice from "./business/business-slice";
import appSlice from "./app/app-slice";
import analyticsSlice from "./analytics/analytics.slice";
import adminSlice from "./admin/admin-slice";

const reducers = combineReducers({
  app: appSlice,
  auth: authSlice,

  businessForm: cardFormSlice,
  business: businessSlice,
  analytics: analyticsSlice,
  admin: adminSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "app"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

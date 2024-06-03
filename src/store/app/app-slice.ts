import { IBusinessCard } from "@/types/business";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AuthState = {
  notificationOpen: boolean;

  business: IBusinessCard;

  openOnboardModal: boolean;
  error: string;
};

const initialState: AuthState = {
  notificationOpen: false,
  openOnboardModal: false,
  error: "",
  business: {
    _id: "",
    name: "",
    title: "",
    logo: "",
    coverImage: "",
    linkId: "",
    isActive: false,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = "";
    },

    toggleNotificationOpen: (state) => {
      state.notificationOpen = !state.notificationOpen;
    },

    toggleOnboardModal: (state, action: PayloadAction<boolean>) => {
      state.openOnboardModal = action.payload;
    },
    setBusinessId: (state, action: PayloadAction<IBusinessCard>) => {
      state.business = action.payload;
    },
  },
  extraReducers: () => {
    //SIGNUP
  },

  // signIn: (state, action: PayloadAction<AuthResponse>) => {
  //     state.user = action.payload;
  //   },
});

export const {
  clearErrors,
  toggleNotificationOpen,
  toggleOnboardModal,
  setBusinessId,
} = authSlice.actions;

export default authSlice.reducer;

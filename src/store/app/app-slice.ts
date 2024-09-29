import { IBusinessCard } from "@/types/business";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type PreviewCard = {
  open: boolean;
  card: IBusinessCard;
  cardId: number;
};
type AuthState = {
  notificationOpen: boolean;

  business: IBusinessCard;

  openOnboardModal: boolean;
  error: string;

  // BUSINESS CARDS
  previewCard: PreviewCard;
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
    alternatePhone: 0,
    address: "",
    email: "",
    phone: 0,
    customDomain: "",
  },
  previewCard: {
    open: false,
    card: {
      _id: "",
      name: "",
      title: "",
      logo: "",
      coverImage: "",
      linkId: "",
      isActive: false,
      alternatePhone: 0,
      address: "",
      email: "",
      phone: 0,
      customDomain: "",
    },
    cardId: 1,
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
    openPreviewCard: (state, action: PayloadAction<PreviewCard>) => {
      state.previewCard = action.payload;
    },
    closePreviewCard: (state) => {
      state.previewCard = initialState.previewCard;
    },
    clearAppData: (state) => {
      state = initialState;
      return state;
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
  openPreviewCard,
  closePreviewCard,
  clearAppData,
} = authSlice.actions;

export default authSlice.reducer;

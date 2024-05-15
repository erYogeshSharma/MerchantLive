import { createSlice } from "@reduxjs/toolkit";
import { IBusinessCard, IBusinessForm } from "../../types/business";
import { getBusinessById, getAllBusiness } from "./business-api";

type BusinessState = {
  cards: IBusinessCard[];
  businessDetails: IBusinessForm;
  error: string;

  loadingDetails: boolean;
  loadingCards: boolean;
};

const initialState: BusinessState = {
  cards: [],
  businessDetails: {
    _id: undefined,
    name: "",
    logo: "",
    coverImage: "",
    category: "",
    title: "",
    description: "",
    email: "",
    phone: null,
    linkId: "",
    alternatePhone: null,
    gallery: [],
    address: "",
    country: "",
    city: "",
    state: "",
    zipCode: 0,
    googleMapLink: "",
    links: [],
    products: [],
    calender: {
      mon: "",
      tue: "",
      wed: "",
      thu: "",
      fri: "",
      sat: "",
      sunday: "",
    },
    enableEnquiryForm: false,
    enableAppointmentForm: false,
    isActive: false,
  },
  error: "",

  loadingCards: false,
  loadingDetails: false,
};

export const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    //GET BUSINESS DETAILS
    builder.addCase(getBusinessById.pending, (state) => {
      state.loadingDetails = true;
    });
    builder.addCase(getBusinessById.rejected, (state, action) => {
      state.loadingDetails = false;
      state.error = action.payload as string;
    });
    builder.addCase(getBusinessById.fulfilled, (state, action) => {
      state.loadingDetails = false;
      state.businessDetails = action.payload;
    });

    //GET BUSINESS CARDS
    builder.addCase(getAllBusiness.pending, (state) => {
      state.loadingCards = true;
    });
    builder.addCase(getAllBusiness.rejected, (state, action) => {
      state.loadingCards = false;
      state.error = action.payload as string;
    });
    builder.addCase(getAllBusiness.fulfilled, (state, action) => {
      state.loadingCards = false;
      state.cards = action.payload;
    });
  },

  // signIn: (state, action: PayloadAction<AuthResponse>) => {
  //     state.user = action.payload;
  //   },
});

export const { clearErrors } = businessSlice.actions;

export default businessSlice.reducer;

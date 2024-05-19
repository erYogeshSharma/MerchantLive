import { createSlice } from "@reduxjs/toolkit";
import {
  BusinessEnquiry,
  IBusinessCard,
  IBusinessForm,
} from "../../types/business";
import {
  getBusinessById,
  getAllBusiness,
  getAllBusinessEnquiries,
} from "./business-api";

type BusinessState = {
  cards: IBusinessCard[];
  businessDetails: IBusinessForm;
  enquires: BusinessEnquiry[];
  error: string;

  loadingDetails: boolean;
  loadingCards: boolean;
  loadingEnquiries: boolean;
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
    calender: "",
    enableEnquiryForm: false,
    enableAppointmentForm: false,
    isActive: false,
    theme: "",
  },
  error: "",

  loadingCards: false,
  loadingDetails: false,
  enquires: [],
  loadingEnquiries: false,
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

    //GET BUSINESS ENQUIRIES

    builder.addCase(getAllBusinessEnquiries.pending, (state) => {
      state.loadingEnquiries = true;
    });
    builder.addCase(getAllBusinessEnquiries.rejected, (state, action) => {
      state.loadingEnquiries = false;
      state.error = action.payload as string;
    });
    builder.addCase(getAllBusinessEnquiries.fulfilled, (state, action) => {
      state.loadingEnquiries = false;
      state.enquires = action.payload;
    });
  },

  // signIn: (state, action: PayloadAction<AuthResponse>) => {
  //     state.user = action.payload;
  //   },
});

export const { clearErrors } = businessSlice.actions;

export default businessSlice.reducer;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  BusinessEnquiry,
  IBusinessCard,
  IBusinessForm,
  Offer,
} from "@/types/business";
import {
  getBusinessDetails,
  getAllBusiness,
  getAllBusinessEnquiries,
  getAllBusinessOffers,
  createBusinessOffer,
  updateBusinessOffer,
} from "./business-api";

type BusinessState = {
  cards: IBusinessCard[];
  businessDetails: IBusinessForm;
  enquires: BusinessEnquiry[];
  error: string;

  offers: Offer[];
  loadingOffers: boolean;
  savingOffer: boolean;
  openOfferModal: boolean;
  offerForm: Offer;

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
  offers: [],
  loadingOffers: false,
  savingOffer: false,
  openOfferModal: false,
  offerForm: {
    _id: "",
    title: "",
    description: "",
    image: "",
    business: "",
    startsOn: "",
    endsOn: "",
    createdAt: "",
    updatedAt: "",
    isActive: false,
  },
};

export const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = "";
    },

    openOfferModal: (state, action: PayloadAction<{ offer?: Offer }>) => {
      state.openOfferModal = true;
      state.offerForm = action.payload.offer || initialState.offerForm;
    },
    closeOfferModal: (state) => {
      state.openOfferModal = false;
      state.offerForm = initialState.offerForm;
    },
    updateOfferForm: (state, action: PayloadAction<Partial<Offer>>) => {
      state.offerForm = { ...state.offerForm, ...action.payload };
    },
    deleteOffer: (state, action: PayloadAction<string>) => {
      state.offers = state.offers.filter(
        (offer) => offer._id !== action.payload
      );
    },
    updateEnquiryStatus: (state, action: PayloadAction<string>) => {
      state.enquires = state.enquires.map((enquiry) =>
        enquiry._id === action.payload
          ? { ...enquiry, isSolved: !enquiry.isSolved }
          : enquiry
      );
    },
  },
  extraReducers: (builder) => {
    //GET BUSINESS DETAILS
    builder.addCase(getBusinessDetails.pending, (state) => {
      state.loadingDetails = true;
    });
    builder.addCase(getBusinessDetails.rejected, (state, action) => {
      state.loadingDetails = false;
      state.error = action.payload as string;
    });
    builder.addCase(getBusinessDetails.fulfilled, (state, action) => {
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

    //GET ALL OFFERS
    builder.addCase(getAllBusinessOffers.pending, (state) => {
      state.loadingOffers = true;
    });
    builder.addCase(getAllBusinessOffers.rejected, (state, action) => {
      state.loadingOffers = false;
      state.error = action.payload as string;
    });
    builder.addCase(getAllBusinessOffers.fulfilled, (state, action) => {
      state.loadingOffers = false;
      state.offers = action.payload;
    });

    //CREATE BUSINESS OFFER
    builder.addCase(createBusinessOffer.pending, (state) => {
      state.savingOffer = true;
    });
    builder.addCase(createBusinessOffer.rejected, (state, action) => {
      state.savingOffer = false;
      state.error = action.payload as string;
    });
    builder.addCase(createBusinessOffer.fulfilled, (state, action) => {
      state.savingOffer = false;
      state.offers.push(action.payload);
    });

    //UPDATE BUSINESS OFFER
    builder.addCase(updateBusinessOffer.pending, (state) => {
      state.savingOffer = true;
    });
    builder.addCase(updateBusinessOffer.rejected, (state, action) => {
      state.savingOffer = false;
      state.error = action.payload as string;
    });
    builder.addCase(updateBusinessOffer.fulfilled, (state, action) => {
      state.savingOffer = false;
      state.offers = state.offers.map((offer) =>
        offer._id === action.payload._id ? action.payload : offer
      );
    });
  },
});

export const {
  clearErrors,
  openOfferModal,
  closeOfferModal,
  updateOfferForm,
  deleteOffer,
  updateEnquiryStatus,
} = businessSlice.actions;

export default businessSlice.reducer;

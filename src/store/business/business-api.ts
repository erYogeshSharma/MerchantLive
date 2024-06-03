import { createAsyncThunk } from "@reduxjs/toolkit";

import * as API from "../../api";
import axios from "axios";
import {
  BusinessEnquiry,
  IBusinessCard,
  IBusinessForm,
  Offer,
} from "@/types/business";
import { toast } from "react-toastify";

/* -------------------------------------------------------------------------- */
/*                              GET ALL BUSINESS                              */
/* -------------------------------------------------------------------------- */
export const getAllBusiness = createAsyncThunk<IBusinessCard[]>(
  "business/get_all",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get_all_business();
      return data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error?.response?.data?.message);
      }
    }
  }
);

/* -------------------------------------------------------------------------- */
/*                         GET BUSINESS DETAILS BY ID                         */
/* -------------------------------------------------------------------------- */
export const getBusinessDetails = createAsyncThunk<IBusinessForm, void>(
  "business/get_by_id",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get_business();
      return data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error?.response?.data?.message);
      }
    }
  }
);

/* -------------------------------------------------------------------------- */
/*                         GET ALL BUSINESS ENQUIRIES                         */
/* -------------------------------------------------------------------------- */

export const getAllBusinessEnquiries = createAsyncThunk<
  BusinessEnquiry[],
  void
>("business/get_all_enquiries", async (_, { rejectWithValue }) => {
  try {
    const { data } = await API.get_business_enquiries();
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
});

/* -------------------------------------------------------------------------- */
/*                         GET ALL BUSINESS OFFERS                         */
/* -------------------------------------------------------------------------- */

export const getAllBusinessOffers = createAsyncThunk<Offer[], void>(
  "business/get_all_offers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get_offers();
      return data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error?.response?.data?.message);
      }
    }
  }
);

/* -------------------------------------------------------------------------- */
/*                         CREATE A BUSINESS OFFERS                         */
/* -------------------------------------------------------------------------- */

export const createBusinessOffer = createAsyncThunk<Offer, Partial<Offer>>(
  "business/create_offer",
  async (form, { rejectWithValue }) => {
    try {
      const { data } = await API.create_offer(form);
      toast.success("Offer created successfully");
      return data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error?.response?.data?.message);
      }
    }
  }
);

/* -------------------------------------------------------------------------- */
/*                         UPDATE A BUSINESS OFFERS                         */
/* -------------------------------------------------------------------------- */

export const updateBusinessOffer = createAsyncThunk<Offer, Partial<Offer>>(
  "business/update_offer",
  async (form, { rejectWithValue }) => {
    try {
      const { data } = await API.update_offer(form);
      toast.success("Offer updated successfully");
      return data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error?.response?.data?.message);
      }
    }
  }
);

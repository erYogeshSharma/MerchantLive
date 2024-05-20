import { createAsyncThunk } from "@reduxjs/toolkit";

import * as API from "../../api";
import axios from "axios";
import {
  BusinessEnquiry,
  IBusinessCard,
  IBusinessForm,
} from "../../types/business";

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
export const getBusinessById = createAsyncThunk<IBusinessForm, string>(
  "business/get_by_id",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await API.get_business(id);
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
  string
>("business/get_all_enquiries", async (id, { rejectWithValue }) => {
  try {
    const { data } = await API.get_business_enquiries(id);
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
});

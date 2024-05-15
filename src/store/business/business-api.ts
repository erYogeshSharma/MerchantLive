import { createAsyncThunk } from "@reduxjs/toolkit";

import * as API from "../../api";
import { AxiosError } from "axios";
import { IBusinessCard, IBusinessForm } from "../../types/business";

export const getAllBusiness = createAsyncThunk<IBusinessCard[]>(
  "business/get_all",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get_all_business();
      return data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError?.response?.data?.message);
    }
  }
);

export const getBusinessById = createAsyncThunk<IBusinessForm, string>(
  "business/get_by_id",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await API.get_business(id);
      return data.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError?.response?.data?.message);
    }
  }
);

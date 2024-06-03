import * as API from "../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Query, Visit } from "@/types/business";

export const getBusinessVisits = createAsyncThunk<
  { visits: Visit[]; startDate: string; endDate: string },
  Query
>("analytics/visits", async (form, { rejectWithValue }) => {
  try {
    const { data } = await API.get_visits(form);
    if (!data) {
      throw new Error("API response is undefined");
    }
    return {
      visits: data.data as Visit[],
      startDate: form.startDate,
      endDate: form.endDate,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error?.response?.data?.message as string);
    } else {
      throw error; // Re-throw other errors
    }
  }
});

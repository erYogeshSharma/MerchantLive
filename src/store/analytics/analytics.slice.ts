import { createSlice } from "@reduxjs/toolkit";

import { getBusinessVisits } from "./analytics.api";
import { GraphData, Visit } from "@/types/business";
import { getLineChartData, getUniqueVisitors } from "./utils";

type BusinessState = {
  visits: Visit[];
  uniqueVisits: number;
  graphData: GraphData[];
  isLoadingVisits: boolean;
  apiError: string;
};

const initialState: BusinessState = {
  visits: [],
  uniqueVisits: 0,
  isLoadingVisits: false,
  apiError: "",
  graphData: [],
};

export const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.apiError = "";
    },
  },
  extraReducers: (builder) => {
    //GET BUSINESS VISITS
    builder.addCase(getBusinessVisits.pending, (state) => {
      state.isLoadingVisits = true;
    });
    builder.addCase(getBusinessVisits.rejected, (state, action) => {
      state.isLoadingVisits = false;
      state.apiError = action.payload as string;
    });
    builder.addCase(getBusinessVisits.fulfilled, (state, action) => {
      state.isLoadingVisits = false;
      state.visits = action.payload.visits;
      state.graphData = getLineChartData(
        action.payload.visits,
        action.payload.startDate,
        action.payload.endDate
      );
      state.uniqueVisits = getUniqueVisitors(action.payload.visits);
    });
  },

  // signIn: (state, action: PayloadAction<AuthResponse>) => {
  //     state.user = action.payload;
  //   },
});

export const { clearErrors } = businessSlice.actions;

export default businessSlice.reducer;

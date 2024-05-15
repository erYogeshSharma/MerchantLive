import { createAsyncThunk } from "@reduxjs/toolkit";

import * as API from "../../api";
import { AuthResponse, SignInForm, SignUpForm } from "../types/auth.types";
import { AxiosError } from "axios";


export const signUp = createAsyncThunk<AuthResponse, SignUpForm>(
  "auth/sign_up",
  async (form, { rejectWithValue }) => {
    try {
      const res = await API.sign_up(form);
      localStorage.setItem("token", JSON.stringify(res.data.tokens));
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError?.response?.data?.message );
    }
  }
);
export const signIn = createAsyncThunk<AuthResponse, SignInForm>(
  "auth/sign_in",
  async (form, { rejectWithValue }) => {
    try {
      const res = await API.sign_in(form);
      localStorage.setItem("token", JSON.stringify(res.data.data.tokens));
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

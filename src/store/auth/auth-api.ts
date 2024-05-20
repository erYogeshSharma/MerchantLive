import { createAsyncThunk } from "@reduxjs/toolkit";

import * as API from "../../api";
import {
  AuthResponse,
  SignInForm,
  SignUpForm,
  User,
} from "../types/auth.types";
import axios from "axios";
import { toast } from "react-toastify";

export const signUp = createAsyncThunk<AuthResponse, SignUpForm>(
  "auth/sign_up",
  async (form, { rejectWithValue }) => {
    try {
      const res = await API.sign_up(form);
      localStorage.setItem("token", JSON.stringify(res.data.data.tokens));
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error?.response?.data?.message);
      }
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
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error?.response?.data?.message);
      }
    }
  }
);
export const updateProfile = createAsyncThunk<AuthResponse, Partial<User>>(
  "auth/update_profile",
  async (form, { rejectWithValue }) => {
    try {
      const { data } = await API.update_user_info(form);
      toast.success("Update Successful");
      return data.data.user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error?.response?.data?.message);
      }
    }
  }
);

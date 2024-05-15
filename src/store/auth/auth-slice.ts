import { createSlice } from "@reduxjs/toolkit";
import { Tokens, User } from "../types/auth.types";
import { signIn, signUp } from "./auth-api";

type AuthState = {
  user: User;
  tokens: Tokens;

  //Handle errors here
  error: string;
  isAuthenticating: boolean;
};

const initialState: AuthState = {
  user: {
    _id: "",
    name: "",
    email: "",
    roles: [],
    profilePicUrl: "",
  },
  tokens: {
    accessToken: "",
    refreshToken: "",
  },

  //
  error: "",
  isAuthenticating: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = "";
    },
    signOut: (state) => {
      state.user = initialState.user;
      state.tokens = initialState.tokens;
    },
  },
  extraReducers: (builder) => {
    //SIGNUP
    builder.addCase(signUp.pending, (state) => {
      state.isAuthenticating = true;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.isAuthenticating = false;
      state.error = action.payload as string;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isAuthenticating = false;
      state.user = action.payload.data.user;
      state.tokens = action.payload.data.tokens;
    });
    //signIn
    builder.addCase(signIn.pending, (state) => {
      state.isAuthenticating = true;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.isAuthenticating = false;
      state.error = action.payload as string;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isAuthenticating = false;
      state.user = action.payload.data.user;
      state.tokens = action.payload.data.tokens;
    });
  },

  // signIn: (state, action: PayloadAction<AuthResponse>) => {
  //     state.user = action.payload;
  //   },
});

export const { clearErrors, signOut } = authSlice.actions;

export default authSlice.reducer;

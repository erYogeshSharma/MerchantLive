import { User } from "@/types/admin";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllUsers } from "./admin-api";

type AdminState = {
  users: User[];

  error: string;

  isLoadingUsers: boolean;
};

const initialState: AdminState = {
  users: [],
  error: "",
  isLoadingUsers: false,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = "";
      state.isLoadingUsers = false;
    },
    updateUserPlan: (state, action: PayloadAction<Partial<User>>) => {
      console.log({ user: action.payload });
      state.users = state.users.map((user) => {
        if (user._id === action.payload._id) {
          return { ...user, ...action.payload };
        }
        return user;
      });
    },
  },

  extraReducers: (builder) => {
    //SIGNUP
    builder.addCase(getAllUsers.pending, (state) => {
      state.isLoadingUsers = true;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.isLoadingUsers = false;
      state.error = action.payload as string;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.isLoadingUsers = false;
      state.users = action.payload;
    });
  },
});

export default adminSlice.reducer;
export const { clearErrors, updateUserPlan } = adminSlice.actions;

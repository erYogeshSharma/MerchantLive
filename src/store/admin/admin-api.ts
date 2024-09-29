import * as API from "../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "@/types/admin";

/* -------------------------------------------------------------------------- */
/*                            CREATE BUSINESS CARD                            */
/* -------------------------------------------------------------------------- */
export const getAllUsers = createAsyncThunk<User[], void>(
  "admin/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get_all_users();
      return data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error?.response?.data?.message);
      }
    }
  }
);

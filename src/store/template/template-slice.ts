import * as API from "../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IBusinessForm } from "../../types/business";
import axios from "axios";
import { toast } from "react-toastify";

/* -------------------------------------------------------------------------- */
/*                            CREATE BUSINESS CARD                            */
/* -------------------------------------------------------------------------- */
export const TemplateCard = createAsyncThunk<
  IBusinessForm,
  Partial<IBusinessForm>
>("form/create", async (form, { rejectWithValue }) => {
  try {
    const { data } = await API.create_business({
      linkId: form.linkId,
      logo: form.logo,
      name: form.name,
      category: form.category,
    });
    toast.success("Card Created Successfully");
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
});

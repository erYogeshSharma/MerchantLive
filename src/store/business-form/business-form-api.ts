import * as API from "../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IBusinessForm, ILinkOption } from "../../types/business";
import axios from "axios";

/* -------------------------------------------------------------------------- */
/*                            CREATE BUSINESS CARD                            */
/* -------------------------------------------------------------------------- */
export const createCard = createAsyncThunk<
  IBusinessForm,
  Partial<IBusinessForm>
>("form/create", async (form, { rejectWithValue }) => {
  try {
    const { data } = await API.create_business({
      linkId: form.linkId,
      logo: form.logo,
      coverImage: form.coverImage,
      name: form.name,
      title: form.title,
      email: form.email,
      phone: form.phone,
      alternatePhone: form.alternatePhone,
      description: form.description,
      category: form.category,
    });
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
});

/* -------------------------------------------------------------------------- */
/*                              GET LINK OPTIONS                              */
/* -------------------------------------------------------------------------- */
export const getLinkOptions = createAsyncThunk<ILinkOption[]>(
  "form/getLinkOptions",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get_links();
      return data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error?.response?.data?.message);
      }
    }
  }
);

/* -------------------------------------------------------------------------- */
/*                             ADD NEW LINK OPTION                            */
/* -------------------------------------------------------------------------- */
export const addLinkOption = createAsyncThunk<
  ILinkOption,
  { title: string; icon: string }
>("form/addLinkOption", async (link, { rejectWithValue }) => {
  try {
    const { data } = await API.add_link(link);
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
});

/* -------------------------------------------------------------------------- */
/*                        UPDATE CARD HAND HANDLE STEP                        */
/* -------------------------------------------------------------------------- */
export const updateCard = createAsyncThunk<
  { newStep: number; newForm: IBusinessForm },
  { step: number; form: Partial<IBusinessForm> }
>("form/update", async ({ step, form }, { rejectWithValue }) => {
  const res: {
    newStep: number;
    newForm: IBusinessForm;
  } = { newStep: 0, newForm: {} as IBusinessForm };

  try {
    if (step === 0) {
      const { data } = await API.update_basic({
        _id: form._id,
        linkId: form.linkId,
        logo: form.logo,
        coverImage: form.coverImage,
        name: form.name,
        title: form.title,
        email: form.email,
        phone: form.phone,
        alternatePhone: form.alternatePhone,
        description: form.description,
        category: form.category,
      });
      res.newStep = 1;
      res.newForm = data.data;
    }

    if (step === 1) {
      const { data } = await API.update_address({
        _id: form._id,
        address: form.address,
        city: form.city,
        state: form.state,
        country: form.country,
        zipCode: form.zipCode,
        googleMapLink: form.googleMapLink,
      });
      res.newStep = 2;
      res.newForm = data.data;
    }

    //Links
    if (step === 2) {
      const { data } = await API.update_links({
        _id: form._id,
        links: form.links,
      });
      res.newStep = 3;
      res.newForm = data.data;
    }

    //Products and gallery
    if (step === 3) {
      const { data } = await API.update_products({
        _id: form._id,
        products: form.products,
      });
      res.newStep = 4;
      if (form.gallery?.length) {
        const { data } = await API.update_gallery({
          _id: form._id,
          gallery: form.gallery,
        });

        res.newForm = data.data;
      }
      res.newForm = data.data;
    }

    //Update Calender

    if (step === 4) {
      const { data } = await API.update_calender({
        _id: form._id,
        calender: form.calender,
      });
      res.newStep = 5;
      res.newForm = data.data;
    }

    if (step === 5) {
      const { data } = await API.update_settings({
        _id: form._id,
        enableEnquiryForm: form.enableEnquiryForm,
      });
      res.newForm = data.data;
      window.location.href = "/cards";
    }

    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error?.response?.data?.message);
    } else {
      return rejectWithValue("An error occured");
    }
  }
});

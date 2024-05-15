import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addLinkOption,
  createCard,
  getLinkOptions,
  updateCard,
} from "./business-form-api";
import { FormKey, IBusinessForm, ILinkOption } from "../../types/business";
import { steps } from "../../constants/form-steps";

interface FormSlice {
  steps: (typeof steps)[0][];
  form: IBusinessForm;
  errors: Record<FormKey, string>;
  activeStep: number;
  completedSteps: number[];
  saving: boolean;
  apiError: string;

  linkOptions: ILinkOption[];
  linksLoading: boolean;

  addingLinkOption: boolean;
}

const initialState: FormSlice = {
  activeStep: 0,
  completedSteps: [],

  form: {
    name: "",
    category: "",
    title: "",
    description: "",
    logo: "",
    coverImage: "",
    email: "",
    phone: 0,
    alternatePhone: 0,
    address: "",
    country: "",
    city: "",
    state: "",
    zipCode: 0,
    googleMapLink: "",
    isActive: false,
    enableEnquiryForm: false,
    enableAppointmentForm: false,
    links: [],
    products: [],
    gallery: [],
    calender: "",
    _id: "",
    linkId: "",
  },

  saving: false,
  errors: {} as Record<FormKey, string>,
  steps: steps,
  apiError: "",
  linkOptions: [],
  linksLoading: false,
  addingLinkOption: false,
};

export const cardFormSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateForm: (state, action: PayloadAction<Partial<IBusinessForm>>) => {
      state.form = { ...state.form, ...action.payload };
    },
    resetForm: (state) => {
      state.form = initialState.form;
      state.activeStep = initialState.activeStep;
      state.completedSteps = initialState.completedSteps;
    },
    loadForm: (state, action: PayloadAction<IBusinessForm>) => {
      state.form = action.payload;
    },
    setErrors: (state, action: PayloadAction<Record<FormKey, string>>) => {
      state.errors = action.payload;
    },
    setActiveStep: (state, action: PayloadAction<number>) => {
      state.activeStep = action.payload;
    },
  },
  extraReducers: (builder) => {
    //SIGNUP
    builder.addCase(createCard.pending, (state) => {
      state.saving = true;
    });
    builder.addCase(createCard.rejected, (state, action) => {
      state.saving = false;
      state.apiError = action.payload as string;
    });
    builder.addCase(createCard.fulfilled, (state, action) => {
      state.saving = false;
      state.activeStep = 1;
      state.completedSteps.push(0);
      state.form = action.payload;
    });

    //Update
    builder.addCase(updateCard.pending, (state) => {
      state.saving = true;
    });
    builder.addCase(updateCard.rejected, (state, action) => {
      state.saving = false;
      state.apiError = action.payload as string;
    });
    builder.addCase(updateCard.fulfilled, (state, action) => {
      state.saving = false;
      state.form = action.payload.newForm;
      state.activeStep = action.payload.newStep;
      state.completedSteps.push(action.payload.newStep - 1);
    });

    //get Link Options
    builder.addCase(getLinkOptions.pending, (state) => {
      state.linksLoading = true;
    });
    builder.addCase(getLinkOptions.rejected, (state) => {
      state.apiError = "Failed to load link options";
      state.linksLoading = false;
    });
    builder.addCase(getLinkOptions.fulfilled, (state, action) => {
      state.linksLoading = false;
      state.linkOptions = action.payload;
    });

    //Add Link Option
    builder.addCase(addLinkOption.pending, (state) => {
      state.addingLinkOption = true;
    });
    builder.addCase(addLinkOption.rejected, (state) => {
      state.apiError = "Failed to add link option";
      state.addingLinkOption = false;
    });
    builder.addCase(addLinkOption.fulfilled, (state, action) => {
      state.addingLinkOption = false;
      state.linkOptions.push(action.payload);
    });
  },
});

export const { updateForm, resetForm, loadForm, setActiveStep, setErrors } =
  cardFormSlice.actions;

export default cardFormSlice.reducer;

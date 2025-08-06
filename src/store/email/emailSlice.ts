import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";
import { emailAPI } from "./emailAPI";
import { Email } from "../../models/storage";

export const addEmail = createAsyncThunk(
  'emails/add',
  async (email: Email) => {
    const response = await emailAPI.addEmail(email);
    return response.data
  },
);

export const deleteEmail = createAsyncThunk(
  'emails/delete',
  async (emailId: string) => {
    const response = await emailAPI.deleteEmail(emailId);
    return response.data
  },
);

export const loadEmails = createAsyncThunk(
  'emails/fetchAll',
  async () => {
    const response = await emailAPI.fetchEmails();
    return response.data
  }
);

export type EmailSliceState = {
  emaillist: Email[];
  isLoadingEmails: boolean;
  hasError: boolean;
}

const initialState: EmailSliceState = {
  emaillist: [],
  isLoadingEmails: true,
  hasError: false
}

export const emailSlice = createAppSlice({
  name: "email",
  initialState,
  reducers: () => ({
  }),
  extraReducers: (builder) => {
    builder.addCase(addEmail.fulfilled, (state, action) => {
      state.emaillist.push(action.payload);
    }).addCase(deleteEmail.fulfilled, (state, action) => {
      state.emaillist = state.emaillist.filter(item => item.id !== (action.payload))
    }).addCase(loadEmails.fulfilled, (state, action) => {
      state.emaillist = action.payload
      state.isLoadingEmails = false;
    })
  },
  selectors: {
    selectEmails: email => email.emaillist,
    selectIsLoading: email => email.isLoadingEmails,
  },
})

export const { selectEmails, selectIsLoading } = emailSlice.selectors

import { createAppSlice } from "./createAppSlice"
import { addToEmails, deleteEmailById, fetchEmails } from "./emailAPI"
import { Email } from "../models/random";

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
  reducers: create => ({
    addEmail: create.asyncThunk(
      async (email: Email) => {
        const response = await addToEmails(email);
        return response.data
      },
      {
        pending: () => { },
        fulfilled: (state, action) => {
          state.emaillist.concat([action.payload]);
        },
        rejected: state => {
          state.hasError = true;
        },
      },
    ),
    deleteEmail: create.asyncThunk(
      async (emailId: string) => {
        const response = await deleteEmailById(emailId);
        return response.data
      },
      {
        pending: () => { },
        fulfilled: (state, action) => {
          state.emaillist.filter(item => item.id !== action.payload);
        },
        rejected: state => {
          state.hasError = true;
        },
      },
    ),
    loadEmails: create.asyncThunk(
      async () => {
        const response = await fetchEmails();
        return response.data
      },
      {
        pending: state => {
          state.isLoadingEmails = true;
        },
        fulfilled: (state, action) => {
          state.isLoadingEmails = false;
          state.emaillist = action.payload
        },
        rejected: state => {
          state.isLoadingEmails = false;
          state.hasError = true;
        },
      },
    ),
  }),
  selectors: {
    selectEmails: email => email.emaillist,
    selectIsLoading: email => email.isLoadingEmails,
  },
})

export const { addEmail, deleteEmail, loadEmails } = emailSlice.actions
export const { selectEmails, selectIsLoading } = emailSlice.selectors

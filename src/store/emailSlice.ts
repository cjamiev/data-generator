import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "./createAppSlice"
import { fetchEmails } from "./emailAPI"
import { Email } from "../models/random";

export type EmailSliceState = {
  emaillist: Email[];
  status: "idle" | "loading" | "failed"
}

const initialState: EmailSliceState = {
  emaillist: [],
  status: "idle",
}

export const emailSlice = createAppSlice({
  name: "email",
  initialState,
  reducers: create => ({
    addEmail: create.reducer(
      (state, action: PayloadAction<Email>) => {
        state.emaillist.concat([action.payload])
      },
    ),
    loadEmails: create.asyncThunk(
      async () => {
        const response = await fetchEmails();
        return response.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.emaillist = action.payload
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
  }),
  selectors: {
    selectEmails: email => email.emaillist,
    selectStatus: email => email.status,
  },
})

export const { addEmail, loadEmails } = emailSlice.actions
export const { selectEmails, selectStatus } = emailSlice.selectors

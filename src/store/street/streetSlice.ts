import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";
import { streetAPI } from "./streetAPI";
import { Street } from "../../models/storage";

export const addStreet = createAsyncThunk(
  'streets/add',
  async (street: Street) => {
    const response = await streetAPI.addStreet(street);
    return response.data
  },
);

export const deleteStreet = createAsyncThunk(
  'streets/delete',
  async (streetId: string) => {
    const response = await streetAPI.deleteStreet(streetId);
    return response.data
  },
);

export const loadStreets = createAsyncThunk(
  'streets/fetchAll',
  async () => {
    const response = await streetAPI.fetchStreets();
    return response.data
  }
);

export type StreetSliceState = {
  streetlist: Street[];
  isLoadingStreets: boolean;
  hasError: boolean;
}

const initialState: StreetSliceState = {
  streetlist: [],
  isLoadingStreets: true,
  hasError: false
}

export const streetSlice = createAppSlice({
  name: "street",
  initialState,
  reducers: () => ({
  }),
  extraReducers: (builder) => {
    builder.addCase(addStreet.fulfilled, (state, action) => {
      state.streetlist.push(action.payload);
    }).addCase(deleteStreet.fulfilled, (state, action) => {
      state.streetlist = state.streetlist.filter(item => item.id !== (action.payload))
    }).addCase(loadStreets.fulfilled, (state, action) => {
      state.streetlist = action.payload
      state.isLoadingStreets = false;
    })
  },
  selectors: {
    selectStreets: street => street.streetlist,
    selectIsLoading: street => street.isLoadingStreets,
  },
})

export const { selectStreets, selectIsLoading } = streetSlice.selectors

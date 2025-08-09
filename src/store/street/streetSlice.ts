import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";
import { streetAPI } from "./streetAPI";
import { Street } from "../../models/storage";
import { getIsDemoMode } from "../../utils/config";
import { addMockData, loadMockData, removeMockData } from "../../utils/demoUtils";

export const addStreet = createAsyncThunk(
  'streets/add',
  async (street: Street) => {
    if (getIsDemoMode()) {
      addMockData<Street>('streets', street);

      return street;
    } else {
      const response = await streetAPI.addStreet(street);
      return response.data;
    }
  },
);

export const deleteStreet = createAsyncThunk(
  'streets/delete',
  async (streetId: string) => {
    if (getIsDemoMode()) {
      removeMockData<Street>('streets', (s: Street) => { return s.id !== streetId });

      return streetId;
    } else {
      const response = await streetAPI.deleteStreet(streetId);
      return response.data;
    }
  },
);

export const loadStreets = createAsyncThunk(
  'streets/fetchAll',
  async () => {
    if (getIsDemoMode()) {
      return loadMockData<Street>('streets');

    } else {
      const response = await streetAPI.fetchStreets();
      return response.data;
    }
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
    selectIsLoadingStreets: street => street.isLoadingStreets,
  },
})

export const { selectStreets, selectIsLoadingStreets } = streetSlice.selectors

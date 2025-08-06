import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";
import { locationAPI } from "./locationAPI";
import { Location } from "../../models/storage";

export const addLocation = createAsyncThunk(
  'locations/add',
  async (location: Location) => {
    const response = await locationAPI.addLocation(location);
    return response.data
  },
);

export const deleteLocation = createAsyncThunk(
  'locations/delete',
  async (locationCode: string) => {
    const response = await locationAPI.deleteLocation(locationCode);
    return response.data
  },
);

export const loadLocations = createAsyncThunk(
  'locations/fetchAll',
  async () => {
    const response = await locationAPI.fetchLocations();
    return response.data
  }
);

export type LocationSliceState = {
  locationlist: Location[];
  isLoadingLocations: boolean;
  hasError: boolean;
}

const initialState: LocationSliceState = {
  locationlist: [],
  isLoadingLocations: true,
  hasError: false
}

export const locationSlice = createAppSlice({
  name: "location",
  initialState,
  reducers: () => ({
  }),
  extraReducers: (builder) => {
    builder.addCase(addLocation.fulfilled, (state, action) => {
      state.locationlist.push(action.payload);
    }).addCase(deleteLocation.fulfilled, (state, action) => {
      state.locationlist = state.locationlist.filter(item => item.code !== (action.payload))
    }).addCase(loadLocations.fulfilled, (state, action) => {
      state.locationlist = action.payload
      state.isLoadingLocations = false;
    })
  },
  selectors: {
    selectLocations: location => location.locationlist,
    selectIsLoading: location => location.isLoadingLocations,
  },
})

export const { selectLocations, selectIsLoading } = locationSlice.selectors

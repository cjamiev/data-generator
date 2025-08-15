import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";
import { cityAPI } from "./cityAPI";
import { City } from "../../models/storage";
import { getIsDemoMode } from "../../utils/config";
import { addMockData, loadMockData, removeMockData } from "../../utils/demoUtils";

export const addCity = createAsyncThunk(
  'cities/add',
  async (city: City) => {
    if (getIsDemoMode()) {
      addMockData<City>('dg-cities', city);

      return city;
    } else {
      const response = await cityAPI.addCity(city);
      return response.data
    }
  },
);

export const deleteCity = createAsyncThunk(
  'cities/delete',
  async (id: string) => {
    if (getIsDemoMode()) {
      removeMockData<City>('dg-cities', (l: City) => { return l.id !== id });

      return id;
    } else {
      const response = await cityAPI.deleteCity(id);
      return response.data
    }
  },
);

export const loadCities = createAsyncThunk(
  'cities/fetchAll',
  async () => {
    if (getIsDemoMode()) {
      return loadMockData<City>('dg-cities');
    } else {
      const response = await cityAPI.fetchCities();
      return response.data
    }
  }
);

export type CitySliceState = {
  citylist: City[];
  isLoadingCities: boolean;
  hasError: boolean;
}

const initialState: CitySliceState = {
  citylist: [],
  isLoadingCities: true,
  hasError: false
}

export const citySlice = createAppSlice({
  name: "city",
  initialState,
  reducers: () => ({
  }),
  extraReducers: (builder) => {
    builder.addCase(addCity.fulfilled, (state, action) => {
      state.citylist.push(action.payload);
    }).addCase(deleteCity.fulfilled, (state, action) => {
      state.citylist = state.citylist.filter(item => item.id !== (action.payload))
    }).addCase(loadCities.fulfilled, (state, action) => {
      state.citylist = action.payload
      state.isLoadingCities = false;
    })
  },
  selectors: {
    selectCities: city => city.citylist,
    selectIsLoadingCities: city => city.isLoadingCities,
  },
})

export const { selectCities, selectIsLoadingCities } = citySlice.selectors

import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";
import { nameAPI } from "./nameAPI";
import { Name } from "../../models/storage";

export const addName = createAsyncThunk(
  'names/add',
  async (name: Name) => {
    const response = await nameAPI.addName(name);
    return response.data
  },
);

export const deleteName = createAsyncThunk(
  'names/delete',
  async (nameCode: string) => {
    const response = await nameAPI.deleteName(nameCode);
    return response.data
  },
);

export const loadNames = createAsyncThunk(
  'names/fetchAll',
  async () => {
    const response = await nameAPI.fetchNames();
    return response.data
  }
);

export type NameSliceState = {
  namelist: Name[];
  isLoadingNames: boolean;
  hasError: boolean;
}

const initialState: NameSliceState = {
  namelist: [],
  isLoadingNames: true,
  hasError: false
}

export const nameSlice = createAppSlice({
  name: "name",
  initialState,
  reducers: () => ({
  }),
  extraReducers: (builder) => {
    builder.addCase(addName.fulfilled, (state, action) => {
      state.namelist.push(action.payload);
    }).addCase(deleteName.fulfilled, (state, action) => {
      state.namelist = state.namelist.filter(item => item.id !== (action.payload))
    }).addCase(loadNames.fulfilled, (state, action) => {
      state.namelist = action.payload
      state.isLoadingNames = false;
    })
  },
  selectors: {
    selectNames: name => name.namelist,
    selectIsLoading: name => name.isLoadingNames,
  },
})

export const { selectNames, selectIsLoading } = nameSlice.selectors

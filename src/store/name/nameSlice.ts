import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";
import { nameAPI } from "./nameAPI";
import { Name } from "../../models/storage";
import { getIsDemoMode } from "../../utils/config";
import { addMockData, loadMockData, removeMockData } from "../../utils/demoUtils";

export const addName = createAsyncThunk(
  'names/add',
  async (name: Name) => {
    if (getIsDemoMode()) {
      addMockData<Name>('names', name);

      return name;
    } else {
      const response = await nameAPI.addName(name);
      return response.data;
    }
  },
);

export const deleteName = createAsyncThunk(
  'names/delete',
  async (nameId: string) => {
    if (getIsDemoMode()) {
      removeMockData<Name>('names', (n: Name) => { return n.id !== nameId });

      return nameId;
    } else {
      const response = await nameAPI.deleteName(nameId);
      return response.data;
    }
  },
);

export const loadNames = createAsyncThunk(
  'names/fetchAll',
  async () => {
    if (getIsDemoMode()) {
      return loadMockData<Name>('names');
    } else {
      const response = await nameAPI.fetchNames();
      return response.data;
    }
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
    selectIsLoadingNames: name => name.isLoadingNames,
  },
})

export const { selectNames, selectIsLoadingNames } = nameSlice.selectors

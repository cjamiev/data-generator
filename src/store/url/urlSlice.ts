import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";
import { urlAPI } from "./urlAPI";
import { Url } from "../../models/storage";
import { getIsDemoMode } from "../../utils/config";
import { addMockData, loadMockData, removeMockData } from "../../utils/demoUtils";

export const addUrl = createAsyncThunk(
  'urls/add',
  async (url: Url) => {
    if (getIsDemoMode()) {
      addMockData<Url>('dg-urls', url);

      return url;
    } else {
      const response = await urlAPI.addUrl(url);
      return response.data;
    }
  },
);

export const deleteUrl = createAsyncThunk(
  'urls/delete',
  async (id: string) => {
    if (getIsDemoMode()) {
      removeMockData<Url>('dg-urls', (w: Url) => { return w.id !== id });

      return id;
    } else {
      const response = await urlAPI.deleteUrl(id);
      return response.data;
    }
  },
);

export const loadUrls = createAsyncThunk(
  'urls/fetchAll',
  async () => {
    if (getIsDemoMode()) {
      return loadMockData<Url>('dg-urls');
    } else {
      const response = await urlAPI.fetchUrls();
      return response.data;
    }
  }
);

export type UrlSliceState = {
  urllist: Url[];
  urltypes: string[];
  isLoadingUrls: boolean;
  hasError: boolean;
}

const initialState: UrlSliceState = {
  urllist: [],
  urltypes: [],
  isLoadingUrls: true,
  hasError: false
}

export const urlSlice = createAppSlice({
  name: "url",
  initialState,
  reducers: () => ({
  }),
  extraReducers: (builder) => {
    builder.addCase(addUrl.fulfilled, (state, action) => {
      state.urllist.push(action.payload);
      state.urltypes = [...new Set(state.urltypes.concat(action.payload.category))]
    }).addCase(deleteUrl.fulfilled, (state, action) => {
      state.urllist = state.urllist.filter(item => item.id !== (action.payload))
    }).addCase(loadUrls.fulfilled, (state, action) => {
      state.urllist = action.payload
      state.urltypes = [...new Set(action.payload.map(w => w.category))]
      state.isLoadingUrls = false;
    })
  },
  selectors: {
    selectUrls: url => url.urllist,
    selectUrlCategories: url => url.urltypes,
    selectIsLoadingUrls: url => url.isLoadingUrls,
  },
})

export const { selectUrls, selectUrlCategories, selectIsLoadingUrls } = urlSlice.selectors

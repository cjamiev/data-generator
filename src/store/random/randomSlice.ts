import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";
import { randomAPI } from "./randomAPI";
import { Random } from "../../models/storage";

export const addRandom = createAsyncThunk(
  'randoms/add',
  async (random: Random) => {
    const response = await randomAPI.addRandom(random);
    return response.data
  },
);

export const deleteRandom = createAsyncThunk(
  'randoms/delete',
  async (randomId: string) => {
    const response = await randomAPI.deleteRandom(randomId);
    return response.data
  },
);

export const loadRandoms = createAsyncThunk(
  'randoms/fetchAll',
  async () => {
    const response = await randomAPI.fetchRandoms();
    return response.data
  }
);

export type RandomSliceState = {
  randomlist: Random[];
  isLoadingRandoms: boolean;
  hasError: boolean;
}

const initialState: RandomSliceState = {
  randomlist: [],
  isLoadingRandoms: true,
  hasError: false
}

export const randomSlice = createAppSlice({
  name: "random",
  initialState,
  reducers: () => ({
  }),
  extraReducers: (builder) => {
    builder.addCase(addRandom.fulfilled, (state, action) => {
      state.randomlist.push(action.payload);
    }).addCase(deleteRandom.fulfilled, (state, action) => {
      state.randomlist = state.randomlist.filter(item => item.id !== (action.payload))
    }).addCase(loadRandoms.fulfilled, (state, action) => {
      state.randomlist = action.payload
      state.isLoadingRandoms = false;
    })
  },
  selectors: {
    selectRandoms: random => random.randomlist,
    selectIsLoading: random => random.isLoadingRandoms,
  },
})

export const { selectRandoms, selectIsLoading } = randomSlice.selectors

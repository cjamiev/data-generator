import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";
import { wordAPI } from "./wordAPI";
import { Word } from "../../models/storage";
import { getIsDemoMode } from "../../utils/config";
import { addMockData, loadMockData, removeMockData } from "../../utils/demoUtils";

export const addWord = createAsyncThunk(
  'words/add',
  async (word: Word) => {
    if (getIsDemoMode()) {
      addMockData<Word>('words', word);

      return word;
    } else {
      const response = await wordAPI.addWord(word);
      return response.data;
    }
  },
);

export const deleteWord = createAsyncThunk(
  'words/delete',
  async (wordId: string) => {
    if (getIsDemoMode()) {
      removeMockData<Word>('words', (w: Word) => { return w.id !== wordId });

      return wordId;
    } else {
      const response = await wordAPI.deleteWord(wordId);
      return response.data;
    }
  },
);

export const loadWords = createAsyncThunk(
  'words/fetchAll',
  async () => {
    if (getIsDemoMode()) {
      return loadMockData<Word>('words');
    } else {
      const response = await wordAPI.fetchWords();
      return response.data;
    }
  }
);

export type WordSliceState = {
  wordlist: Word[];
  isLoadingWords: boolean;
  hasError: boolean;
}

const initialState: WordSliceState = {
  wordlist: [],
  isLoadingWords: true,
  hasError: false
}

export const wordSlice = createAppSlice({
  name: "word",
  initialState,
  reducers: () => ({
  }),
  extraReducers: (builder) => {
    builder.addCase(addWord.fulfilled, (state, action) => {
      state.wordlist.push(action.payload);
    }).addCase(deleteWord.fulfilled, (state, action) => {
      state.wordlist = state.wordlist.filter(item => item.id !== (action.payload))
    }).addCase(loadWords.fulfilled, (state, action) => {
      state.wordlist = action.payload
      state.isLoadingWords = false;
    })
  },
  selectors: {
    selectWords: word => word.wordlist,
    selectIsLoading: word => word.isLoadingWords,
  },
})

export const { selectWords, selectIsLoading } = wordSlice.selectors

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
      addMockData<Word>('dg-words', word);

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
      removeMockData<Word>('dg-words', (w: Word) => { return w.id !== wordId });

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
      return loadMockData<Word>('dg-words');
    } else {
      const response = await wordAPI.fetchWords();
      return response.data;
    }
  }
);

export type WordSliceState = {
  wordlist: Word[];
  wordtypes: string[];
  isLoadingWords: boolean;
  hasError: boolean;
}

const initialState: WordSliceState = {
  wordlist: [],
  wordtypes: [],
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
      state.wordtypes = [...new Set(state.wordtypes.concat(action.payload.type))]
    }).addCase(deleteWord.fulfilled, (state, action) => {
      state.wordlist = state.wordlist.filter(item => item.id !== (action.payload))
    }).addCase(loadWords.fulfilled, (state, action) => {
      state.wordlist = action.payload
      state.wordtypes = [...new Set(action.payload.map(w => w.type))]
      state.isLoadingWords = false;
    })
  },
  selectors: {
    selectWords: word => word.wordlist,
    selectWordTypes: word => word.wordtypes,
    selectIsLoadingWords: word => word.isLoadingWords,
  },
})

export const { selectWords, selectWordTypes, selectIsLoadingWords } = wordSlice.selectors

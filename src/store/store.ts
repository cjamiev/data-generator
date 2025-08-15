import { useDispatch, useSelector } from "react-redux";
import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { emailSlice } from "./email/emailSlice";
import { citySlice } from "./city/citySlice";
import { nameSlice } from "./name/nameSlice";
import { wordSlice } from "./word/wordSlice";
import { streetSlice } from "./street/streetSlice";

const rootReducer = combineSlices(emailSlice, citySlice, nameSlice, wordSlice, streetSlice)
export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware()
    },
    preloadedState,
  })
  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()

export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
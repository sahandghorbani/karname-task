// src/store/index.ts

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import baseApi from "@/store/apis/baseApi";
import { userApi } from "../apis/userApi";

export const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
      }).concat([baseApi.middleware, userApi.middleware]);
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

setupListeners(store.dispatch);

export default store;

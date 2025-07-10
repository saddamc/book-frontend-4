import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import bookSlice from "./features/book/bookSlice";
import borrowSlice from "./features/borrow/borrowSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    book: bookSlice,
    borrow: borrowSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

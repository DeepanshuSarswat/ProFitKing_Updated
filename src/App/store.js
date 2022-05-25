import { configureStore } from '@reduxjs/toolkit'
import stockReducer from "../features/stockSlice";
export const store = configureStore({
  reducer: {
    stock : stockReducer
  },
})
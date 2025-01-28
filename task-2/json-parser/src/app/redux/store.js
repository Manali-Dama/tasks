
import { configureStore } from '@reduxjs/toolkit';
import jsonReducer from './jsonSlice';

export const store = configureStore({
  reducer: {
    json: jsonReducer,
  },
});

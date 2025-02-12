import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
};

const addSlice = createSlice({
  name: "addProduct",
  initialState,
  reducers: {
    addProductRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addProductSuccess: (state) => {
      state.loading = false;
    },
    addProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { addProductRequest, addProductSuccess, addProductFailure } = addSlice.actions;
export default addSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dropdowns: {},
  loading: false,
  error: null,
};

const dropdownSlice = createSlice({
  name: "dropdowns",
  initialState,
  reducers: {
    fetchDropdownsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDropdownsSuccess: (state, action) => {
      state.loading = false;
      state.dropdowns = action.payload;
    },
    fetchDropdownsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDropdownsRequest, fetchDropdownsSuccess, fetchDropdownsFailure } =
  dropdownSlice.actions;
export default dropdownSlice.reducer;

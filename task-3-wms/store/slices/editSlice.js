import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product: null,
    loading: false,
    error: null,
};

const editSlice = createSlice({
    name: "editProduct",
    initialState,
    reducers: {
        fetchProductRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchProductSuccess: (state, action) => {
            state.loading = false;
            state.product = action.payload;
        },
        fetchProductFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateProductRequest: (state) => {
            state.loading = true;
        },
        updateProductSuccess: (state) => {
            state.loading = false;
        },
        updateProductFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchProductRequest,
    fetchProductSuccess,
    fetchProductFailure,
    updateProductRequest,
    updateProductSuccess,
    updateProductFailure,
} = editSlice.actions;

export default editSlice.reducer;

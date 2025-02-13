import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  error: null,
  current_page: 1,
  last_page: 1,
  filters: {},
  searchField: "",  // Persist search field
  searchQuery: "",  // Persist search query
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProductsStart: (state, action) => {
      state.loading = true;
      state.error = null;
      const { filters, searchField, searchQuery } = action.payload;

      if (filters) state.filters = filters;
      if (searchField !== undefined) state.searchField = searchField;
      if (searchQuery !== undefined) state.searchQuery = searchQuery;
    },
    fetchProductsSuccess: (state, action) => {
      state.products = action.payload.products;
      state.current_page = action.payload.current_page;
      state.last_page = action.payload.last_page;
      state.loading = false;
    },
    fetchProductsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } = productsSlice.actions;
export default productsSlice.reducer;



// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   products: [],
//   loading: false,
//   error: null,
//   current_page: 1,
//   last_page: 1,
//   filters: {}, // Store active filters
//   addProductLoading: false,
//   addProductError: null,
// };

// const productsSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {
//     fetchProductsStart: (state, action) => {
//       state.loading = true;
//       state.error = null;
//       if (action.payload.filters) {
//         state.filters = action.payload.filters; // Update filters when fetching
//       }
//     },
//     fetchProductsSuccess: (state, action) => {
//       state.products = action.payload.products;
//       state.current_page = action.payload.current_page;
//       state.last_page = action.payload.last_page;
//       state.loading = false;
//     },
//     fetchProductsFailure: (state, action) => {
//       state.error = action.payload;
//       state.loading = false;
//     },
//     addProductStart: (state) => {
//       state.addProductLoading = true;
//       state.addProductError = null;
//     },
//     addProductSuccess: (state, action) => {
//       state.products.push(action.payload);
//       state.addProductLoading = false;
//     },
//     addProductFailure: (state, action) => {
//       state.addProductError = action.payload;
//       state.addProductLoading = false;
//     },
//   },
// });

// export const {
//   fetchProductsStart,
//   fetchProductsSuccess,
//   fetchProductsFailure,
//   addProductStart,
//   addProductSuccess,
//   addProductFailure,
// } = productsSlice.actions;

// export default productsSlice.reducer;



// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   products: [],
//   loading: false,
//   error: null,
//   current_page: 1,
//   last_page: 1,
//   addProductLoading: false,
//   addProductError: null,
// };

// const productsSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {
//     fetchProductsStart: (state, action) => {
//       state.loading = true;
//       state.error = null;
//     },
//     fetchProductsSuccess: (state, action) => {
//       state.products = action.payload.products;
//       state.current_page = action.payload.current_page;
//       state.last_page = action.payload.last_page;
//       state.loading = false;
//     },
//     fetchProductsFailure: (state, action) => {
//       state.error = action.payload;
//       state.loading = false;
//     },
//     addProductStart: (state) => {
//       state.addProductLoading = true;
//       state.addProductError = null;
//     },
//     addProductSuccess: (state, action) => {
//       state.products.push(action.payload);
//       state.addProductLoading = false;
//     },
//     addProductFailure: (state, action) => {
//       state.addProductError = action.payload;
//       state.addProductLoading = false;
//     },
//   },
// });

// export const {
//   fetchProductsStart,
//   fetchProductsSuccess,
//   fetchProductsFailure,
//   addProductStart,
//   addProductSuccess,
//   addProductFailure,
// } = productsSlice.actions;

// export default productsSlice.reducer;







// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   products: [],
//   loading: false,
//   error: null,
//   current_page: 1,
//   last_page: 1,
// };

// const productsSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {
//     fetchProductsStart: (state, action) => {
//       state.loading = true;
//       state.error = null;
//     },
//     fetchProductsSuccess: (state, action) => {
//       state.products = action.payload.products;
//       state.current_page = action.payload.current_page;
//       state.last_page = action.payload.last_page;
//       state.loading = false;
//     },
//     fetchProductsFailure: (state, action) => {
//       state.error = action.payload;
//       state.loading = false;
//     },
//   },
// });

// export const { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } =
//   productsSlice.actions;

// export default productsSlice.reducer;

import { takeLatest, call, put, select } from "redux-saga/effects";
import api from "@/utils/axiosInstance";
import { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } from "../slices/productsSlice";

// Select filters and search from Redux state
const selectFilters = (state) => state.products.filters;
const selectSearchField = (state) => state.products.searchField;
const selectSearchQuery = (state) => state.products.searchQuery;

const fetchProductsApi = async (url) => {
  const response = await api.get(url);
  return response.data;
};

function* fetchProductsSaga(action) {
  try {
    const { page, filters } = action.payload;
    const currentFilters = yield select(selectFilters);
    const searchField = yield select(selectSearchField);
    const searchQuery = yield select(selectSearchQuery);

    let query = new URLSearchParams();

    const appliedFilters = { ...currentFilters, ...filters };
    Object.keys(appliedFilters).forEach((key) => {
      if (appliedFilters[key]) query.append(key, appliedFilters[key]);
    });

    query.append("page", page);
    query.append("sort_by", "created,d");

    if (searchField && searchQuery) {
      query.append("search", `${searchQuery},${searchField}`);
    }

    const url = `/master/products/unpublished?${query.toString()}`;
    const data = yield call(fetchProductsApi, url);

    yield put(
      fetchProductsSuccess({
        products: data.products,
        current_page: data.meta.current_page,
        last_page: data.meta.last_page,
      })
    );
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
  }
}

export function* watchFetchProducts() {
  yield takeLatest(fetchProductsStart.type, fetchProductsSaga);
}




// import { takeLatest, call, put, select } from "redux-saga/effects";
// import api from "@/utils/axiosInstance";
// import {
//   fetchProductsStart,
//   fetchProductsSuccess,
//   fetchProductsFailure,
// } from "../slices/productsSlice";

// // Select the current filters from the Redux state
// const selectFilters = (state) => state.products.filters;

// // API call to fetch products
// const fetchProductsApi = async (url) => {
//   const response = await api.get(url);
//   return response.data;
// };

// // Saga to fetch products based on filters and pagination
// function* fetchProductsSaga(action) {
//   try {
//     const { page, filters } = action.payload;
//     const currentFilters = yield select(selectFilters); // Get stored filters

//     let query = new URLSearchParams();

//     // Merge new filters with existing ones
//     const appliedFilters = { ...currentFilters, ...filters };
//     Object.keys(appliedFilters).forEach((key) => {
//       if (appliedFilters[key]) query.append(key, appliedFilters[key]);
//     });

//     query.append("page", page);
//     query.append("sort_by", "created,d");

//     const url = `/master/products/unpublished?${query.toString()}`;
//     const data = yield call(fetchProductsApi, url);

//     yield put(
//       fetchProductsSuccess({
//         products: data.products,
//         current_page: data.meta.current_page,
//         last_page: data.meta.last_page,
//       })
//     );
//   } catch (error) {
//     yield put(fetchProductsFailure(error.message));
//   }
// }

// export function* watchFetchProducts() {
//   yield takeLatest(fetchProductsStart.type, fetchProductsSaga);
// }



// import { takeLatest, call, put } from "redux-saga/effects";
// import api from "@/utils/axiosInstance";
// import {
//   fetchProductsStart,
//   fetchProductsSuccess,
//   fetchProductsFailure,
//   addProductStart,
//   addProductSuccess,
//   addProductFailure,
// } from "../slices/productsSlice";

// // API call to get products based on dynamic URL
// const fetchProductsApi = async (url) => {
//   const response = await api.get(url);
//   return response.data;
// };

// // Saga to fetch products based on dynamic URL
// function* fetchProductsSaga(action) {
//   try {
//     const url = action.payload.url || `/master/products/unpublished?sort_by=created,d&page=${action.payload.page}`;
//     const data = yield call(fetchProductsApi, url);

//     yield put(fetchProductsSuccess({
//       products: data.products,
//       current_page: data.meta.current_page,
//       last_page: data.meta.last_page,
//     }));
//   } catch (error) {
//     yield put(fetchProductsFailure(error.message));
//   }
// }

// export function* watchFetchProducts() {
//   yield takeLatest(fetchProductsStart.type, fetchProductsSaga);
// }



// import { takeLatest, call, put } from 'redux-saga/effects';
// import api from '@/utils/axiosInstance';
// import { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } from '../slices/productsSlice';

// // API call to get paginated products
//   const fetchProductsApi = async (page) => {
//     const response = await api.get(
//       `/master/products/unpublished?sort_by=created,d&page=${page}`
//     );
//     return response.data;
//   };
  


// // Saga to fetch products with pagination
// function* fetchProductsSaga(action) {
//   try {
//     const { page } = action.payload;
//     const data = yield call(fetchProductsApi, page);

//     yield put(fetchProductsSuccess({
//       products: data.products,
//       current_page: data.meta.current_page,
//       last_page: data.meta.last_page,
//     }));
//   } catch (error) {
//     yield put(fetchProductsFailure(error.message));
//   }
// }




// // Root saga for products
// export function* watchFetchProducts() {
//   yield takeLatest(fetchProductsStart.type, fetchProductsSaga);
// }



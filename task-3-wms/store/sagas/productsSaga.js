import { takeLatest, call, put } from "redux-saga/effects";
import api from "@/utils/axiosInstance";
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
} from "../slices/productsSlice";

// API call to get products based on dynamic URL
const fetchProductsApi = async (url) => {
  const response = await api.get(url);
  return response.data;
};

// Saga to fetch products based on dynamic URL
function* fetchProductsSaga(action) {
  try {
    const url = action.payload.url || `/master/products/unpublished?sort_by=created,d&page=${action.payload.page}`;
    const data = yield call(fetchProductsApi, url);

    yield put(fetchProductsSuccess({
      products: data.products,
      current_page: data.meta.current_page,
      last_page: data.meta.last_page,
    }));
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
  }
}

export function* watchFetchProducts() {
  yield takeLatest(fetchProductsStart.type, fetchProductsSaga);
}



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



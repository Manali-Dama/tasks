import { call, put, takeLatest } from "redux-saga/effects";
import api from "@/utils/axiosInstance";
import { addProductRequest, addProductSuccess, addProductFailure } from "../slices/addSlice";

function* addProductSaga(action) {
  try {
    yield put(addProductRequest());
    yield call(api.post, "master/products", action.payload, {
      headers: { Location: "1" }
    });
    yield put(addProductSuccess());
  } catch (error) {
    yield put(addProductFailure(error.message));
  }
}

export function* watchAddProduct() {
  yield takeLatest("addProduct", addProductSaga);
}
import { call, put, takeLatest } from "redux-saga/effects";
import api from "@/utils/axiosInstance";
import { fetchDropdownsRequest, fetchDropdownsSuccess, fetchDropdownsFailure } from "../slices/dropdownSlice";

function* fetchDropdownsSaga() {
  try {
    const response = yield call(api.get, "/master-data/productMasterData");
    console.log("Dropdown API Response:", response.data); // Debugging log
    yield put(fetchDropdownsSuccess(response.data.productMasterData)); // Only store the relevant object
  } catch (error) {
    console.error("Dropdown API Error:", error);
    yield put(fetchDropdownsFailure(error.message));
  }
}

export function* watchFetchDropdowns() {
  yield takeLatest(fetchDropdownsRequest.type, fetchDropdownsSaga);
}

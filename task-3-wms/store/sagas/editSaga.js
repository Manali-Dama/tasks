import { call, put, takeLatest } from "redux-saga/effects";
import api from "@/utils/axiosInstance";
import {
    fetchProductRequest,
    fetchProductSuccess,
    fetchProductFailure,
    updateProductRequest,
    updateProductSuccess,
    updateProductFailure,
} from "../slices/editSlice";

function* fetchProductSaga(action) {
    try {
        const response = yield call(api.get, `/master/products/unpublished/${action.payload}`, {
            headers: { "Location": "1" },
        });

        if (response.data.code === 200) {
            yield put(fetchProductSuccess(response.data.product));
        } else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        yield put(fetchProductFailure(error.message || "Failed to fetch product."));
    }
}

function* updateProductSaga(action) {
    try {
        const { product_id, formData } = action.payload;
        const response = yield call(api.put, `/master/products/update/${product_id}`, formData, {
            headers: { "Location": "1" },
        });

        if (response.data.code === 200) {
            yield put(updateProductSuccess());
            alert("Product updated successfully!");
        } else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        yield put(updateProductFailure(error.message || "Failed to update product."));
        alert(`Error updating product: ${error.message}`);
    }
}

export function* watchEditProductSaga() {
    yield takeLatest(fetchProductRequest.type, fetchProductSaga);
    yield takeLatest(updateProductRequest.type, updateProductSaga);
}

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
        const productId = action.payload;
        if (!productId) throw new Error("Invalid product ID");

        console.log("Fetching product ID:", productId);
        const response = yield call(api.get, `/master/products/unpublished/${productId}`, {
            headers: { Location: "1" },
        });

        if (response.data?.code === 200) {
            yield put(fetchProductSuccess(response.data.product));
        } else {
            throw new Error(response.data?.message || "Failed to fetch product.");
        }
    } catch (error) {
        console.error("Fetch product error:", error);
        yield put(fetchProductFailure(error.message || "Failed to fetch product."));
    }
}

function* updateProductSaga(action) {
    try {
        const { product_id, finalData } = action.payload;

        if (!product_id) {
            throw new Error("Missing product ID for update");
        }

        console.log("Updating product ID:", product_id, "with data:", finalData);

        const response = yield call(api.put, `/master/products/${product_id}`, finalData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                Location: "1",
            },
        });

        if (response.data?.code === 200) {
            yield put(updateProductSuccess());
            console.log("Product updated successfully!");
        } else {
            throw new Error(response.data?.message || "Failed to update product.");
        }
    } catch (error) {
        console.error("Update product error:", error);
        yield put(updateProductFailure(error.message || "Failed to update product."));
    }
}


export function* watchEditProductSaga() {
    yield takeLatest(fetchProductRequest.type, fetchProductSaga);
    yield takeLatest(updateProductRequest.type, updateProductSaga);
}

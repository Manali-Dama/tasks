import { all, takeLatest, call, put } from "redux-saga/effects";
import api from "@/utils/axiosInstance";
import { loginRequest, loginSuccess, loginFailure } from "../slices/authSlice";

function* loginSaga(action) {
  try {
    const payloadWithMac = { ...action.payload, mac_address: "646EE0E68240" };
    const response = yield call(api.post, "/login", payloadWithMac);

    const userData = response.data?.user?.profile || null;
    const token = response.data?.user?.auth?.token || null;

    if (!userData || !token) {
      throw new Error("Invalid response: Missing user data or token");
    }

    // Dispatch success action
    yield put(loginSuccess({ user: userData, token }));

    // Store in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
    }
  } catch (error) {
    yield put(loginFailure(error.response?.data?.message || "Login failed"));
  }
}

// Watcher saga
export function* watchLogin() {
  yield takeLatest(loginRequest.type, loginSaga);
}

export default function* rootSaga() {
  yield all([watchLogin()]);
}

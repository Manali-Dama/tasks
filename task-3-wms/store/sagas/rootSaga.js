// store/sagas/index.js
import { all } from 'redux-saga/effects';
import { watchFetchProducts } from './productsSaga';
import { watchFetchDropdowns } from './dropdownSaga';
import { watchAddProduct } from './addSaga';
import { watchEditProductSaga } from './editSaga';
import { watchLogin } from './authSaga'; // Assuming loginSaga exists

export default function* rootSaga() {
  yield all([watchLogin(), 
    watchFetchProducts(),
    watchFetchDropdowns(),
    watchAddProduct(),
    watchEditProductSaga()
  ]);
}

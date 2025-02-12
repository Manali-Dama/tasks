import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import loginReducer from './slices/authSlice';
import dropdownReducer from "./slices/dropdownSlice";
import productsReducer from './slices/productsSlice';
import addReducer from "./slices/addSlice";
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    login: loginReducer,
    products: productsReducer,
    dropdowns: dropdownReducer,
    addProduct: addReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;


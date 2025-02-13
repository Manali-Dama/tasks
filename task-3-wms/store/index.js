import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import loginReducer from './slices/authSlice';
import dropdownReducer from "./slices/dropdownSlice";
import productsReducer from './slices/productsSlice';
import addReducer from "./slices/addSlice";
import rootSaga from './sagas/rootSaga';
import editReducer from './slices/editSlice'

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    login: loginReducer,
    products: productsReducer,
    dropdowns: dropdownReducer,
    addProduct: addReducer,
    editProduct: editReducer, 
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;


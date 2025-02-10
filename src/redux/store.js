import { configureStore } from '@reduxjs/toolkit';
import distanceReducer from '../redux/features/vehicle/distanceSlice';
import categoryApi from './features/category/categoryApi'; 
import authReducer from './features/auth/authSlice';
import authApi from './features/auth/authApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    distance: distanceReducer,
    [authApi.reducerPath]: authApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware,categoryApi.middleware,), 
});
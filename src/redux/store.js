import { configureStore } from '@reduxjs/toolkit';
import distanceReducer from '../redux/features/vehicle/distanceSlice';
import categoryApi from './features/category/categoryApi'; 

export const store = configureStore({
  reducer: {
    distance: distanceReducer,
    [categoryApi.reducerPath]: categoryApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(categoryApi.middleware), 
});
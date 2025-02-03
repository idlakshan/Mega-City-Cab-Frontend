
import { configureStore } from '@reduxjs/toolkit';
import distanceReducer from '../redux/features/vehicle/distanceSlice';

export const store = configureStore({
  reducer: {
    distance: distanceReducer,
  },
});
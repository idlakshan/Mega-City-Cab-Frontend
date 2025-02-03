
import { createSlice } from '@reduxjs/toolkit';

const distanceSlice = createSlice({
  name: 'distance',
  initialState: {
    value: null,
  },
  reducers: {
    setDistance: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setDistance } = distanceSlice.actions;
export default distanceSlice.reducer;
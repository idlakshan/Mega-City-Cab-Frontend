import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedVehicle: 'Budget',
  distance: 0,
  basePrices: {
    Budget: 250.0,
    City: 400.0,
    Semi: 800.0,
    Luxury: 1200.0,
    Van: 1500.0,
  },
  calculatedPrice: 0,
};

const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    setSelectedVehicle: (state, action) => {
        console.log(action);
        
      state.selectedVehicle = action.payload;
      state.calculatedPrice = state.basePrices[action.payload] * state.distance;
    },
    setDistance: (state, action) => {
        console.log(action);
        
      state.distance = action.payload;
     
    },
  },
});

export const { setSelectedVehicle, setDistance } = vehicleSlice.actions;
export default vehicleSlice.reducer;
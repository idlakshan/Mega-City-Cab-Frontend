import { createSlice } from "@reduxjs/toolkit";


const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    checkoutData: null,
    selectedCategoryPrice: 0,
    selectedCategoryName: "Budget", 
    selectedCategoryIcon: "mini.png",
    selectedCategoryId: 1,
    assignedCar: null, 
    assignedDriver: null, 
  },
  reducers: {
    setCheckoutData: (state, action) => {
      state.checkoutData = action.payload;
    },
    setSelectedCategoryPrice: (state, action) => {
      state.selectedCategoryPrice = action.payload;
    },
    setSelectedCategoryDetails: (state, action) => {
      state.selectedCategoryId = action.payload.id;
      state.selectedCategoryName = action.payload.name;
      state.selectedCategoryIcon = action.payload.icon; 

    },
    setAssignedCar: (state, action) => {
      state.assignedCar = action.payload; 
    },
    setAssignedDriver: (state, action) => {
      state.assignedDriver = action.payload; 
    },
    clearBookingData: (state) => {
      state.checkoutData = null;
      state.selectedCategoryPrice = 0;
      state.selectedCategoryName = "Budget";
      state.selectedCategoryIcon = "mini.png"; 
    },
  },
});

export const {
  setCheckoutData,
  setSelectedCategoryPrice,
  setSelectedCategoryDetails,
  clearBookingData,
  setAssignedCar,
  setAssignedDriver,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;

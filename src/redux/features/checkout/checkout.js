import { createSlice } from "@reduxjs/toolkit";
 // Import the default icon

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    checkoutData: null,
    selectedCategoryPrice: 0,
    selectedCategoryName: "Budget", 
    selectedCategoryIcon: "mini.png",
  },
  reducers: {
    setCheckoutData: (state, action) => {
      state.checkoutData = action.payload;
    },
    setSelectedCategoryPrice: (state, action) => {
      state.selectedCategoryPrice = action.payload;
    },
    setSelectedCategoryDetails: (state, action) => {
   //   console.log("Dispatching setSelectedCategoryDetails:", action.payload); 
      state.selectedCategoryName = action.payload.name;
      state.selectedCategoryIcon = action.payload.icon; 
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
} = checkoutSlice.actions;

export default checkoutSlice.reducer;

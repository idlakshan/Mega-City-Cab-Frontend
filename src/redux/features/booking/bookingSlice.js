import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pickupLocation: '',
  dropLocation: '',
  dateTime: '',
  userDetails: {
    name: '',
    email: '',
    phoneNumber: '',
  },
  paymentDetails: {
    budget: 0,
    tax: 0,
    total: 0,
  },
  bookingId:'',
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setPickupLocation: (state, action) => {
      state.pickupLocation = action.payload;
    },
    setDropLocation: (state, action) => {
      state.dropLocation = action.payload;
    },
    setDateTime: (state, action) => {
      state.dateTime = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setPaymentDetails: (state, action) => {
      state.paymentDetails = action.payload;
    },
    setBookingId: (state, action) => {
      state.bookingId = action.payload; // Reducer to set bookingId
    },
  },
});

export const { setPickupLocation, setDropLocation, setDateTime, setUserDetails, setPaymentDetails,setBookingId } = bookingSlice.actions;

export default bookingSlice.reducer;
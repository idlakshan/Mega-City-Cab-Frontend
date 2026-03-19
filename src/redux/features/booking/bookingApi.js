import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  getBaseUrl,
  getOpenCageUrl,
  getOpenRouteUrl,
} from "../../../utils/BaseURL";

const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}`,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Booking"],
  endpoints: (builder) => ({
    getBookingsCount: builder.query({
      query: () => ({
        url: "/booking/bookings-count",
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),
    getLast7DaysData: builder.query({
      query: () => ({
        url: "/booking/last-7-days-data",
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),
    getAllBookings: builder.query({
      query: () => ({
        url: "/booking",
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),
    getOngoingBookings: builder.query({
      query: () => ({
        url: "/booking/status/InProgress",
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),
    updateBooking: builder.mutation({
      query: (data) => ({
        url: "/booking/status",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Booking"],
    }),
    getUserStats: builder.query({
      query: () => ({
        url: "/booking/user-stats",
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),
    getPaymentHistory: builder.query({
      query: () => ({
        url: "/booking/payment-history",
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),
    getBookingDetails: builder.query({
      query: () => ({
        url: "/booking/booking-details",
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),
    createBooking: builder.mutation({
      query: ({ categoryId }) => ({
        url: "/booking",
        method: "POST",
        body: { categoryId },
      }),
      invalidatesTags: ["Booking"],
    }),
    fetchCoordinates: builder.query({
      query: (city) => ({
        url: getOpenCageUrl(),
        params: {
          key: import.meta.env.VITE_OPEN_CAGE_API_KEY,
          q: city,
          countrycode: "LK",
          limit: 1,
        },
        credentials: "omit",
      }),
    }),
    fetchRoute: builder.query({
      query: ({ start, end }) => ({
        url: getOpenRouteUrl(),
        params: {
          api_key: import.meta.env.VITE_OPENROUTESERVICE_API_KEY,
          start: `${start.lng},${start.lat}`,
          end: `${end.lng},${end.lat}`,
        },
        credentials: "omit",
      }),
    }),
  }),
});

export const {
  useGetBookingsCountQuery,
  useGetLast7DaysDataQuery,
  useGetAllBookingsQuery,
  useGetOngoingBookingsQuery,
  useUpdateBookingMutation,
  useGetUserStatsQuery,
  useGetPaymentHistoryQuery,
  useGetBookingDetailsQuery,
  useCreateBookingMutation,
  useLazyFetchCoordinatesQuery,
  useLazyFetchRouteQuery,
} = bookingApi;

export default bookingApi;

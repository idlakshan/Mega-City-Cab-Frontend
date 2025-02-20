import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/BaseURL";

const bookingApi = createApi({
    reducerPath: 'bookingApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/v1`,
        credentials: 'include',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Booking'],
    endpoints: (builder) => ({
        getBookingsCount: builder.query({
            query: () => ({
                url: '/booking/bookings-count',
                method: 'GET'
            }),
            providesTags: ['Booking'],
        }),
        getLast7DaysData: builder.query({
            query: () => ({
                url: '/booking/last-7-days-data',
                method: 'GET'
            }),
            providesTags: ['Booking'],
        }),
        getAllBookings: builder.query({
            query: () => ({
                url: '/booking',
                method: 'GET'
            }),
            providesTags: ['Booking'],
        }),
        getOngoingBookings: builder.query({
            query: () => ({
                url: '/booking/status/InProgress',
                method: 'GET'
            }),
            providesTags: ['Booking'],
        }),
    }),
});

export const { useGetBookingsCountQuery, useGetLast7DaysDataQuery,useGetAllBookingsQuery,useGetOngoingBookingsQuery } = bookingApi;
export default bookingApi;

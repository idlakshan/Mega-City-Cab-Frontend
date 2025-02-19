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
                url: '/booking/bookings-count/',
                method: 'GET'
            }),
            providesTags: ['Booking'],
        }),
    }),
});

export const { useGetBookingsCountQuery } = bookingApi;
export default bookingApi;

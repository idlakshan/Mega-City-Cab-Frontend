import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/BaseURL";

export const checkoutApi = createApi({
  reducerPath: "checkoutApi",
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Checkout"],
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: ({
        amount,
        currency,
        successUrl,
        cancelUrl,
        userId,
        carId,
        driverId,
        pickupLocation,
        dropLocation,
        bookingDateTime,
        customerName,
        customerEmail,
        customerPhone,
      }) => ({
        url: "/checkout/create-session",
        method: "POST",
        body: {
          amount,
          currency,
          successUrl,
          cancelUrl,
          userId,
          carId,
          driverId,
          pickupLocation,
          dropLocation,
          bookingDateTime,
          customerName,
          customerEmail,
          customerPhone,
        },
      }),
      invalidatesTags: ["Checkout"],
    }),
  }),
});

export const { useCreateCheckoutSessionMutation } = checkoutApi;
export default checkoutApi;

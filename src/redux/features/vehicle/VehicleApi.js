import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/BaseURL";

const vehicleApi = createApi({
  reducerPath: "vehicleApi",
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
  tagTypes: ["vehicle"],
  endpoints: (builder) => ({
    getCars: builder.query({
      query: () => ({
        url: "/car",
        method: "GET",
      }),
      providesTags: ["vehicle"],
    }),
    getCarById: builder.query({
      query: (id) => ({
        url: `/car/${id}`,
        method: "GET",
      }),
      providesTags: ["vehicle"],
    }),
    getCarwithCategoryById: builder.query({
      query: (id) => ({
        url: `/car/${id}/with-category`,
        method: "GET",
      }),
      providesTags: ["vehicle"],
    }),
    addCar: builder.mutation({
      query: (formData) => ({
        url: "/car",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["vehicle"],
    }),
    updateCar: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/car/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["vehicle"],
    }),
    deleteCar: builder.mutation({
      query: (id) => ({
        url: `/car/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["vehicle"],
    }),
  }),
});

export const {
  useGetCarsQuery,
  useGetCarByIdQuery,
  useAddCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
  useGetCarwithCategoryByIdQuery
} = vehicleApi;

export default vehicleApi;

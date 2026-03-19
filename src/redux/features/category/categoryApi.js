import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/BaseURL";

const categoryApi = createApi({
  reducerPath: "categoryApi",
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
  tagTypes: ["category"],
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    getCategoryNames: builder.query({
      query: () => ({
        url: "/category/category-name",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["category"],
    }),
    updateCategoryPrice: builder.mutation({
      query: (body) => ({
        url: "/category/update-category-price",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useGetCategoryNamesQuery,
  useUpdateCategoryPriceMutation,
} = categoryApi;
export default categoryApi;

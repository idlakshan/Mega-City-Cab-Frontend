import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/BaseURL";

const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/v1`,
        credentials: 'include'
    }),
    tagTypes: ['category'],
    endpoints: (builder) => ({
        getCategory: builder.query({
            query: () => ({
                url: '/category',
                method: 'GET'
            }),
            providesTags: ['category'],
        }),
    }),
});

export const { useGetCategoryQuery } = categoryApi;
export default categoryApi;

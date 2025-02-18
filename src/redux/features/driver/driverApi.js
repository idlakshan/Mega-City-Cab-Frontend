import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/BaseURL";

const driverApi = createApi({
    reducerPath: 'driverApi',
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
    tagTypes: ['driver'],
    endpoints: (builder) => ({
        getDrivers: builder.query({
            query: () => ({
                url: '/driver',
                method: 'GET',
            }),
            providesTags: ['driver'],
        }),
       
        getDriverById: builder.query({
            query: (id) => ({
                url: `/driver/${id}`,
                method: 'GET',
            }),
            providesTags: ['driver'],
        }),
        
        addDriver: builder.mutation({
            query: (formData) => ({
                url: '/driver',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['driver'],
        }),
   
        updateDriver: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/driver/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['driver'],
        }),
   
        deleteDriver: builder.mutation({
            query: (id) => ({
                url: `/driver?driverId=${id}`,  
                method: 'DELETE',
            }),
            invalidatesTags: ['driver'],
        }),
    }),
});

export const { 
    useGetDriversQuery, 
    useGetDriverByIdQuery, 
    useAddDriverMutation, 
    useUpdateDriverMutation, 
    useDeleteDriverMutation 
} = driverApi;

export default driverApi;
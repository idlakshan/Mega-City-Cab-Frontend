import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/BaseURL";

const vehicleApi = createApi({
    reducerPath: 'vehicleApi',
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
    tagTypes: ['vehicle'],
    endpoints: (builder) => ({
        getCars: builder.query({
            query: () => ({
                url: '/vehicle',
                method: 'GET',
            }),
            providesTags: ['vehicle'],
        }),
        getCarById: builder.query({
            query: (id) => ({
                url: `/vehicle/${id}`,
                method: 'GET',
            }),
            providesTags: ['vehicle'],
        }),
        addCar: builder.mutation({
            query: (formData) => ({
                url: '/vehicle',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['vehicle'],
        }),
        updateCar: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/vehicle/${id}`,
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['vehicle'],
        }),
        deleteCar: builder.mutation({
            query: (id) => ({
                url: `/vehicle/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['vehicle'],
        }),
    }),
});

export const { 
    useGetCarsQuery, 
    useGetCarByIdQuery, 
    useAddCarMutation, 
    useUpdateCarMutation, 
    useDeleteCarMutation 
} = vehicleApi;

export default vehicleApi;

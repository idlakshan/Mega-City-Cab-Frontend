import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/auth",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    
  }),
  tagTypes: ['user'],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "/signup",
        method: "POST",
        body: newUser,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
        responseHandler: (response) => response.text(),
      }),
      transformResponse: (response) => {
        return { token: response };
      },
    }),
    fetchCurrentUser:builder.query({
      query: () => ({
        url: '/current-user',
        method: 'GET'
    }),
    providesTags: ['user'],
    })
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useFetchCurrentUserQuery
} = authApi;

export default authApi;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "./authSlice";
import { getBaseUrl } from "../../../utils/BaseURL";

// Base query that adds Authorization header from localStorage
const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

// Wrap baseQuery to handle 401 and refresh
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // if 401 → try refresh
  if (result.error && result.error.status === 401) {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      // call refresh WITHOUT Authorization header
      const refreshResult = await fetch(
        "http://localhost:8081/api/v2/auth/refresh",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        },
      ).then((res) => res.json());

      if (refreshResult.accessToken) {
        // save new token
        localStorage.setItem("accessToken", refreshResult.accessToken);

        // retry original request
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["user"],
  endpoints: (builder) => ({
    // ---------------- Register ----------------
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "/auth/signUp",
        method: "POST",
        body: newUser,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["user"],
    }),

    // ---------------- Login ----------------
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
        headers: { "Content-Type": "application/json" },
      }),
      transformResponse: (response) => {
        console.log(response);

        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        localStorage.setItem("user", JSON.stringify(response.user));
        return { user: response.user };
      },
    }),

    // ---------------- Refresh ----------------
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: "/auth/refresh",
        method: "POST",
        body: { refreshToken },
        headers: { "Content-Type": "application/json" },
      }),
      transformResponse: (response) => {
        localStorage.setItem("accessToken", response.accessToken);
        return response;
      },
    }),

    // ---------------- Current User ----------------
    fetchCurrentUser: builder.query({
      query: () => ({
        url: "/auth/current-user",
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    // ---------------- All Users ----------------
    fetchAllUsers: builder.query({
      query: () => ({
        url: "auth/all-users",
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    // ---------------- Delete User ----------------
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/auth/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),

    // ---------------- Update User ----------------
    updateUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/update-user",
        method: "PUT",
        body: userData,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useRefreshTokenMutation,
  useFetchCurrentUserQuery,
  useFetchAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = authApi;

export default authApi;

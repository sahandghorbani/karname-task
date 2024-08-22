import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "users",
    }),
    getUserById: builder.query({
      query: (id) => `users/${id}`,
      // the actual correct behaviour is this: but the josnPlaceHolder doesnt support query params
      // query: ({ page = 1, limit = 5 }) => `users?page=${page}&limit=${limit}`,
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery } = userApi;

import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import axios from "axios";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: (headers) => {
    return headers;
  },
});

const refreshAccessToken = async (api: BaseQueryApi) => {
  console.log(api);

  try {
    const refresh_token = Cookies.get("refresh_token");
    if (!refresh_token) {
      Cookies.remove("refresh_token");
      Cookies.remove("access_token");
      window.location.replace("/");
    }
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_AUTH}/v1/auth/refresh` as string,
      {
        refresh_token,
      },
    );
    console.log(data);
  } catch (err: any) {
    // 401 : refresh token is expired
    // 400 : theres no refresh token and bad request error
    if (err.response.status === 401 || err.response.status === 400) {
      Cookies.remove("refresh_token");
      Cookies.remove("access_token");
      window.location.replace("/");
    }
    return false;
  }
};

const baseQueryWithReAuth = async (
  args: string | FetchArgs,
  api: any,
  extraOptions: {},
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (
    result.error?.status === 401 &&
    (args as FetchArgs).url !== "/v1/auth/login" &&
    (args as FetchArgs).url !== "/v1/auth/change-password"
  ) {
    // Attempt to refresh the access token if only we were on any pages except login page
    // in login page if we got 401 , it means we entered wrong data
    // it doesnt send refresh-request if we got(because it leads route-changing! in catch section)
    const refreshed = await refreshAccessToken(api);

    if (refreshed) {
      // Retry the original request with the new token
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

const baseApi = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: [],
  endpoints: () => ({}),
});
export default baseApi;
export { baseApi };

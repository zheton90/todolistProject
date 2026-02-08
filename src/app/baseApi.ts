import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTH_TOKEN } from "@/common/constants";
import { handleError } from "@/common/common/utils";

export const baseApi = createApi({
  reducerPath: "todolistsApi",
  tagTypes: ["Todolist", "Task"],
  baseQuery: async (args, api, extraOptios) => {
    await new Promise((res) => setTimeout(res, 500));
    const result = await fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
      headers: {
        "API-KEY": import.meta.env.VITE_API_KEY,
      },
      prepareHeaders: (headers) => {
        headers.set(
          "Authorization",
          `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
        );
      },
    })(args, api, extraOptios);

    handleError(api, result);
    // debugger;
    return result;
  },
  endpoints: () => ({}),
});

// export const baseApi = createApi({
//   reducerPath: "todolistsApi",
//   tagTypes: ["Todolist"],
//   baseQuery: fetchBaseQuery({
//     baseUrl: import.meta.env.VITE_BASE_URL,
//     headers: {
//       "API-KEY": import.meta.env.VITE_API_KEY,
//     },
//     prepareHeaders: (headers) => {
//       headers.set(
//         "Authorization",
//         `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
//       );
//     },
//   }),
//   endpoint: () => ({}),
// });

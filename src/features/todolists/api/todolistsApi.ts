import { instance } from "@/common/instance/instance.ts";
import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts";
import { BaseResponse } from "@/common/types";
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts";
import { baseApi } from "@/app/baseApi.ts";

export const todolistsApi = baseApi.injectEndpoints({
  // reducerPath: "todolistsApi",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: import.meta.env.VITE_BASE_URL,
  //   headers: {
  //     "API-KEY": import.meta.env.VITE_API_KEY,
  //   },
  //   prepareHeaders: (headers) => {
  //     headers.set(
  //       "Authorization",
  //       `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
  //     );
  //   },

  // }),
  // tagTypes: ["Todolists"],
  endpoints: (builder) => ({
    getTodolists: builder.query<DomainTodolist[], void>({
      query: () => "todo-lists",
      transformResponse: (todoists: Todolist[]): DomainTodolist[] =>
        todoists.map((tdl) => ({
          ...tdl,
          filter: "all",
          entityStatus: "idle",
        })),
      providesTags: ["Todolist"],
    }),
    createTodolist: builder.mutation<BaseResponse<{ item: Todolist }>, string>({
      query: (title) => ({
        url: "/todo-lists",
        method: "POST",
        body: { title },
      }),
      invalidatesTags: ["Todolist"],
    }),
    removeTodolist: builder.mutation<BaseResponse, string>({
      query: (id) => ({
        url: `/todo-lists/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todolist"],
    }),
    updateTodolistTitle: builder.mutation<
      BaseResponse,
      { id: string; title: string }
    >({
      query: ({ id, title }) => ({
        url: `/todo-lists/${id}`,
        method: "PUT",
        body: { title },
      }),
      invalidatesTags: ["Todolist"],
    }),
  }),
});

export const {
  useGetTodolistsQuery,
  useCreateTodolistMutation,
  useRemoveTodolistMutation,
  useUpdateTodolistTitleMutation,
} = todolistsApi;

export const _todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>("/todo-lists");
  },
  changeTodolistTitle(payload: { id: string; title: string }) {
    const { id, title } = payload;
    return instance.put<BaseResponse>(`/todo-lists/${id}`, { title });
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>("/todo-lists", {
      title,
    });
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${id}`);
  },
};

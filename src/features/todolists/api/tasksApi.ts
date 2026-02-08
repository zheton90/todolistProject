import { instance } from "@/common/instance/instance.ts";
import {
  DomainTask,
  GetTasksResponse,
  UpdateTaskModel,
} from "@/features/todolists/api/tasksApi.types.ts";
import { BaseResponse } from "@/common/types";
import { baseApi } from "@/app/baseApi.ts";
import { PAGE_SIZE } from "@/common/constants";

export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<
      GetTasksResponse,
      { todolistId: string; params: { page: number } }
    >({
      query: ({ todolistId, params }) => ({
        url: `/todo-lists/${todolistId}/tasks`,
        params: { ...params, count: PAGE_SIZE },
      }),
      providesTags: (_res, _err, { todolistId }) => [
        { type: "Task", id: todolistId },
      ],
    }),
    updateTask: builder.mutation<
      BaseResponse,
      { todolistId: string; taskId: string; model: UpdateTaskModel }
    >({
      query: ({ todolistId, taskId, model }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: "PUT",
        body: model,
      }),
      onQueryStarted: async (
        { todolistId, taskId, model },
        { dispatch, queryFulfilled, getState },
      ) => {
        const args = taskApi.util.selectCachedArgsForQuery(
          getState(),
          "getTasks",
        );
        // debugger;
        const putchResults: any[] = [];

        args.forEach((arg) => {
          putchResults.push(
            dispatch(
              taskApi.util.updateQueryData(
                "getTasks",
                { todolistId, params: { page: arg.params.page } },
                (res) => {
                  const index = res.items.findIndex(
                    (task) => task.id === taskId,
                  );
                  if (index !== -1) {
                    res.items[index] = { ...res.items[index], ...model };
                  }
                  // debugger;
                },
              ),
            ),
          );
        });
        // const putchResult = dispatch(
        //   taskApi.util.updateQueryData(
        //     "getTasks",
        //     { todolistId, params: { page: 1 } },
        //     (res) => {
        //       const index = res.items.findIndex((task) => task.id === taskId);
        //       if (index !== -1) {
        //         res.items[index] = { ...res.items[index], ...model };
        //       }
        //       // debugger;
        //     },
        //   ),
        // );
        try {
          await queryFulfilled;
        } catch (e) {
          putchResults.forEach((putchResult) => {
            putchResult.undo();
          });
        }
      },
      invalidatesTags: (_result, _error, arg) => [
        { type: "Task", id: arg.todolistId },
      ],
    }),
    deleteTask: builder.mutation<
      BaseResponse,
      { todolistId: string; taskId: string }
    >({
      query: ({ todolistId, taskId }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "Task", id: arg.todolistId },
      ],
    }),
    createTask: builder.mutation<
      BaseResponse,
      { todolistId: string; title: string }
    >({
      query: ({ todolistId, title }) => ({
        url: `/todo-lists/${todolistId}/tasks`,
        method: "POST",
        body: { title },
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "Task", id: arg.todolistId },
      ],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;

export const _tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`);
  },
  createTask(payload: { todolistId: string; title: string }) {
    const { todolistId, title } = payload;
    return instance.post<BaseResponse<{ item: DomainTask }>>(
      `/todo-lists/${todolistId}/tasks`,
      { title },
    );
  },
  updateTask(payload: {
    todolistId: string;
    taskId: string;
    model: UpdateTaskModel;
  }) {
    const { todolistId, taskId, model } = payload;
    return instance.put<BaseResponse<{ item: DomainTask }>>(
      `/todo-lists/${todolistId}/tasks/${taskId}`,
      model,
    );
  },
  deleteTask(payload: { todolistId: string; taskId: string }) {
    const { todolistId, taskId } = payload;
    return instance.delete<BaseResponse>(
      `/todo-lists/${todolistId}/tasks/${taskId}`,
    );
  },
};

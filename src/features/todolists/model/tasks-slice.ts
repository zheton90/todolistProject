import { tasksApi } from "@/features/todolists/api/tasksApi.ts";
import {
  DomainTask,
  domainTaskSchema,
  UpdateTaskModel,
} from "@/features/todolists/api/tasksApi.types.ts";
import { ResultCode, TaskPriority, TaskStatus } from "@/common/enums/enums.ts";
import {
  createAppSlice,
  handleServerAppError,
  handleServerNetworkError,
} from "@/common/common/utils";
import { setStatusAC } from "@/app/app-slice.ts";
import {
  createTodolistTC,
  deleteTodolistTC,
} from "@/features/todolists/model/todolists-slice.ts";
import { clearDataAC } from "@/common/actions";

export type TaskState = Record<string, DomainTask[]>;

export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState: {} as TaskState,
  selectors: {
    selectTasks: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state[action.payload.id] = [];
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.id];
      })
      .addCase(clearDataAC, (_state, _action) => {
        return {};
      });
  },
  reducers: (create) => ({
    fetchTasksTC: create.asyncThunk(
      async (todolistId: string, thunkAPI) => {
        try {
          thunkAPI.dispatch(setStatusAC({ status: "loading" }));
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const res = await tasksApi.getTasks(todolistId);
          domainTaskSchema.array().parse(res.data.items);
          thunkAPI.dispatch(setStatusAC({ status: "succeeded" }));
          return { todolistId, tasks: res.data.items };
        } catch (error) {
          console.log(error);
          return thunkAPI.rejectWithValue(null);
          thunkAPI.dispatch(setStatusAC({ status: "failed" }));
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolistId] = action.payload.tasks;
        },
      },
    ),
    createTaskTC: create.asyncThunk(
      async (
        { todolistId, title }: { todolistId: string; title: string },
        thunkAPI,
      ) => {
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const res = await tasksApi.createTask({ todolistId, title });

          if (res.data.resultCode === ResultCode.Success) {
            thunkAPI.dispatch(setStatusAC({ status: "succeeded" }));
            return { task: res.data.data.item };
          } else {
            // if (res.data.messages.length) {
            //   thunkAPI.dispatch(setAppErrorAC({ error: res.data.messages[0] }));
            // } else {
            //   thunkAPI.dispatch(
            //     setAppErrorAC({ error: "Some error occurred" }),
            //   );
            // }
            // thunkAPI.dispatch(setStatusAC({ status: "failed" }));
            handleServerAppError(res.data, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue(null);
          }
        } catch (e) {
          handleServerNetworkError(e, thunkAPI.dispatch);
          thunkAPI.rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          if (action.payload) {
            state[action.payload.task.todoListId].push({
              title: action.payload.task.title,
              todoListId: action.payload.task.todoListId,
              startDate: "",
              priority: TaskPriority.Low,
              description: "",
              deadline: "",
              status: TaskStatus.New,
              addedDate: "",
              order: 0,
              id: action.payload.task.id,
            });
          }
        },
      },
    ),
    updateTaskTC: create.asyncThunk(
      async (
        payload: {
          todolistId: string;
          taskId: string;
          model: UpdateTaskModel;
        },
        thunkAPI,
      ) => {
        const { todolistId, taskId, model } = payload;

        try {
          thunkAPI.dispatch(setStatusAC({ status: "loading" }));

          const res = await tasksApi.updateTask({ todolistId, taskId, model });
          if (res.data.resultCode === ResultCode.Success) {
            thunkAPI.dispatch(setStatusAC({ status: "succeeded" }));
            return { task: res.data.data.item };
          } else {
            // if (res.data.messages.length) {
            //   thunkAPI.dispatch(setAppErrorAC({ error: res.data.messages[0] }));
            // } else {
            //   thunkAPI.dispatch(
            //     setAppErrorAC({ error: "Some error occurred" }),
            //   );
            // }
            // thunkAPI.dispatch(setStatusAC({ status: "failed" }));
            // return thunkAPI.rejectWithValue(null);
            handleServerAppError(res.data, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue(null);
            thunkAPI.dispatch(setStatusAC({ status: "failed" }));
          }
        } catch (error) {
          // thunkAPI.dispatch(setAppErrorAC({ error: error.message }));
          // thunkAPI.dispatch(setStatusAC({ status: "failed" }));
          handleServerNetworkError(error, thunkAPI.dispatch);
          return thunkAPI.rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.task.todoListId] = state[
            action.payload.task.todoListId
          ].map((task) =>
            task.id === action.payload.task.id ? action.payload.task : task,
          );
        },
      },
    ),
    deleteTaskTC: create.asyncThunk(
      async (
        { todolistId, taskId }: { todolistId: string; taskId: string },
        thunkAPI,
      ) => {
        try {
          thunkAPI.dispatch(setStatusAC({ status: "loading" }));
          await new Promise((resolve) => setTimeout(resolve, 1000));
          await tasksApi.deleteTask({ taskId, todolistId });
          thunkAPI.dispatch(setStatusAC({ status: "succeeded" }));

          return { todolistId, taskId };
        } catch (e) {
          thunkAPI.dispatch(setStatusAC({ status: "failed" }));
          return thunkAPI.rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          if (action.payload) {
            const index = state[action.payload.todolistId].findIndex(
              (t) => t.id === action.payload.taskId,
            );
            if (index !== -1) state[action.payload.todolistId].splice(index, 1);
          }
        },
      },
    ),

    // changeTaskTitleAC: create.reducer<{
    //   todolistId: string;
    //   taskId: string;
    //   title: string;
    // }>((state, action) => {
    //   const task = state[action.payload.todolistId].find(
    //     (t) => t.id === action.payload.taskId,
    //   );
    //   if (task !== undefined) task.title = action.payload.title;
    // }),
  }),
});

export const { fetchTasksTC, createTaskTC, updateTaskTC, deleteTaskTC } =
  tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
export const selectTasks = tasksSlice.selectors;

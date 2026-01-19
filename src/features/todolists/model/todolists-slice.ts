import { todolistSchema } from "@/features/todolists/api/todolistsApi.types.ts";
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts";
import {
  createAppSlice,
  handleServerAppError,
  handleServerNetworkError,
} from "@/common/common/utils";
import { setStatusAC } from "@/app/app-slice.ts";
import { RequestStatus } from "@/common/types";
import { ResultCode } from "@/common/enums/enums.ts";
import { z } from "zod/v4";
import { clearDataAC } from "@/common/actions";

const filterValues = ["All", "Completed", "Active"] as const;
export const FilterSchema = z.enum(filterValues);
export type FilterType = z.infer<typeof FilterSchema>;
// export type FilterType = "All" | "Completed" | "Active";

export const domainTodolistSchema = todolistSchema.extend({
  filter: z.literal(filterValues),
  entityStatus: z.literal(["idle", "loading", "succeeded", "failed"]),
});

export type DomainTodolist = z.infer<typeof domainTodolistSchema>;

// export type _DomainTodolist = Todolist & {
//   filter: FilterType;
//   entityStatus: RequestStatus;
// };

export const todolistsSlice = createAppSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  selectors: {
    selectTodolists: (state) => state,
  },
  extraReducers: (builder) => {
    builder.addCase(clearDataAC, (_state, _action) => {
      return [];
    });
  },
  reducers: (create) => ({
    fetchTodolistsTC: create.asyncThunk(
      async (_, thunkAPI) => {
        try {
          thunkAPI.dispatch(setStatusAC({ status: "loading" }));
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const res = await todolistsApi.getTodolists();
          // domainTaskSchema.array().parse(res.data.items);
          todolistSchema.array().parse(res.data);
          thunkAPI.dispatch(setStatusAC({ status: "succeeded" }));
          return { todolists: res.data };
        } catch (err) {
          console.log(err);
          thunkAPI.dispatch(setStatusAC({ status: "failed" }));
          return thunkAPI.rejectWithValue(null);
        }
      },
      {
        fulfilled: (_state, action) => {
          return action.payload?.todolists.map((tdl) => ({
            ...tdl,
            filter: "All",
            entityStatus: "idle",
          }));
        },
      },
    ),
    changeTodolistTitleTC: create.asyncThunk(
      async ({ title, id }: { title: string; id: string }, thunkAPI) => {
        try {
          thunkAPI.dispatch(setStatusAC({ status: "loading" }));
          thunkAPI.dispatch(
            changeEntityStatusAC({ id, entityStatus: "loading" }),
          );
          const res = await todolistsApi.changeTodolistTitle({ title, id });
          if (res.data.resultCode === ResultCode.Error) {
            handleServerAppError(res.data, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue(null);
          }
          return { title, id };
        } catch (e) {
          handleServerNetworkError(e, thunkAPI.dispatch);
          thunkAPI.dispatch(
            changeEntityStatusAC({ id, entityStatus: "failed" }),
          );
          return thunkAPI.rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex(
            (todolist) => todolist.id === action.payload.id,
          );
          if (index !== -1) {
            state[index].title = action.payload.title;
          }
        },
      },
    ),
    deleteTodolistTC: create.asyncThunk(
      async ({ id }: { id: string }, thunkAPI) => {
        try {
          thunkAPI.dispatch(setStatusAC({ status: "loading" }));
          thunkAPI.dispatch(
            changeEntityStatusAC({ id, entityStatus: "loading" }),
          );
          await new Promise((resolve) => setTimeout(resolve, 2000));
          const res = await todolistsApi.deleteTodolist(id);
          thunkAPI.dispatch(
            changeEntityStatusAC({ id, entityStatus: "succeeded" }),
          );

          if (res.data.resultCode === ResultCode.Error) {
            handleServerAppError(res.data, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue(null);
          }

          thunkAPI.dispatch(setStatusAC({ status: "succeeded" }));
          return { id };
        } catch (e) {
          thunkAPI.dispatch(setStatusAC({ status: "failed" }));
          thunkAPI.dispatch(
            changeEntityStatusAC({ id, entityStatus: "failed" }),
          );
          handleServerNetworkError(e, thunkAPI.dispatch);
          thunkAPI.dispatch(
            changeEntityStatusAC({ id, entityStatus: "failed" }),
          );
          return thunkAPI.rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((tdl) => tdl.id === action.payload.id);
          if (index !== -1) state.splice(index, 1);
        },
      },
    ),
    createTodolistTC: create.asyncThunk(
      async ({ title }: { title: string }, thunkAPI) => {
        try {
          const res = await todolistsApi.createTodolist(title);
          if (res.data.resultCode === ResultCode.Success) {
            thunkAPI.dispatch(setStatusAC({ status: "succeeded" }));
            return { title, id: res.data.data.item.id };
          } else {
            handleServerAppError(res.data, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue(null);
          }
        } catch (err) {
          handleServerNetworkError(err, thunkAPI.dispatch);
          return thunkAPI.rejectWithValue(err);
        }
      },
      {
        fulfilled: (state, action) => {
          state.unshift({
            title: action.payload.title,
            id: action.payload.id,
            addedDate: "",
            order: 0,
            filter: "All",
            entityStatus: "idle",
          });
        },
      },
    ),
    changeTodolistFilterAC: create.reducer<{
      id: string;
      filter: FilterType;
    }>((state, action) => {
      const todolist = state.find(
        (todolist) => todolist.id === action.payload.id,
      );
      if (todolist) {
        todolist.filter = action.payload.filter;
      }
    }),
    changeEntityStatusAC: create.reducer<{
      id: string;
      entityStatus: RequestStatus;
    }>((state, action) => {
      const todolist = state.find(
        (todolist) => todolist.id === action.payload.id,
      );
      if (todolist) {
        todolist.entityStatus = action.payload.entityStatus;
      }
    }),
  }),
});

export const {
  changeTodolistFilterAC,
  fetchTodolistsTC,
  changeTodolistTitleTC,
  deleteTodolistTC,
  createTodolistTC,
  changeEntityStatusAC,
} = todolistsSlice.actions;

export const todolistsReducer = todolistsSlice.reducer;
export const { selectTodolists } = todolistsSlice.selectors;

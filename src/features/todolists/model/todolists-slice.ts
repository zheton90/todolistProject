import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts";
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts";

export type FilterType = "All" | "Completed" | "Active";

export type DomainTodolist = Todolist & {
  filter: FilterType;
};

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  selectors: {
    selectTodolists: (state) => state,
  },
  reducers: (create) => ({
    // fetchTodolistsAC: create.reducer<{ todolists: DomainTodolist[] }>(
    //   (_state, action) => {
    //     return action.payload.todolists;
    //   },
    // ),
    // deleteTodolistAC: create.reducer<{ id: string }>((state, action) => {}),

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
    // createTodolistAC: create.preparedReducer(
    //   (title: string) => ({
    //     payload: { title, id: nanoid() },
    //   }),
    //   (state, action) => {
    //     state.push({
    //       ...action.payload,
    //       addedDate: "",
    //       order: 0,
    //       filter: "All",
    //     });
    //   },
    // ),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolistsTC.fulfilled, (_state, action) => {
        return action.payload?.todolists.map((tdl) => ({
          ...tdl,
          filter: "All",
        }));
      })
      .addCase(fetchTodolistsTC.rejected, () => {
        console.log("errror");
      })
      .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
        const index = state.findIndex(
          (todolist) => todolist.id === action.payload.id,
        );
        if (index !== -1) {
          state[index].title = action.payload.title;
        }
      })
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        if (action.payload) {
          state.push({
            title: action.payload.title,
            id: action.payload.id,
            addedDate: "",
            order: 0,
            filter: "All",
          });
        }
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        const index = state.findIndex((tdl) => tdl.id === action.payload.id);
        if (index !== -1) state.splice(index, 1);
      });
  },
});

export const fetchTodolistsTC = createAsyncThunk(
  `${todolistsSlice.name}/fetchTodolists`,
  async (_, thunkAPI) => {
    try {
      const res = await todolistsApi.getTodolists();
      return { todolists: res.data };
      // thunkAPI.dispatch(
      //   fetchTodolistsAC({
      //     todolists: res.data.map((tdl) => ({ ...tdl, filter: "All" })),
      //   }),
      // );
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const changeTodolistTitleTC = createAsyncThunk(
  `${todolistsSlice.name}/changeTodolistTitle`,
  async (payload: { id: string; title: string }, thunkAPI) => {
    try {
      await todolistsApi.changeTodolistTitle(payload);
      return payload;
    } catch (err) {
      thunkAPI.rejectWithValue(err);
    }
  },
);

export const createTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/createTodolist`,
  async ({ title }: { title: string }, thunkAPI) => {
    try {
      const res = await todolistsApi.createTodolist(title);
      return { title, id: res.data.data.item.id };
    } catch (err) {
      thunkAPI.rejectWithValue(err);
    }
  },
);

export const deleteTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/deleteTodolist`,
  async ({ id }: { id: string }, thunkAPI) => {
    try {
      await todolistsApi.deleteTodolist(id);
      return { id };
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  },
);

export const { changeTodolistFilterAC } = todolistsSlice.actions;

export const todolistsReducer = todolistsSlice.reducer;
export const selectTodolists = todolistsSlice.selectors;

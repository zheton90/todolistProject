import { createSlice, nanoid } from "@reduxjs/toolkit";

export type FilterType = "All" | "Completed" | "Active";

export type Todolist = {
  id: string;
  title: string;
  filter: FilterType;
};

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as Todolist[],
  selectors: {
    selectTodolists: (state) => state,
  },
  reducers: (create) => ({
    deleteTodolistAC: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex((tdl) => tdl.id === action.payload.id);
      if (index !== -1) state.splice(index, 1);
    }),
    changeTodolistTitleAC: create.reducer<{
      id: string;
      title: string;
    }>((state, action) => {
      const index = state.findIndex((tdl) => tdl.id === action.payload.id);
      if (index !== -1) state[index].title = action.payload.title;
    }),
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
    createTodolistAC: create.preparedReducer(
      (title: string) => ({
        payload: { title, id: nanoid() },
      }),
      (state, action) => {
        state.push({ ...action.payload, filter: "All" });
      },
    ),
  }),
});

export const {
  deleteTodolistAC,
  createTodolistAC,
  changeTodolistTitleAC,
  changeTodolistFilterAC,
} = todolistsSlice.actions;
export const todolistsReducer = todolistsSlice.reducer;
export const selectTodolists = todolistsSlice.selectors;

// export const deleteTodolistAC = createAction("todolists/delete_todolist");

// export const createTodolistAC = createAction(
//   "todolists/create_todolist",
//   (title: string) => {
//     return { payload: { title, id: nanoid() } };
//   },
// );

// export const changeTodolistTitleAC = createAction<{
//   id: string;
//   title: string;
// }>("todolists/change_todolist_title");

// export const changeTodolistFilterAC = createAction("todolists/change_todolist_filter");

// export const _todolistsReducer = createReducer(_initialState, (builder) => {
//   builder
//     // .addCase(deleteTodolistAC, (state, action) => {})
//     // .addCase(createTodolistAC, (state, action) => {})
//     // .addCase(changeTodolistTitleAC, (state, action) => {})
//     // .addCase(changeTodolistFilterAC, (state, action) => {
//
//     });
// });

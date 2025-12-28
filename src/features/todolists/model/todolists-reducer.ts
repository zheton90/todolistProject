import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";

export type FilterType = "All" | "Completed" | "Active";

export type Todolist = {
  id: string;
  title: string;
  filter: FilterType;
};

const initialState: Todolist[] = [];

export const deleteTodolistAC = createAction<{ id: string }>(
  "todolists/delete_todolist",
);

export const createTodolistAC = createAction(
  "todolists/create_todolist",
  (title: string) => {
    return { payload: { title, id: nanoid() } };
  },
);

export const changeTodolistTitleAC = createAction<{
  id: string;
  title: string;
}>("todolists/change_todolist_title");

export const changeTodolistFilterAC = createAction<{
  id: string;
  filter: FilterType;
}>("todolists/change_todolist_filter");

export const todolistsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(deleteTodolistAC, (state, action) => {
      const index = state.findIndex((tdl) => tdl.id === action.payload.id);
      if (index !== -1) state.splice(index, 1);
    })
    .addCase(createTodolistAC, (state, action) => {
      state.push({ ...action.payload, filter: "All" });
    })
    .addCase(changeTodolistTitleAC, (state, action) => {
      const index = state.findIndex((tdl) => tdl.id === action.payload.id);
      if (index !== -1) state[index].title = action.payload.title;
    })
    .addCase(changeTodolistFilterAC, (state, action) => {
      const todolist = state.find(
        (todolist) => todolist.id === action.payload.id,
      );
      if (todolist) {
        todolist.filter = action.payload.filter;
      }
    });
});

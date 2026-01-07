import { createTodolistAC, deleteTodolistAC } from "./todolists-slice.ts";
import { createSlice, nanoid } from "@reduxjs/toolkit";

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TaskState = Record<string, Task[]>;

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TaskState,
  selectors: {
    selectTasks: (state) => state,
  },
  reducers: (create) => ({
    deleteTaskAC: create.reducer<{
      todolistId: string;
      taskId: string;
    }>((state, action) => {
      const index = state[action.payload.todolistId].findIndex(
        (t) => t.id === action.payload.taskId,
      );
      if (index !== -1) state[action.payload.todolistId].splice(index, 1);
    }),
    changeTaskStatusAC: create.reducer<{
      todolistId: string;
      taskId: string;
      isDone: boolean;
    }>((state, action) => {
      const task = state[action.payload.todolistId].find(
        (t) => t.id === action.payload.taskId,
      );
      if (task !== undefined) task.isDone = action.payload.isDone;
    }),
    changeTaskTitleAC: create.reducer<{
      todolistId: string;
      taskId: string;
      title: string;
    }>((state, action) => {
      const task = state[action.payload.todolistId].find(
        (t) => t.id === action.payload.taskId,
      );
      if (task !== undefined) task.title = action.payload.title;
    }),
    createTaskAC: create.reducer<{
      todolistId: string;
      title: string;
    }>((state, action) => {
      state[action.payload.todolistId].push({
        id: nanoid(),
        title: action.payload.title,
        isDone: false,
      });
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistAC, (state, action) => {
        state[action.payload.id] = [];
      })
      .addCase(deleteTodolistAC, (state, action) => {
        delete state[action.payload.id];
      });
  },
});

export const {
  deleteTaskAC,
  createTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
} = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
export const selectTasks = tasksSlice.selectors;

// const initialState: TaskState = {};

// export const deleteTaskAC = createAction<{
//   todolistId: string;
//   taskId: string;
// }>("tasks/delete_task");

// export const createTaskAC = createAction("tasks/create_task");

// export const changeTaskStatusAC = createAction("tasks/change_task_status");

// export const changeTaskTitleAC = createAction("tasks/change_task_title");

// export const tasksReducer = createReducer(initialState,
//     // .addCase(deleteTaskAC, (state, action) => {})
//     // .addCase(createTaskAC, (state, action) => {})
//     // .addCase(changeTaskTitleAC, (state, action) => {});
//   // .addCase(changeTaskStatusAC, (state, action) => {});
// });

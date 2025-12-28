import { createTodolistAC, deleteTodolistAC } from "./todolists-reducer.ts";
import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TaskState = Record<string, Task[]>;

const initialState: TaskState = {};

export const deleteTaskAC = createAction<{
  todolistId: string;
  taskId: string;
}>("tasks/delete_task");

export const createTaskAC = createAction<{
  todolistId: string;
  title: string;
}>("tasks/create_task");

export const changeTaskStatusAC = createAction<{
  todolistId: string;
  taskId: string;
  isDone: boolean;
}>("tasks/change_task_status");

export const changeTaskTitleAC = createAction<{
  todolistId: string;
  taskId: string;
  title: string;
}>("tasks/change_task_title");

export const tasksReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createTodolistAC, (state, action) => {
      state[action.payload.id] = [];
    })
    .addCase(deleteTodolistAC, (state, action) => {
      delete state[action.payload.id];
    })
    .addCase(deleteTaskAC, (state, action) => {
      const index = state[action.payload.todolistId].findIndex(
        (t) => t.id === action.payload.taskId,
      );
      if (index !== -1) state[action.payload.todolistId].splice(index, 1);
    })
    .addCase(createTaskAC, (state, action) => {
      state[action.payload.todolistId].push({
        id: nanoid(),
        title: action.payload.title,
        isDone: false,
      });
    })
    .addCase(changeTaskTitleAC, (state, action) => {
      const task = state[action.payload.todolistId].find(
        (t) => t.id === action.payload.taskId,
      );
      if (task !== undefined) task.title = action.payload.title;
    })
    .addCase(changeTaskStatusAC, (state, action) => {
      const task = state[action.payload.todolistId].find(
        (t) => t.id === action.payload.taskId,
      );
      if (task !== undefined) task.isDone = action.payload.isDone;
    });
});

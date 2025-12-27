import { TaskState } from "../App";
import { CreateTodolistAT, DeleteTodolistAT } from "./todolists-reducer.ts";
import { v1 } from "uuid";

const initialState: TaskState = {};

export type deleteTaskAT = ReturnType<typeof deleteTaskAC>;
export type createTaskAT = ReturnType<typeof createTaskAC>;
export type changeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>;
export type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>;

type Actions =
  | CreateTodolistAT
  | DeleteTodolistAT
  | deleteTaskAT
  | createTaskAT
  | changeTaskStatusAT
  | changeTaskTitleAT;

export const tasksReducer = (
  state: TaskState = initialState,
  action: Actions,
): TaskState => {
  switch (action.type) {
    case "create_todolist": {
      return { ...state, [action.payload.id]: [] };
    }
    case "delete_todolist": {
      delete state[action.payload.id];
      return { ...state };
    }
    case "delete_task": {
      return {
        ...state,
        [action.payload.todolistId]: [
          ...state[action.payload.todolistId].filter(
            (task) => task.id !== action.payload.taskId,
          ),
        ],
      };
    }
    case "create_task": {
      return {
        ...state,
        [action.payload.todolistId]: [
          ...(state[action.payload.todolistId] || []),
          { id: v1(), title: action.payload.title, isDone: false },
        ],
      };
    }

    case "change_task_status": {
      return {
        ...state,
        [action.payload.todolistId]: [
          ...state[action.payload.todolistId].map((task) =>
            task.id === action.payload.taskId
              ? { ...task, isDone: action.payload.isDone }
              : task,
          ),
        ],
      };
    }

    case "change_task_title": {
      return {
        ...state,
        [action.payload.todolistId]: [
          ...state[action.payload.todolistId].map((task) =>
            task.id === action.payload.taskId
              ? { ...task, title: action.payload.title }
              : task,
          ),
        ],
      };
    }
    default:
      return state;
  }
};

export const deleteTaskAC = ({
  todolistId,
  taskId,
}: {
  todolistId: string;
  taskId: string;
}) => {
  return { type: "delete_task", payload: { todolistId, taskId } } as const;
};

export const createTaskAC = ({
  todolistId,
  title,
}: {
  todolistId: string;
  title: string;
}) => {
  return { type: "create_task", payload: { todolistId, title } } as const;
};

export const changeTaskStatusAC = ({
  todolistId,
  taskId,
  isDone,
}: {
  todolistId: string;
  taskId: string;
  isDone: boolean;
}) => {
  return {
    type: "change_task_status",
    payload: { todolistId, taskId, isDone },
  } as const;
};

export const changeTaskTitleAC = ({
  todolistId,
  taskId,
  title,
}: {
  todolistId: string;
  taskId: string;
  title: string;
}) => {
  return {
    type: "change_task_title",
    payload: { todolistId, taskId, title },
  } as const;
};

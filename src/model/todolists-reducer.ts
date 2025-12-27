import { FilterType, Todolist } from "../app/App.tsx";
import { v1 } from "uuid";

const initialState: Todolist[] = [];

export type DeleteTodolistAT = ReturnType<typeof deleteTodolistAC>;
export type CreateTodolistAT = ReturnType<typeof createTodolistAC>;
export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>;
export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>;

type Actions =
  | DeleteTodolistAT
  | CreateTodolistAT
  | ChangeTodolistTitleAT
  | ChangeTodolistFilterAT;

export const todolistsReducer = (
  state: Todolist[] = initialState,
  action: Actions,
): Todolist[] => {
  switch (action.type) {
    case "delete_todolist": {
      return state.filter((tdl) => tdl.id !== action.payload.id);
    }

    case "create_todolist": {
      return [
        ...state,
        { id: action.payload.id, title: action.payload.title, filter: "All" },
      ];
    }

    case "change_todolist_title": {
      return [
        ...state.map((tdl) =>
          tdl.id === action.payload.id
            ? { ...tdl, title: action.payload.title }
            : tdl,
        ),
      ];
    }

    case "change_todolist_filter": {
      return [
        ...state.map((tdl) =>
          tdl.id === action.payload.id
            ? { ...tdl, filter: action.payload.filter }
            : tdl,
        ),
      ];
    }

    default:
      return state;
  }
};

export const deleteTodolistAC = (id: string) => {
  return { type: "delete_todolist", payload: { id } } as const;
};

export const createTodolistAC = (title: string) => {
  const id = v1();
  return { type: "create_todolist", payload: { title, id } } as const;
};

export const changeTodolistTitleAC = ({
  id,
  title,
}: {
  id: string;
  title: string;
}) => {
  return { type: "change_todolist_title", payload: { id, title } } as const;
};

export const changeTodolistFilterAC = ({
  id,
  filter,
}: {
  id: string;
  filter: FilterType;
}) => {
  return { type: "change_todolist_filter", payload: { id, filter } } as const;
};

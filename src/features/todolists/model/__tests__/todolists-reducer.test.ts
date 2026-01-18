import { beforeEach, expect, test } from "vitest";
import {
  changeTodolistFilterAC,
  deleteTodolistTC,
  DomainTodolist,
  todolistsReducer,
  todolistsSlice,
} from "../todolists-slice.ts";
import { nanoid } from "@reduxjs/toolkit";

let todolistId1: string;
let todolistId2: string;
let startState: DomainTodolist[] = [];

beforeEach(() => {
  todolistId1 = nanoid();
  todolistId2 = nanoid();

  startState = [
    {
      id: todolistId1,
      title: "What to learn",
      filter: "All",
      entityStatus: "idle",
      order: 0,
      addedDate: "",
    },
    {
      id: todolistId2,
      title: "What to buy",
      filter: "All",
      entityStatus: "idle",
      order: 0,
      addedDate: "",
    },
  ];
});

test("correct todolist should be deleted", () => {
  const endState = todolistsSlice.reducer(
    startState,
    deleteTodolistTC.fulfilled({ id: todolistId1 }),
  );

  // dispatch(deleteTodolistTC({ id: todolistId1 }));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be created", () => {
  const title = "New todolist";
  const endState = todolistsReducer(startState, createTodolistAC(title));

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(title);
});

test("correct todolist should change its title", () => {
  const title = "New title";
  const endState = todolistsReducer(
    startState,
    changeTodolistTitleAC({ id: todolistId2, title }),
  );

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(title);
});

test("correct todolist should change its filter", () => {
  const filter = "Completed";
  const endState = todolistsReducer(
    startState,
    changeTodolistFilterAC({ id: todolistId2, filter }),
  );

  expect(endState[0].filter).toBe("All");
  expect(endState[1].filter).toBe(filter);
});

import { Grid, Paper } from "@mui/material";
import { TodolistItem } from "@/features/todolists/ui/TodolistItem/TodolistItem/TodolistItem.tsx";
import { useAppSelector } from "@/common/hooks/useAppSelector.ts";
import {
  fetchTodolistsTC,
  selectTodolists,
} from "@/features/todolists/model/todolists-slice.ts";
import { useEffect } from "react";
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts";

export const Todolists = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodolistsTC());
  }, []);

  const todolists = useAppSelector(selectTodolists);

  return todolists.map((todolist) => {
    return (
      <Grid key={todolist.id}>
        <Paper sx={{ p: "0 20px 20px 20px" }}>
          <TodolistItem key={todolist.id} todolist={todolist} />
        </Paper>
      </Grid>
    );
  });
};

import { Grid, Paper } from "@mui/material";
import { TodolistItem } from "@/features/todolists/ui/TodolistItem/TodolistItem/TodolistItem.tsx";
import { useAppSelector } from "@/common/hooks/useAppSelector.ts";
import { selectTodolists } from "@/features/todolists/model/todolists-slice.ts";
import { useEffect } from "react";
// import { selectTodolists } from "@/features/todolists/model/_todolists-selectors.ts";

export const Todolists = () => {
  useEffect(() => {}, []);

  const todolists = useAppSelector(selectTodolists.selectTodolists);

  return todolists.map((todolist) => {
    return (
      <Grid key={todolist.id}>
        <Paper sx={{ p: "0 20px 20px 20px" }}>
          <TodolistItem todolist={todolist} />
        </Paper>
      </Grid>
    );
  });
};

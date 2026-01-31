import { Grid, Paper } from "@mui/material";
import { TodolistItem } from "@/features/todolists/ui/TodolistItem/TodolistItem/TodolistItem.tsx";
import { useGetTodolistsQuery } from "@/features/todolists/api/todolistsApi.ts";

export const Todolists = () => {
  const { data: todolists } = useGetTodolistsQuery();

  return todolists?.map((todolist) => {
    return (
      <Grid key={todolist.id}>
        <Paper sx={{ p: "0 20px 20px 20px" }}>
          <TodolistItem key={todolist.id} todolist={todolist} />
        </Paper>
      </Grid>
    );
  });
};

import { Grid, Paper } from "@mui/material";
import { TodolistItem } from "@/features/todolists/ui/TodolistItem/TodolistItem/TodolistItem.tsx";
import { useGetTodolistsQuery } from "@/features/todolists/api/todolistsApi.ts";
import Box from "@mui/material/Box";
import { TodolistSkeleton } from "@/features/todolists/ui/TodolistItem/TodolistSkeleton/TodolistSkeleton.tsx";
import { conteinerSx } from "@/common/styles/container.styles.ts";

export const Todolists = () => {
  const { data: todolists, isLoading } = useGetTodolistsQuery();

  if (isLoading) {
    return (
      <Box sx={conteinerSx} style={{ gap: "32px" }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </Box>
    );
  }

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

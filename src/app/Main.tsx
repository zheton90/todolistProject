import { Container, Grid } from "@mui/material";
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm.tsx";
import { createTodolistAC } from "@/features/todolists/model/todolists-reducer.ts";
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts";
import { Todolists } from "@/features/todolists/ui/TodolistItem/Todolists.tsx";

export const Main = () => {
  const dispatch = useAppDispatch();

  const createTodolistHandler = (title: string) => {
    dispatch(createTodolistAC(title));
  };

  return (
    <Container maxWidth="lg">
      <Grid container sx={{ mb: "30px" }}>
        <CreateItemForm createItem={createTodolistHandler} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  );
};

import { Container, Grid } from "@mui/material";
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm.tsx";
import { Todolists } from "@/features/todolists/ui/TodolistItem/Todolists.tsx";
import { useAppSelector } from "@/common/hooks/useAppSelector.ts";
// import { selectIsLoggedIn } from "@/features/auth/model/auth-slice.ts";
import { Navigate } from "react-router";
import { useCreateTodolistMutation } from "@/features/todolists/api/todolistsApi.ts";
import { selectIsLoggedIn } from "@/app/app-slice.ts";

export const Main = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const [addTodolist] = useCreateTodolistMutation();

  const createTodolistHandler = (title: string) => {
    addTodolist(title);
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

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

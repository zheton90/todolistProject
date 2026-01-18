import { Container, Grid } from "@mui/material";
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm.tsx";
import { createTodolistTC } from "@/features/todolists/model/todolists-slice.ts";
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts";
import { Todolists } from "@/features/todolists/ui/TodolistItem/Todolists.tsx";
import { useAppSelector } from "@/common/hooks/useAppSelector.ts";
import { selectIsLoggedIn } from "@/features/auth/model/auth-slice.ts";
import { Navigate } from "react-router";

export const Main = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const createTodolistHandler = (title: string) => {
    dispatch(createTodolistTC({ title }));
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

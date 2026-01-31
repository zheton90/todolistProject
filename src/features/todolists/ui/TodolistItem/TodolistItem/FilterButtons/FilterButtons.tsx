import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import {
  changeTodolistFilterAC,
  DomainTodolist,
  FilterValues,
} from "@/features/todolists/model/todolists-slice.ts";
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts";
import { conteinerSx } from "@/common/styles/container.styles.ts";

type Props = {
  todolist: DomainTodolist;
};

export const FilterButtons = ({ todolist }: Props) => {
  const { filter, id: todolistId } = todolist;
  const dispatch = useAppDispatch();

  const changeFiler = (filter: FilterValues) => {
    dispatch(changeTodolistFilterAC({ id: todolistId, filter }));
  };

  return (
    <Box sx={conteinerSx}>
      <Button
        size="small"
        variant={filter === "all" ? "contained" : "outlined"}
        color="primary"
        onClick={() => changeFiler("all")}
      >
        All
      </Button>
      <Button
        size="small"
        variant={filter === "active" ? "contained" : "outlined"}
        color="primary"
        onClick={() => changeFiler("active")}
      >
        Active
      </Button>
      <Button
        size="small"
        variant={filter === "completed" ? "contained" : "outlined"}
        color="primary"
        onClick={() => changeFiler("completed")}
      >
        Completed
      </Button>
    </Box>
  );
};

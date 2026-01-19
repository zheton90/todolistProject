import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import {
  changeTodolistFilterAC,
  DomainTodolist,
  FilterType,
} from "@/features/todolists/model/todolists-slice.ts";
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts";
import { conteinerSx } from "@/common/styles/container.styles.ts";

type Props = {
  todolist: DomainTodolist;
};

export const FilterButtons = ({ todolist }: Props) => {
  const { filter, id: todolistId } = todolist;
  const dispatch = useAppDispatch();

  const changeFiler = (filter: FilterType) => {
    dispatch(changeTodolistFilterAC({ id: todolistId, filter }));
  };

  return (
    <Box sx={conteinerSx}>
      <Button
        size="small"
        variant={filter === "All" ? "contained" : "outlined"}
        color="primary"
        onClick={() => changeFiler("All")}
      >
        All
      </Button>
      <Button
        size="small"
        variant={filter === "Active" ? "contained" : "outlined"}
        color="primary"
        onClick={() => changeFiler("Active")}
      >
        Active
      </Button>
      <Button
        size="small"
        variant={filter === "Completed" ? "contained" : "outlined"}
        color="primary"
        onClick={() => changeFiler("Completed")}
      >
        Completed
      </Button>
    </Box>
  );
};

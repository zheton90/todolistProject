import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  changeTodolistTitleTC,
  deleteTodolistTC,
  DomainTodolist,
} from "@/features/todolists/model/todolists-slice.ts";
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts";
import s from "./TodolistTitle.module.css";

type Props = {
  todolist: DomainTodolist;
};

export const TodolistTitle = ({ todolist }: Props) => {
  const { title, id: todolistId, entityStatus } = todolist;
  const dispatch = useAppDispatch();

  const deleteTodolistHandler = () => {
    dispatch(deleteTodolistTC({ id: todolistId }));
  };

  const changeTodolistTitleHandler = (title: string) => {
    dispatch(changeTodolistTitleTC({ id: todolistId, title }));
  };

  return (
    <div className={s.container}>
      <EditableSpan title={title} onChange={changeTodolistTitleHandler} />
      <IconButton
        onClick={deleteTodolistHandler}
        disabled={entityStatus === "loading"}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

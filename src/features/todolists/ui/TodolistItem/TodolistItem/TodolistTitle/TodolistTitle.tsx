import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  changeTodolistTitleAC,
  deleteTodolistAC,
  Todolist,
} from "@/features/todolists/model/todolists-slice.ts";
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts";
import s from "./TodolistTitle.module.css";

type Props = {
  todolist: Todolist;
};

export const TodolistTitle = ({ todolist }: Props) => {
  const { title, id: todolistId } = todolist;
  const dispatch = useAppDispatch();

  const deleteTodolistHandler = () => {
    dispatch(deleteTodolistAC({ id: todolistId }));
    dispatch(deleteTodolistAC({ id: todolistId }));
  };

  const changeTodolistTitleHandler = (title: string) => {
    dispatch(changeTodolistTitleAC({ id: todolistId, title }));
  };

  return (
    <div className={s.container}>
      <EditableSpan title={title} onChange={changeTodolistTitleHandler} />
      <IconButton onClick={deleteTodolistHandler}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

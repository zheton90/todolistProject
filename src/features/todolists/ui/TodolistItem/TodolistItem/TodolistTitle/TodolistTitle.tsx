import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts";
import s from "./TodolistTitle.module.css";
import {
  todolistsApi,
  useRemoveTodolistMutation,
  useUpdateTodolistTitleMutation,
} from "@/features/todolists/api/todolistsApi.ts";
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts";
import { RequestStatus } from "@/common/types";

type Props = {
  todolist: DomainTodolist;
};

export const TodolistTitle = ({ todolist }: Props) => {
  const { title, id: todolistId, entityStatus } = todolist;
  const [removeTodolist] = useRemoveTodolistMutation();
  const [updateTodolistTitle] = useUpdateTodolistTitleMutation();
  const dispatch = useAppDispatch();

  const changeTodolistsStatus = (entityStatus: RequestStatus) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
        const todolist = state.find((todolist) => todolist.id === todolistId);
        if (todolist) {
          todolist.entityStatus = entityStatus;
        }
      }),
    );
  };

  const deleteTodolistHandler = () => {
    changeTodolistsStatus("loading");
    removeTodolist(todolistId)
      .unwrap()
      .catch(() => {
        changeTodolistsStatus("idle");
      });
  };

  const changeTodolistTitleHandler = (title: string) => {
    updateTodolistTitle({ id: todolistId, title });
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

import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import s from "./TodolistTitle.module.css";
import {
  todolistsApi,
  useRemoveTodolistMutation,
  useUpdateTodolistTitleMutation,
} from "@/features/todolists/api/todolistsApi.ts";
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts";
// import { RequestStatus } from "@/common/types";
import { DomainTodolist } from "@/features/todolists/lib";

type Props = {
  todolist: DomainTodolist;
};

export const TodolistTitle = ({ todolist }: Props) => {
  const { title, id: todolistId, entityStatus } = todolist;
  const [removeTodolist] = useRemoveTodolistMutation();
  const [updateTodolistTitle] = useUpdateTodolistTitleMutation();
  const dispatch = useAppDispatch();

  // const changeTodolistsStatus = (entityStatus: RequestStatus) => {
  //   dispatch(
  //     todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
  //       const todolist = state.find(
  //         (todolist: DomainTodolist) => todolist.id === todolistId,
  //       );
  //       if (todolist) {
  //         todolist.entityStatus = entityStatus;
  //       }
  //     }),
  //   );
  // };

  const deleteTodolistHandler = async () => {
    // const putchResult = dispatch(
    //   todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
    //     const index = state.findIndex((todo) => todo.id === todolistId);
    //     if (index !== -1) state.splice(index, 1);
    //   }),
    // );
    //
    // try {
    //   await removeTodolist(todolistId).unwrap();
    // } catch {
    //   putchResult.undo();
    // }

    removeTodolist(todolistId);

    // changeTodolistsStatus("loading");
    // removeTodolist(todolistId)
    //   .unwrap()
    //   .catch(() => {
    //     changeTodolistsStatus("idle");
    //   });
  };

  const changeTodolistTitleHandler = async (title: string) => {
    const putchResult = dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
        const index = state.findIndex((todo) => todo.id === todolistId);
        if (index !== -1) state[index].title = title;
      }),
    );

    try {
      await updateTodolistTitle({ id: todolistId, title }).unwrap();
    } catch {
      putchResult.undo();
    }
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

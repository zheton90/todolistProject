import { Checkbox, IconButton, ListItem } from "@mui/material";
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  deleteTaskAC,
  Task,
} from "@/features/todolists/model/tasks-reducer.ts";
import { ChangeEvent } from "react";
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts";
import { getListItemsSx } from "@/features/todolists/ui/TodolistItem/TodolistItem/Tasks/TodolistItem/TaskItem.styles.ts";

type Props = {
  task: Task;
  todolistId: string;
};
export const TaskItem = ({ task, todolistId }: Props) => {
  const dispatch = useAppDispatch();

  const changeTaskTitleHandler = (title: string) => {
    dispatch(changeTaskTitleAC({ todolistId, taskId: task.id, title }));
  };
  const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeTaskStatusAC({
        isDone: e.currentTarget.checked,
        taskId: task.id,
        todolistId,
      }),
    );
  };

  const deleteTaskHandler = () => {
    dispatch(deleteTaskAC({ todolistId, taskId: task.id }));
  };
  return (
    <ListItem key={task.id} sx={getListItemsSx(task.isDone)}>
      <div>
        <Checkbox onChange={changeStatusHandler} checked={task.isDone} />
        <span className={task.isDone ? "is-done" : ""}>
          <EditableSpan title={task.title} onChange={changeTaskTitleHandler} />
        </span>
      </div>

      <IconButton onClick={deleteTaskHandler}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

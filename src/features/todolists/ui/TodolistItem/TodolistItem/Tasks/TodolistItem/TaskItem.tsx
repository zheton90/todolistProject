import { Checkbox, IconButton, ListItem } from "@mui/material";
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx";
import DeleteIcon from "@mui/icons-material/Delete";
import { ChangeEvent } from "react";
import { getListItemsSx } from "@/features/todolists/ui/TodolistItem/TodolistItem/Tasks/TodolistItem/TaskItem.styles.ts";
import { DomainTask } from "@/features/todolists/api/tasksApi.types.ts";
import { TaskStatus } from "@/common/enums/enums.ts";
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "@/features/todolists/api/tasksApi.ts";

type Props = {
  task: DomainTask;
  todolistId: string;
};
export const TaskItem = ({ task, todolistId }: Props) => {
  const [updateTask] = useUpdateTaskMutation();
  const [deeteTask] = useDeleteTaskMutation();

  const changeTaskTitleHandler = (title: string) => {
    const model = {
      description: task.description,
      title,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      status: task.status,
    };

    updateTask({ todolistId, taskId: task.id, model });
  };

  const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked;
    const model = {
      description: task.description,
      title: task.title,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      status: newStatusValue ? TaskStatus.Completed : TaskStatus.New,
    };
    updateTask({ todolistId, taskId: task.id, model });
  };

  const deleteTaskHandler = () => {
    deeteTask({ todolistId, taskId: task.id });
  };
  return (
    <ListItem
      key={task.id}
      sx={getListItemsSx(task.status === TaskStatus.Completed)}
    >
      <div>
        <Checkbox
          onChange={changeStatusHandler}
          checked={task.status === TaskStatus.Completed}
        />
        <span className={task.status === TaskStatus.Completed ? "is-done" : ""}>
          <EditableSpan title={task.title} onChange={changeTaskTitleHandler} />
        </span>
      </div>
      <span>{new Date(task.addedDate).toLocaleDateString()}</span>

      <IconButton onClick={deleteTaskHandler}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

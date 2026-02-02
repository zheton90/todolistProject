import { List } from "@mui/material";
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts";
import { TaskItem } from "@/features/todolists/ui/TodolistItem/TodolistItem/Tasks/TodolistItem/TaskItem.tsx";
import { DomainTask } from "@/features/todolists/api/tasksApi.types.ts";
import { TaskStatus } from "@/common/enums/enums.ts";
import { useGetTasksQuery } from "@/features/todolists/api/tasksApi.ts";
import { TasksSkeleton } from "@/features/todolists/ui/TodolistItem/TodolistItem/Tasks/TasksSkeleton/TasksSkeleton.tsx";

type Props = {
  todolist: DomainTodolist;
};

export const Tasks = ({ todolist }: Props) => {
  const { filter, id: todolistId } = todolist;

  const { data, isLoading } = useGetTasksQuery(todolistId);

  let filteredTask = data?.items;
  if (filter === "active")
    filteredTask = filteredTask?.filter(
      (t: DomainTask) => t.status === TaskStatus.New,
    );
  if (filter === "completed")
    filteredTask = filteredTask?.filter(
      (t: DomainTask) => t.status === TaskStatus.Completed,
    );

  if (isLoading) {
    return <TasksSkeleton />;
  }

  return filteredTask?.length === 0 ? (
    <p>There aren't tasks</p>
  ) : (
    <List>
      {filteredTask?.map((task: DomainTask) => {
        return <TaskItem key={task.id} task={task} todolistId={todolistId} />;
      })}
    </List>
  );
};

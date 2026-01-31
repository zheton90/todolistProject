import { List } from "@mui/material";
import { selectTasks } from "@/features/todolists/model/tasks-slice.ts";
import { useAppSelector } from "@/common/hooks/useAppSelector.ts";
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts";
import { TaskItem } from "@/features/todolists/ui/TodolistItem/TodolistItem/Tasks/TodolistItem/TaskItem.tsx";
import { DomainTask } from "@/features/todolists/api/tasksApi.types.ts";
import { TaskStatus } from "@/common/enums/enums.ts";
import { useGetTasksQuery } from "@/features/todolists/api/tasksApi.ts";

type Props = {
  todolist: DomainTodolist;
};

export const Tasks = ({ todolist }: Props) => {
  const { filter, id: todolistId } = todolist;

  const { data } = useGetTasksQuery(todolistId);

  const tasks = useAppSelector(selectTasks);

  let filteredTask = data?.items;
  if (filter === "active")
    filteredTask = tasks[todolist.id].filter(
      (t: DomainTask) => t.status === TaskStatus.New,
    );
  if (filter === "completed")
    filteredTask = tasks[todolist.id].filter(
      (t: DomainTask) => t.status === TaskStatus.Completed,
    );

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

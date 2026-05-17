import { List } from "@mui/material";
import { TaskItem } from "@/features/todolists/ui/TodolistItem/TodolistItem/Tasks/TodolistItem/TaskItem.tsx";
import { DomainTask } from "@/features/todolists/api/tasksApi.types.ts";
import { TaskStatus } from "@/common/enums/enums.ts";
import { useGetTasksQuery } from "@/features/todolists/api/tasksApi.ts";
import { TasksSkeleton } from "@/features/todolists/ui/TodolistItem/TodolistItem/Tasks/TasksSkeleton/TasksSkeleton.tsx";
import { DomainTodolist } from "@/features/todolists/lib";
import { TasksPagination } from "@/features/todolists/ui/TodolistItem/TodolistItem/Tasks/TasksPagination/TasksPagination.tsx";
import { useState } from "react";

type Props = {
  todolist: DomainTodolist;
};

export const Tasks = ({ todolist }: Props) => {
  const { filter, id: todolistId } = todolist;
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetTasksQuery(
    {
      todolistId,
      params: { page },
    },
    { refetchOnFocus: true },
  );

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
    <p style={{ minHeight: "215px" }}>There aren't tasks</p>
  ) : (
    <>
      <List style={{ minHeight: "185px" }}>
        {filteredTask?.map((task: DomainTask) => {
          return <TaskItem key={task.id} task={task} todolistId={todolistId} />;
        })}
      </List>
      <TasksPagination
        totalCount={data?.totalCount || 0}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

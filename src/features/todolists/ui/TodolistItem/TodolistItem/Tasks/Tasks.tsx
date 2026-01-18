import { List } from "@mui/material";
import {
  fetchTasksTC,
  selectTasks,
} from "@/features/todolists/model/tasks-slice.ts";
import { useAppSelector } from "@/common/hooks/useAppSelector.ts";
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts";
import { TaskItem } from "@/features/todolists/ui/TodolistItem/TodolistItem/Tasks/TodolistItem/TaskItem.tsx";
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts";
import { useEffect } from "react";
import { DomainTask } from "@/features/todolists/api/tasksApi.types.ts";
import { TaskStatus } from "@/common/enums/enums.ts";

type Props = {
  todolist: DomainTodolist;
};

export const Tasks = ({ todolist }: Props) => {
  const dispatch = useAppDispatch();
  const { filter, id: todolistId } = todolist;
  useEffect(() => {
    dispatch(fetchTasksTC(todolistId));
  }, []);

  const tasks = useAppSelector(selectTasks.selectTasks);

  let filteredTask = tasks[todolistId];
  if (filter === "Active")
    filteredTask = tasks[todolist.id].filter(
      (t: DomainTask) => t.status === TaskStatus.New,
    );
  if (filter === "Completed")
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

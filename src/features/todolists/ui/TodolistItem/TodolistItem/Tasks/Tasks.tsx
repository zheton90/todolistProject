import { List } from "@mui/material";
import { Task } from "@/features/todolists/model/tasks-reducer.ts";
import { useAppSelector } from "@/common/hooks/useAppSelector.ts";
import { selectTask } from "@/features/todolists/model/tasks-selectors.ts";
import { Todolist } from "@/features/todolists/model/todolists-reducer.ts";
import { TaskItem } from "@/features/todolists/ui/TodolistItem/TodolistItem/Tasks/TodolistItem/TaskItem.tsx";

type Props = {
  todolist: Todolist;
};

export const Tasks = ({ todolist }: Props) => {
  const { filter, id: todolistId } = todolist;

  const tasks = useAppSelector(selectTask);

  let filteredTask = tasks[todolistId];
  if (filter === "Active")
    filteredTask = tasks[todolist.id].filter((t: Task) => t.isDone === false);
  if (filter === "Completed")
    filteredTask = tasks[todolist.id].filter((t: Task) => t.isDone === true);

  return filteredTask.length === 0 ? (
    <p>There aren't tasks</p>
  ) : (
    <List>
      {filteredTask.map((task: Task) => {
        return <TaskItem task={task} todolistId={todolistId} />;
      })}
    </List>
  );
};

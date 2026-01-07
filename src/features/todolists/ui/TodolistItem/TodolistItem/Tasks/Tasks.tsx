import { List } from "@mui/material";
import { selectTasks, Task } from "@/features/todolists/model/tasks-slice.ts";
import { useAppSelector } from "@/common/hooks/useAppSelector.ts";
import { Todolist } from "@/features/todolists/model/todolists-slice.ts";
import { TaskItem } from "@/features/todolists/ui/TodolistItem/TodolistItem/Tasks/TodolistItem/TaskItem.tsx";

type Props = {
  todolist: Todolist;
};

export const Tasks = ({ todolist }: Props) => {
  const { filter, id: todolistId } = todolist;

  const tasks = useAppSelector(selectTasks.selectTasks);

  let filteredTask = tasks[todolistId];
  if (filter === "Active")
    filteredTask = tasks[todolist.id].filter((t: Task) => t.isDone === false);
  if (filter === "Completed")
    filteredTask = tasks[todolist.id].filter((t: Task) => t.isDone === true);

  return filteredTask?.length === 0 ? (
    <p>There aren't tasks</p>
  ) : (
    <List>
      {filteredTask?.map((task: Task) => {
        return <TaskItem task={task} todolistId={todolistId} />;
      })}
    </List>
  );
};

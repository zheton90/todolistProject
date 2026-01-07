import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm.tsx";
import { Todolist } from "@/features/todolists/model/todolists-slice.ts";
import { createTaskAC } from "@/features/todolists/model/tasks-slice.ts";
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts";
import { TodolistTitle } from "@/features/todolists/ui/TodolistItem/TodolistItem/TodolistTitle/TodolistTitle.tsx";
import { Tasks } from "@/features/todolists/ui/TodolistItem/TodolistItem/Tasks/Tasks.tsx";
import { FilterButtons } from "@/features/todolists/ui/TodolistItem/TodolistItem/FilterButtons/FilterButtons.tsx";

type Props = {
  todolist: Todolist;
};

export const TodolistItem = ({ todolist }: Props) => {
  const { id: todolistId } = todolist;

  const dispatch = useAppDispatch();

  const createTaskHandler = (title: string) => {
    dispatch(createTaskAC({ todolistId, title }));
  };

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm createItem={createTaskHandler} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  );
};

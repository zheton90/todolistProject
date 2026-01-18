import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm.tsx";
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts";
import { createTaskTC } from "@/features/todolists/model/tasks-slice.ts";
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts";
import { TodolistTitle } from "@/features/todolists/ui/TodolistItem/TodolistItem/TodolistTitle/TodolistTitle.tsx";
import { Tasks } from "@/features/todolists/ui/TodolistItem/TodolistItem/Tasks/Tasks.tsx";
import { FilterButtons } from "@/features/todolists/ui/TodolistItem/TodolistItem/FilterButtons/FilterButtons.tsx";

type Props = {
  todolist: DomainTodolist;
};

export const TodolistItem = ({ todolist }: Props) => {
  const { id: todolistId, entityStatus } = todolist;

  const dispatch = useAppDispatch();

  const createTaskHandler = (title: string) => {
    dispatch(createTaskTC({ todolistId, title }));
  };

  return (
    <div inert={entityStatus === "loading"}>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm createItem={createTaskHandler} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  );
};

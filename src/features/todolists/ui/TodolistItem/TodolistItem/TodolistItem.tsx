import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm.tsx";
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts";
import { TodolistTitle } from "@/features/todolists/ui/TodolistItem/TodolistItem/TodolistTitle/TodolistTitle.tsx";
import { Tasks } from "@/features/todolists/ui/TodolistItem/TodolistItem/Tasks/Tasks.tsx";
import { FilterButtons } from "@/features/todolists/ui/TodolistItem/TodolistItem/FilterButtons/FilterButtons.tsx";
import { useCreateTaskMutation } from "@/features/todolists/api/tasksApi.ts";

type Props = {
  todolist: DomainTodolist;
};

export const TodolistItem = ({ todolist }: Props) => {
  const { id: todolistId, entityStatus } = todolist;

  const [createTask] = useCreateTaskMutation();

  const createTaskHandler = (title: string) => {
    createTask({ todolistId, title });
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

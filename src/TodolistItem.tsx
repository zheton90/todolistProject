import { FilterType, Task, Todolist } from "./App.tsx";
import { Button } from "./Button.tsx";
import { ChangeEvent } from "react";
import { CreateItemForm } from "./CreateItemForm.tsx";
import { EditableSpan } from "./EditableSpan.tsx";

type Props = {
  deleteTodolist: (todolistId: string) => void;
  todolist: Todolist;
  title: string;
  tasks: Task[];
  deleteTask: (todolistId: string, taskId: string) => void;
  changeFiler: (filter: FilterType, id: string) => void;
  createTask: (todolistId: string, title: string) => void;
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void;
  changeStatus: (
    todolistId: string,
    taskId: string,
    taskStatus: boolean,
  ) => void;
  filter: FilterType;
  changeTodolistTitle: (todolistId: string, title: string) => void;
};

export const TodolistItem = ({
  tasks,
  deleteTask,
  changeFiler,
  createTask,
  changeStatus,
  todolist,
  deleteTodolist,
  changeTaskTitle,
  changeTodolistTitle,
}: Props) => {
  const { title, filter, id } = todolist;

  const changeFilerHandler = (filter: FilterType) => {
    changeFiler(filter, id);
  };

  const deleteTodolistHandler = () => {
    deleteTodolist(id);
  };

  const createTaskHandler = (title: string) => {
    createTask(id, title);
  };

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle(id, title);
  };

  return (
    <div>
      <div className={"container"}>
        <EditableSpan title={title} onChange={changeTodolistTitleHandler} />
        {/*<h3>{title}</h3>*/}
        <button onClick={deleteTodolistHandler}>X</button>
      </div>
      <CreateItemForm createItem={createTaskHandler} />
      {tasks.length === 0 ? (
        <p>There aren't tasks</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            const changeTaskTitleHandler = (title: string) => {
              changeTaskTitle(id, task.id, title);
            };
            const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              changeStatus(id, task.id, e.target.checked);
            };
            return (
              <li key={task.id}>
                <input
                  onChange={changeStatusHandler}
                  type="checkbox"
                  checked={task.isDone}
                />
                <span className={task.isDone ? "" : "is-done"}>
                  <EditableSpan
                    title={task.title}
                    onChange={changeTaskTitleHandler}
                  />
                </span>
                <Button title={"x"} onClick={() => deleteTask(id, task.id)} />
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <Button
          className={filter === "All" ? "active-filter" : ""}
          title={"All"}
          onClick={() => changeFilerHandler("All")}
        />
        <Button
          className={filter === "Active" ? "active-filter" : ""}
          title={"Active"}
          onClick={() => changeFilerHandler("Active")}
        />
        <Button
          className={filter === "Completed" ? "active-filter" : ""}
          title={"Completed"}
          onClick={() => changeFilerHandler("Completed")}
        />
      </div>
    </div>
  );
};

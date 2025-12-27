import { FilterType, Task, Todolist } from "./App.tsx";
import { ChangeEvent } from "react";
import { CreateItemForm } from "./CreateItemForm.tsx";
import { EditableSpan } from "./EditableSpan.tsx";
import { Button, Checkbox, IconButton, ListItem, List } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import { conteinerSx, getListItemsSx } from "./TodolistItem.styles.ts";

type Props = {
  deleteTodolist: (todolistId: string) => void;
  todolist: Todolist;
  // title: string;
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
        <IconButton onClick={deleteTodolistHandler}>
          <DeleteIcon />
        </IconButton>
      </div>
      <CreateItemForm createItem={createTaskHandler} />
      {tasks?.length === 0 ? (
        <p>There aren't tasks</p>
      ) : (
        <List>
          {tasks?.map((task) => {
            const changeTaskTitleHandler = (title: string) => {
              changeTaskTitle(id, task.id, title);
              console.log(id, task.id);
            };
            const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              console.log(id, task.id, e.target.checked);

              changeStatus(id, task.id, e.target.checked);
            };
            return (
              <ListItem key={task.id} sx={getListItemsSx(task.isDone)}>
                <div>
                  <Checkbox
                    onChange={changeStatusHandler}
                    checked={task.isDone}
                  />
                  <span className={task.isDone ? "is-done" : ""}>
                    <EditableSpan
                      title={task.title}
                      onChange={changeTaskTitleHandler}
                    />
                  </span>
                </div>

                <IconButton onClick={() => deleteTask(id, task.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            );
          })}
        </List>
      )}
      <Box sx={conteinerSx}>
        <Button
          size="small"
          variant={filter === "All" ? "contained" : "outlined"}
          color="primary"
          onClick={() => changeFilerHandler("All")}
        >
          All
        </Button>
        <Button
          size="small"
          variant={filter === "Active" ? "contained" : "outlined"}
          color="primary"
          onClick={() => changeFilerHandler("Active")}
        >
          Active
        </Button>
        <Button
          size="small"
          variant={filter === "Completed" ? "contained" : "outlined"}
          color="primary"
          onClick={() => changeFilerHandler("Completed")}
        >
          Completed
        </Button>
      </Box>
    </div>
  );
};

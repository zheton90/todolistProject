import "./App.css";
import { TodolistItem } from "./TodolistItem.tsx";
import { useState } from "react";
import { v1 } from "uuid";
import { CreateItemForm } from "./CreateItemForm.tsx";
import {
  AppBar,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  IconButton,
  Paper,
  Switch,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { conteinerSx } from "./TodolistItem.styles.ts";
import { NavButton } from "./NavButton.ts";

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

type ThemeMode = "dark" | "light";

export type FilterType = "All" | "Completed" | "Active";

export type Todolist = {
  id: string;
  title: string;
  filter: FilterType;
};

export type TaskState = Record<string, Task[]>;

export const App = () => {
  const todolist1 = v1();
  const todolist2 = v1();

  const [tasks, setTasks] = useState<TaskState>({
    [todolist1]: [
      { id: v1(), title: "HTML&CSS", isDone: false },
      { id: v1(), title: "JS", isDone: false },
    ],
    [todolist2]: [
      { id: v1(), title: "Typescript", isDone: true },
      { id: v1(), title: "RTK query", isDone: false },
    ],
  });

  const [todolists, settodolists] = useState<Todolist[]>([
    { id: todolist1, title: "What to do", filter: "All" },
    { id: todolist2, title: "What to learn", filter: "All" },
  ]);

  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: "#087EA4",
      },
    },
  });

  const changeMode = () => {
    setThemeMode(themeMode === "dark" ? "light" : "dark");
  };

  const deleteTask = (todolistId: string, taskId: string) => {
    const filteredTasks = tasks[todolistId].filter(
      (task) => task.id !== taskId,
    );
    setTasks({ ...tasks, [todolistId]: filteredTasks });
  };

  const changeFiler = (filter: FilterType, id: string) => {
    const newTodolists = todolists.map((tdl) =>
      tdl.id === id ? { ...tdl, filter } : tdl,
    );
    settodolists(newTodolists);
  };

  const changeStatus = (
    todolistId: string,
    taskId: string,
    taskStatus: boolean,
  ) => {
    const newTasks = tasks[todolistId].map((task) =>
      task.id === taskId ? { ...task, isDone: taskStatus } : task,
    );
    debugger;
    setTasks({ ...tasks, [todolistId]: newTasks });
  };

  const createTask = (todolistId: string, title: string) => {
    const newTask: Task = { id: v1(), title, isDone: false };
    const newTasks = [newTask, ...tasks[todolistId]];
    setTasks({ ...tasks, [todolistId]: newTasks });
  };

  const deleteTodolist = (todolistId: string) => {
    delete tasks[todolistId];
    settodolists([...todolists.filter((tdl) => tdl.id !== todolistId)]);
  };

  const createTodolistHandler = (title: string) => {
    const newId = v1();
    settodolists([...todolists, { id: newId, title, filter: "All" }]);
    setTasks({ ...tasks, [newId]: [] });
  };

  const changeTaskTitle = (
    todolistId: string,
    taskId: string,
    title: string,
  ) => {
    const editeTasks = tasks[todolistId].map((task) =>
      task.id === taskId ? { ...task, title } : task,
    );
    setTasks({ ...tasks, [todolistId]: editeTasks });
  };

  const changeTodolistTitle = (todolistId: string, title: string) => {
    settodolists([
      ...todolists.map((tdl) =>
        tdl.id === todolistId ? { ...tdl, title } : tdl,
      ),
    ]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <AppBar position="static" sx={{ mb: "30px" }}>
          <Toolbar>
            <Container maxWidth="lg" sx={conteinerSx}>
              <IconButton color="inherit">
                <MenuIcon />
              </IconButton>
              <div>
                <NavButton>Sign in</NavButton>
                <NavButton>Sign up</NavButton>
                <NavButton background={theme.palette.primary.dark}>
                  Faq
                </NavButton>
                <Switch onChange={changeMode} />
              </div>
            </Container>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg">
          <Grid container sx={{ mb: "30px" }}>
            <CreateItemForm createItem={createTodolistHandler} />
          </Grid>
          <Grid container spacing={4}>
            {todolists.map((todolist) => {
              let filteredTask = tasks[todolist.id];
              if (todolist.filter === "Active")
                filteredTask = tasks[todolist.id].filter(
                  (t) => t.isDone === false,
                );
              if (todolist.filter === "Completed")
                filteredTask = tasks[todolist.id].filter(
                  (t) => t.isDone === true,
                );
              return (
                <Grid key={todolist.id}>
                  <Paper sx={{ p: "0 20px 20px 20px" }}>
                    <TodolistItem
                      deleteTodolist={deleteTodolist}
                      todolist={todolist}
                      title="What to learn"
                      tasks={filteredTask}
                      deleteTask={deleteTask}
                      changeFiler={changeFiler}
                      createTask={createTask}
                      changeStatus={changeStatus}
                      filter={todolist.filter}
                      changeTaskTitle={changeTaskTitle}
                      changeTodolistTitle={changeTodolistTitle}
                    />
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
};

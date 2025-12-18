import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type Task = {
    id: string;
    title: string;
    isDone: boolean;
}

export type FilterType = 'All' | 'Completed' | 'Active'

export type Todolist = {
    id: string;
    title: string;
    filter: FilterType;
}

export type TaskState = Record<string, Task[]>

export const App = () => {

    const todolist1 = v1()
    const todolist2 = v1()

    const [tasks, setTasks] = useState<TaskState>({
        [todolist1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
    { id: v1(), title: 'Redux', isDone: false },
    { id: v1(), title: 'Typescript', isDone: true },
    { id: v1(), title: 'RTK query', isDone: false },
],
        [todolist2]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
            { id: v1(), title: 'Redux', isDone: false },
            { id: v1(), title: 'Typescript', isDone: true },
            { id: v1(), title: 'RTK query', isDone: false },
        ],

        }  );

    const [todolists, settodolists] = useState<Todolist[]>([
        { id: todolist1, title: 'What to do', filter: 'All' },
        { id: todolist2, title: 'What to learn', filter: 'All' },
    ])

    const deleteTask = (todolistId: string, taskId: string) => {

        const filteredTasks = tasks[todolistId].filter(task => task.id !== taskId)
        setTasks({...tasks, [todolistId]: filteredTasks})
    }

    const changeFiler = (filter: FilterType, id: string) => {
        const newTodolists = todolists.map(tdl => tdl.id === id ? {...tdl, filter}: tdl)
        settodolists(newTodolists)
    }

    const changeStatus = (todolistId: string, taskId: string, taskStatus: boolean) => {
        const newTasks = tasks[todolistId].map((task ) => task.id === taskId ? {...task, isDone: taskStatus } : task);
        setTasks({...tasks, [todolistId]: newTasks})
    }

    const createTask = (todolistId: string, title: string) => {
        const newTask: Task = {id:v1(), title, isDone: false};
        const newTasks = [ newTask, ...tasks[todolistId]];
        setTasks({...tasks, [todolistId]: newTasks});
        alert ('create task');
    }

    const deleteTodolist = (todolistId: string) => {
         delete tasks[todolistId]
        settodolists([...todolists.filter(tdl => tdl.id !== todolistId )])
    }



  return (
      <div className="app">
          {todolists.map(todolist => {
              let filteredTask = tasks[todolist.id]
              if(todolist.filter === 'Active') filteredTask = tasks[todolist.id].filter(t => t.isDone === false)
              if(todolist.filter === 'Completed') filteredTask = tasks[todolist.id].filter(t => t.isDone === true)
                  return (
                      <TodolistItem key={todolist.id}
                          deleteTodolist={deleteTodolist}
                          todolist={todolist}
                          title='What to learn'
                          tasks={filteredTask}
                          deleteTask={deleteTask}
                          changeFiler={changeFiler}
                          createTask={createTask}
                          changeStatus={changeStatus}
                          filter={todolist.filter}
                      />
                  );
              }
          )}

      </div>
  )
}



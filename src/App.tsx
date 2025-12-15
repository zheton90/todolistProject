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

export const App = () => {

    const [tasks, setTasks] = useState<Task[]>(
        [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
            { id: v1(), title: 'Redux', isDone: false },
            { id: v1(), title: 'Typescript', isDone: true },
            { id: v1(), title: 'RTK query', isDone: false },
        ]
    );

    const [filter, setFilter] = useState<FilterType>('All');


    const deleteTask = (taskId: string) => {
        const filteredTasks = tasks.filter(task => task.id !== taskId)
        setTasks(filteredTasks)
    }

    const changeFiler = (filter: FilterType) => {
        setFilter(filter)
    }

    const changeStatus = (taskId: string, taskStatus: boolean) => {
        const newTasks = tasks.map((task ) => task.id === taskId ? {...task, isDone: taskStatus } : task);
        setTasks(newTasks)
    }

    const createTask = (title: string) => {
        const newTask: Task = {id:v1(), title, isDone: false};
        const newTasks = [ newTask, ...tasks];
        setTasks(newTasks);
        alert ('create task');
    }

    let filteredTask = tasks
    if(filter === 'Active') filteredTask = tasks.filter(t => t.isDone === false)
    if(filter === 'Completed') filteredTask = tasks.filter(t => t.isDone === true)


  return (
      <div className="app">
          <TodolistItem
              title='What to learn'
              tasks={filteredTask}
              deleteTask={deleteTask}
              changeFiler={changeFiler}
              createTask={createTask}
              changeStatus={changeStatus}
              filter={filter}
          />
      </div>
  )
}



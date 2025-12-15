import {FilterType, Task} from "./App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type Props = {
    title: string,
    tasks: Task[],
    deleteTask: (taskId: string) => void,
    changeFiler: (filter: FilterType) => void,
    createTask: (title: string) => void,
}

export const TodolistItem = ({title, tasks, deleteTask, changeFiler, createTask}: Props) => {

    const [inputTitle, setInputTitle] = useState('');
    const createTaskHandler = () => {
        createTask(inputTitle)
        setInputTitle('')
    }
    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>  setInputTitle(e.target.value)

    const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) =>  {
        if (e.key === 'Enter') {createTaskHandler()}
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={inputTitle}
                       onChange={changeTaskTitleHandler}
                       onKeyUp={createTaskOnEnterHandler}
                           />
                <button onClick={createTaskHandler}>+</button>

            </div>
            {tasks.length === 0 ?
                <p>There aren't tasks</p> :
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <Button title={'x'} onClick={() => deleteTask(task.id)}/>
                        </li>
                    ))}

                </ul>
            }
            <div>
                <Button title={'All'} onClick={() => changeFiler('All')} />
                <Button title={'Active'} onClick={() => changeFiler('Active')}/>
                <Button title={'Completed'} onClick={() => changeFiler('Completed')}/>
            </div>
        </div>
    );
};

import {FilterType, Task} from "./App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type Props = {
    title: string,
    tasks: Task[],
    deleteTask: (taskId: string) => void,
    changeFiler: (filter: FilterType) => void,
    createTask: (title: string) => void,
    changeStatus: (taskId: string, taskStatus: boolean) => void
    filter: FilterType,
}

export const TodolistItem = ({title, tasks, deleteTask, changeFiler, createTask, changeStatus, filter}: Props) => {

    const [inputTitle, setInputTitle] = useState('');
    const [error, setError] = useState('')
    const createTaskHandler = () => {
        const trimTitle = inputTitle.trim()
        if(trimTitle !== ''){
            createTask(inputTitle)
            setInputTitle('')
        } else{
            setError('Title is required')
        }
    }
    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>  {
        setInputTitle(e.target.value)
        setError('')
    }

    const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) =>  {
        if (e.key === 'Enter') {createTaskHandler()}
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    className={error? 'error' : ''}
                    value={inputTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyUp={createTaskOnEnterHandler}
                />
                <button onClick={createTaskHandler}>+</button>
                {error && <p className={'errorMessage'}>{error}</p>}
            </div>
            {tasks.length === 0 ?
                <p>There aren't tasks</p> :
                <ul>
                    {tasks.map((task) => {
                        const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeStatus(task.id, e.target.checked)
                        }
                        return (
                            <li key={task.id}>
                                <input
                                    onChange={changeStatusHandler}
                                    type="checkbox"
                                    checked={task.isDone}/>
                                <span className={task.isDone? '' : 'is-done'}>{task.title}</span>
                                <Button title={'x'} onClick={() => deleteTask(task.id)}/>
                            </li>
                        );
                    })}

                </ul>
            }
            <div>
                <Button
                    className={filter === 'All'? 'active-filter' : ''}
                    title={'All'}
                    onClick={() => changeFiler('All')} />
                <Button
                    className={filter === 'Active'? 'active-filter' : ''}
                    title={'Active'}
                    onClick={() => changeFiler('Active')}/>
                <Button
                    className={filter === 'Completed'? 'active-filter' : ''}
                    title={'Completed'}
                    onClick={() => changeFiler('Completed')}/>
            </div>
        </div>
    );
};

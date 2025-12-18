import {FilterType, Task, Todolist} from "./App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type Props = {
    deleteTodolist: (todolistId: string) => void,
    todolist: Todolist,
    title: string,
    tasks: Task[],
    deleteTask: (todolistId: string, taskId: string) => void,
    changeFiler: (filter: FilterType, id: string) => void,
    createTask: (todolistId: string, title: string) => void,
    changeStatus: (todolistId: string, taskId: string, taskStatus: boolean) => void
    filter: FilterType,
}

export const TodolistItem = ({tasks, deleteTask, changeFiler, createTask, changeStatus,  todolist, deleteTodolist}: Props) => {

    const {title, filter, id} = todolist
    const [inputTitle, setInputTitle] = useState('');
    const [error, setError] = useState('')
    const createTaskHandler = () => {
        const trimTitle = inputTitle.trim()
        if(trimTitle !== ''){
            createTask(id, inputTitle)
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

    const changeFilerHandler = (filter: FilterType) => {
        changeFiler(filter, id)
    }

    const deleteTodolistHandler = () =>{
        deleteTodolist(id)
    }

    return (
        <div>
            <div className="container">
                <h3>{title}</h3>
                <button onClick={deleteTodolistHandler}>X</button>
            </div>

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
                            changeStatus(id, task.id, e.target.checked)
                        }
                        return (
                            <li key={task.id}>
                                <input
                                    onChange={changeStatusHandler}
                                    type="checkbox"
                                    checked={task.isDone}/>
                                <span className={task.isDone? '' : 'is-done'}>{task.title}</span>
                                <Button title={'x'} onClick={() => deleteTask(id, task.id)}/>
                            </li>
                        );
                    })}

                </ul>
            }
            <div>
                <Button
                    className={filter === 'All'? 'active-filter' : ''}
                    title={'All'}
                    onClick={() => changeFilerHandler('All')} />
                <Button
                    className={filter === 'Active'? 'active-filter' : ''}
                    title={'Active'}
                    onClick={() => changeFilerHandler('Active')}/>
                <Button
                    className={filter === 'Completed'? 'active-filter' : ''}
                    title={'Completed'}
                    onClick={() => changeFilerHandler('Completed')}/>
            </div>
        </div>
    );
};

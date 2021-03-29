import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from "../App";
import '../App.css';

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    todolistId: string
    filter: FilterType
    removeTask: (taskID: string, todolistId: string) => void
    addTask: (taskTitle: string, todolistId: string) => void
    changeStatus: (taskId: string, newIsDone: boolean, todolistId: string) => void
    changeFilter: (value: FilterType, todolistId: string) => void
}

function Todolist(props: TodolistPropsType) {

    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title, props.todolistId)
            setTitle("")
        } else {
            setError("Title is required!")
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    }

    return (

        <div>
            <h3> {props.title} </h3>
            <div>
                <input value={title}
                       onChange={ onChangeHandler }
                       onKeyPress={ onKeyPressHandler }
                       className={error ? "error" : ""}
                />
                <button onClick={ addTask }>+</button>
                {error && <div className="error-message"> {error} </div>}
            </div>
            <ul>

                { props.tasks.map( t => {
                    const removeTaskHandler = () => props.removeTask(t.id, props.todolistId)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDone = e.currentTarget.checked
                        props.changeStatus(t.id, newIsDone, props.todolistId)
                    }

                    return <li key={ t.id }>
                        <input type="checkbox"
                               onChange={ onChangeHandler }
                               checked={ t.isDone }
                        />
                        <span>{ t.title }</span>
                        <button onClick={ removeTaskHandler }>x</button>
                    </li>
                } ) }

            </ul>
            <div>
                <button onClick={ () => props.changeFilter("all", props.todolistId) }>All</button>
                <button onClick={ () => props.changeFilter("active", props.todolistId) }>Active</button>
                <button onClick={ () => props.changeFilter("completed", props.todolistId) }>Completed</button>
            </div>
        </div>

    );
}

export default Todolist;

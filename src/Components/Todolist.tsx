import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from "../App";
import '../App.css';
import {AddItemForm} from "./AddItemForm";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    todolistId: string
    filter: FilterType
    removeTask: (taskID: string, todolistId: string) => void
    addTask: (taskTitle: string, todolistId: string) => void
    changeStatus: (taskId: string, newIsDone: boolean, todolistId: string) => void
    changeFilter: (value: FilterType, todolistId: string) => void
    removeTodolist: (todolistId: string) => void

}

function Todolist(props: TodolistPropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.todolistId)
    }

    return (

        <div>
            <h3> {props.title}
                <button onClick={ () => props.removeTodolist(props.todolistId) }>x</button>
            </h3>
            <AddItemForm addItem={ addTask } />
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

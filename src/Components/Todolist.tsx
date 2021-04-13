import React, {ChangeEvent} from 'react';
import {FilterType, TaskType} from "../App";
import '../App.css';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    todolistId: string
    filter: FilterType
    removeTask: (taskID: string, todolistId: string) => void
    addTask: (taskTitle: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void
    changeFilter: (value: FilterType, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string ,newTitle: string) => void
}

function Todolist(props: TodolistPropsType) {

    const addTask = (title: string) => { // parent's callback
        props.addTask(title, props.todolistId)
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.todolistId, newTitle)
    }

    return (

        <div>
            <h3>
                <EditableSpan title={props.title} onChange={ changeTodolistTitle } />
                {/*<button onClick={ () => props.removeTodolist(props.todolistId) }>x</button>*/}
                <IconButton onClick={ () => props.removeTodolist(props.todolistId) }>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={ addTask } />

                { props.tasks.map( t => {
                    const removeTaskHandler = () => props.removeTask(t.id, props.todolistId)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDone = e.currentTarget.checked
                        props.changeTaskStatus(t.id, newIsDone, props.todolistId)
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.todolistId)
                    }

                    return <ul style={{ listStyle: 'none', padding: "0px" }}>
                        <li key={ t.id } className={t.isDone ? "done" : ""}>
                            <Checkbox
                                checked={ t.isDone }
                                onChange={ onChangeHandler }
                                color={"primary"}
                            />
                            {/*<input type="checkbox"
                               onChange={ onChangeHandler }
                               checked={ t.isDone }
                        />*/}
                            <EditableSpan
                                title={t.title}
                                onChange={onChangeTitleHandler}
                            />
                            {/*<button onClick={ removeTaskHandler }>x</button>*/}
                            <IconButton onClick={ removeTaskHandler }>
                                <Delete />
                            </IconButton>
                        </li>
                    </ul>
                } ) }

            <div>
                <Button
                    style={{marginRight: "10px"}}
                    size={"small"}
                    color={"primary"}
                    variant={props.filter === "all" ? "outlined" : "contained"}
                    onClick={ () => props.changeFilter("all", props.todolistId) }>All
                </Button>
                <Button
                    style={{marginRight: "10px"}}
                    size={"small"}
                    color={"primary"}
                    variant={props.filter === "active" ? "outlined" : "contained"}
                    onClick={ () => props.changeFilter("active", props.todolistId) }>Active
                </Button>
                <Button
                    size={"small"}
                    color={"primary"}
                    variant={props.filter === "completed" ? "outlined" : "contained"}
                    onClick={ () => props.changeFilter("completed", props.todolistId) }>Completed
                </Button>
            </div>
        </div>

    );
}

export default Todolist;

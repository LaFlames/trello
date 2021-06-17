import React, {ChangeEvent, useCallback} from 'react';
import {FilterType, TaskType} from "../App";
import '../App.css';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

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

const Todolist = React.memo((props: TodolistPropsType) => {

    const addTask = useCallback((title: string) => { // parent's callback
        props.addTask(title, props.todolistId)
    } , [])

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.todolistId, newTitle)
    }


    let allTodolistTasks = props.tasks
    let tasksForTodolist = allTodolistTasks
    if (props.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false)
    }
    if (props.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true)
    }

    const removeTask = useCallback((taskId: string) => props.removeTask(taskId, props.todolistId), [props.removeTask, props.todolistId])
    const changeTaskStatus = useCallback((taskId: string, newIsDone: boolean) => {
        props.changeTaskStatus(taskId, newIsDone, props.todolistId)
    }, [props.changeTaskStatus, props.todolistId])
    const changeTaskTitle = useCallback((taskId: string, newTitle: string) => {
        props.changeTaskTitle(taskId, newTitle, props.todolistId)
    }, [props.changeTaskTitle, props.todolistId])

    return (

        <div>
            <h3>
                <EditableSpan title={props.title} onChange={ changeTodolistTitle } />
                <IconButton onClick={ () => props.removeTodolist(props.todolistId) }>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={ addTask } />
                <ul style={{ listStyle: 'none', padding: "0px" }}>
                    {
                        tasksForTodolist.map( t => <Task
                            key={t.id}
                            task={t}
                            todolistId={props.todolistId}
                            removeTask={removeTask}
                            changeTaskStatus={changeTaskStatus}
                            changeTaskTitle={changeTaskTitle}
                        />

                     ) }
                </ul>
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
})

export default Todolist;

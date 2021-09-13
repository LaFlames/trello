import React, {useCallback, useEffect} from 'react';
import '../../../app/App.css';
import {AddItemForm} from "../../../сomponents/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../сomponents/EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task/Task";
import {FilterType} from "../../../app/App";
import {TaskStatuses, TaskType} from '../../../api/todolists-api';
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "./Task/tasks-reducer";
import {TodolistEntityType} from "./todolist-reducer";

type TodolistPropsType = {
    todolist: TodolistEntityType
    tasks: TaskType[]
    removeTask: (taskID: string, todolistId: string) => void
    addTask: (taskTitle: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void
    changeFilter: (value: FilterType, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string ,newTitle: string) => void
}

const Todolist = React.memo((props: TodolistPropsType) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasksTC(props.todolist.id))
    }, [])

    const addTask = useCallback((title: string) => { // parent's callback
        props.addTask(title, props.todolist.id)
    } , [])
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.todolist.id, newTitle)
    }

    let allTodolistTasks = props.tasks
    let tasksForTodolist = allTodolistTasks
    if (props.todolist.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const removeTask = useCallback((taskId: string) => props.removeTask(taskId, props.todolist.id), [props.removeTask, props.todolist.id])
    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses) => {
        props.changeTaskStatus(taskId, status, props.todolist.id)
    }, [props.changeTaskStatus, props.todolist.id])
    const changeTaskTitle = useCallback((taskId: string, newTitle: string) => {
        props.changeTaskTitle(taskId, newTitle, props.todolist.id)
    }, [props.changeTaskTitle, props.todolist.id])

    return (

        <div>
            <h3>
                <EditableSpan title={props.todolist.title} onChange={ changeTodolistTitle } />
                <IconButton
                    onClick={ () => props.removeTodolist(props.todolist.id)}
                    disabled={props.todolist.entityStatus === "loading"}
                >
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm
                addItem={addTask}
                disabled={props.todolist.entityStatus === "loading"}
            />
                <ul style={{ listStyle: 'none', padding: "0px" }}>
                    {
                        tasksForTodolist.map( t => <Task
                            key={t.id}
                            task={t}
                            todolistId={props.todolist.id}
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
                    variant={props.todolist.filter === "all" ? "outlined" : "contained"}
                    onClick={ () => props.changeFilter("all", props.todolist.id) }>All
                </Button>
                <Button
                    style={{marginRight: "10px"}}
                    size={"small"}
                    color={"primary"}
                    variant={props.todolist.filter === "active" ? "outlined" : "contained"}
                    onClick={ () => props.changeFilter("active", props.todolist.id) }>Active
                </Button>
                <Button
                    size={"small"}
                    color={"primary"}
                    variant={props.todolist.filter === "completed" ? "outlined" : "contained"}
                    onClick={ () => props.changeFilter("completed", props.todolist.id) }>Completed
                </Button>
            </div>
        </div>

    );
})

export default Todolist;

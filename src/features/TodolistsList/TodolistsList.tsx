import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC, deleteTodolistTC,
    fetchTodolistsTC,
    TodolistEntityType
} from "./Todolist/todolist-reducer";
import {addTaskTC, removeTasksTC, updateTaskTC} from "./Todolist/Task/tasks-reducer";
import {TaskStatuses} from "../../api/todolists-api";
import {Grid, Paper} from "@material-ui/core";
import Todolist from "./Todolist/Todolist";
import {AddItemForm} from "../../сomponents/AddItemForm/AddItemForm";
import {FilterType, TaskStateType} from "../../app/App";
import {Navigate, Route, Routes} from "react-router-dom";


export const TodolistsList: React.FC<any> = (props) => {

    let todolists = useSelector<AppRootStateType, TodolistEntityType[]>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    let isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    let dispatch = useDispatch()

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        dispatch(fetchTodolistsTC())
    }, [])

    let removeTask = useCallback((taskId: string, todolistId: string) => {
        let thunk = removeTasksTC(todolistId, taskId)
        dispatch(thunk)
    } , [dispatch])
    let addTask = useCallback((taskTitle: string, todolistId: string) => {
        let thunk = addTaskTC(todolistId, taskTitle)
        dispatch(thunk)
    } , [dispatch])
    let changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        let thunk = updateTaskTC(taskId, {status}, todolistId)
        dispatch(thunk)
    } , [dispatch])
    let changeTaskTitle = useCallback((taskId: string, newTitle: string, todolistId: string) => {
        let thunk = updateTaskTC(taskId, {title: newTitle}, todolistId)
        dispatch(thunk)
    } , [dispatch])



    let changeTodolistFilter = useCallback((newFilterValue: FilterType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(newFilterValue, todolistId))
    } , [dispatch])
    let changeTodolistTitle = useCallback((todolistId: string ,newTitle: string) => {
        let thunk = changeTodolistTitleTC(todolistId, newTitle)
        dispatch(thunk)
    } , [dispatch])
    let removeTodolist = useCallback((todolistId: string) => {
        let thunk = deleteTodolistTC(todolistId)
        dispatch(thunk)
    } , [dispatch])
    let addTodolist = useCallback((todolistTitle: string) => {
        let thunk = addTodolistTC(todolistTitle)
        dispatch(thunk)
    }, [dispatch])


    /*UI:*/
    let todolistComponents = todolists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={6} style={{padding: "20px"}}>
                    <Todolist
                        todolist={tl}
                        tasks={tasks[tl.id]}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        changeFilter={changeTodolistFilter}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    if (!isLoggedIn) {
        return <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
    }

    return <>
        <Grid container={true}>
            <AddItemForm addItem={ addTodolist }  />
        </Grid>
        <Grid container={true} style={{paddingTop: "20px"}} spacing={2}>
            { todolistComponents }
        </Grid>
    </>
}
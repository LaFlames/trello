import React, {useCallback, useEffect} from 'react';
import './App.css';
import Todolist from "./Components/Todolist";
import {AddItemForm} from "./Components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    deleteTodolistTC,
    fetchTodolistsTC,
    TodolistEntityType
} from "./state/todolist-reducer";
import {addTaskTC, removeTasksTC, updateTaskTC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStatuses, TaskType} from "./api/todolists-api";


export type FilterType = "all" | "active" | "completed"


export type TaskStateType = {
    [key: string]: TaskType[]
}



function AppWithRedux() {

    let todolists = useSelector<AppRootStateType, TodolistEntityType[]>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    let dispatch = useDispatch()

    useEffect(() => {
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
                        todolistId={tl.id}
                        title={tl.title}
                        filter={tl.filter}
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

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        Todolist
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed style={{paddingTop: "20px"}}>
                <Grid container={true}>
                    <AddItemForm addItem={ addTodolist }  />
                </Grid>
                <Grid container={true} style={{paddingTop: "20px"}} spacing={2}>
                    { todolistComponents }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;

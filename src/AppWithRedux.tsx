import React, {useReducer, useState} from 'react';
import './App.css';
import Todolist from "./Components/Todolist";
import { v1 } from 'uuid';
import {AddItemForm} from "./Components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todoListsReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = "all" | "active" | "completed"
export type TodolistType = {
    id: string,
    title: string,
    filter: FilterType
}
export type TaskStateType = {
    [key: string]: TaskType[]
}



function AppWithRedux() {

    let todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    let dispatch = useDispatch()

    let removeTask = (taskId: string, todolistId: string) => {
        let action = removeTaskAC(taskId, todolistId)
        dispatch(action)
    }
    let addTask = (taskTitle: string, todolistId: string) => {
        dispatch(addTaskAC(taskTitle, todolistId))
    }
    let changeTaskStatus = (taskId: string, newIsDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(taskId, newIsDone, todolistId))
    }
    let changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
    }

    let changeTodolistFilter = (newFilterValue: FilterType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(newFilterValue, todolistId))
    }
    let changeTodolistTitle = (todolistId: string ,newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle))
    }
    let removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }
    let addTodolist = (todolistTitle: string) => {
        let action = addTodolistAC(todolistTitle)
        dispatch(action)
    }


    /*UI:*/
    let todolistComponents = todolists.map(tl => {
        let allTodolistTasks = tasks[tl.id]
        let tasksForTodolist = allTodolistTasks

        if (tl.filter === "active") {
            tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false)
        }
        if (tl.filter === "completed") {
            tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true)
        }

        return (
            <Grid item key={tl.id}>
                <Paper elevation={6} style={{padding: "20px"}}>
                    <Todolist
                        todolistId={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={tasksForTodolist}
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

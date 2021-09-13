import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TaskType} from "../api/todolists-api";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {ErrorSnackbar} from "../сomponents/ErrorSnackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {appReducer} from "./app-reducer";


export type FilterType = "all" | "active" | "completed"
export type TaskStateType = {
    [key: string]: TaskType[]
}

function App() {

    let appState = useSelector<AppRootStateType, ReturnType<typeof appReducer>>(state => state.app)
    let status = appState.status

    return (
        <div className="App">
            <ErrorSnackbar />
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
                {status === 'loading' && <LinearProgress />}
            </AppBar>

            <Container fixed style={{paddingTop: "20px"}}>
                <TodolistsList />
            </Container>
        </div>
    );
}

export default App;



import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TaskType} from "../api/todolists-api";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {ErrorSnackbar} from "../сomponents/ErrorSnackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType} from "./app-reducer";
import {Route, Routes, useNavigate} from "react-router-dom";
import {Login} from "../features/Login/Login";


export type FilterType = "all" | "active" | "completed"
export type TaskStateType = {
    [key: string]: TaskType[]
}

function App() {

    let status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const navigate = useNavigate()

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
                    <Button
                        color="inherit"
                        variant={"outlined"}
                        onClick={() => {navigate('/login')}}>Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress />}
            </AppBar>

            <Container fixed style={{paddingTop: "20px"}}>
                <Routes>
                    <Route path={'/'} element={<TodolistsList />}/>
                    <Route path={'/login'} element={<Login/>}/>

                    <Route path="/*" element={<h1>404: PAGE NOT FOUND</h1>}/>
                </Routes>

            </Container>
        </div>
    );
}

export default App;



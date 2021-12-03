import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TaskType} from "../api/todolists-api";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {ErrorSnackbar} from "../сomponents/ErrorSnackbar/ErrorSnackbar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {Preloader} from "../сomponents/Loader/Preloader";
import {logOutUserTC} from "../features/Login/auth-reducer";


function App() {

    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const logOutHandler = useCallback(() => {
        dispatch(logOutUserTC())
    }, [dispatch])


    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <Preloader/>
    }

    return (
        <div className="App">
            <ErrorSnackbar />
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        My trello
                    </Typography>
                    {isLoggedIn
                        ? <Button color="inherit" variant={"outlined"} onClick={logOutHandler}>Log out</Button>
                        : <div></div>
                    }
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



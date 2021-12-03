import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export function ErrorSnackbar() {

    let error = useSelector<AppRootStateType, string | null>(state => state.app.error);
    let dispatch = useDispatch();

    let isError = error !== null

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC({error: null}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
    };

    return (
        <Snackbar open={isError} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                <span>{error}</span>
            </Alert>
        </Snackbar>
    );
}
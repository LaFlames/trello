import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {ResponseType} from "../api/todolists-api";
import {Dispatch} from "react";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<any>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'Some error occurred!'}))
    }
    setAppStatusAC({status: 'failed'})
}

export const handleServerNetworkAppError = <D>(error: {message: string}, dispatch: Dispatch<any>) => {
    dispatch(setAppErrorAC({error: error.message? error.message : 'Some error occurred!'}))
    dispatch(setAppStatusAC({status: 'failed'}))
}
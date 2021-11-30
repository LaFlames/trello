import {Dispatch} from "redux";
import {setAppStatusAC} from "../../app/app-reducer";
import {loginApi, LoginDataType, todolistsApi} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkAppError} from "../../utilites/error-utils";
import {addTaskAC} from "../TodolistsList/Todolist/Task/tasks-reducer";


type ActionType =
    | ReturnType<typeof removeTaskAC>



const InitialState: any = {}

export const tasksReducer = (state = InitialState, action: ActionType): any => {
    switch (action.type) {

        default:
            return state
        }
}



//actions
export const removeTaskAC = (taskId: string, todolistId: string)  => {
    return { type: "REMOVE-TASK", taskId, todolistId } as const
}



//thunks
export let loginUserTC = (data: LoginDataType) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        loginApi.loginUser(data)
            .then(res => {
                if (res.data.resultCode === 0) {
                    alert(`${res.data.data.userId}`)
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkAppError(error, dispatch)
            })
    }
}











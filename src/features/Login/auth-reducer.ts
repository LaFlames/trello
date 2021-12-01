import {Dispatch} from "redux";
import {setAppErrorActionType, setAppStatusAC, setAppStatusActionType, setIsInitializedAC} from "../../app/app-reducer";
import {loginApi, LoginDataType, todolistsApi} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkAppError} from "../../utilites/error-utils";
import {addTaskAC} from "../TodolistsList/Todolist/Task/tasks-reducer";


type ActionType =
    | ReturnType<typeof changeIsLoggedInAC>

type AuthInitialStateType = {
    isLoggedIn: boolean
}

const InitialState: AuthInitialStateType = {
    isLoggedIn: false
}

export const authReducer = (state = InitialState, action: ActionType): AuthInitialStateType => {
    switch (action.type) {
        case "CHANGE_IS_LOGGED_IN": {
            return {...state, isLoggedIn: action.isLoggedIn}
        }
        default:
            return state
        }
}



//actions
export const changeIsLoggedInAC = (isLoggedIn: boolean)  => ({ type: "CHANGE_IS_LOGGED_IN", isLoggedIn } as const)



//thunks
export let loginUserTC = (data: LoginDataType) => {
    return (dispatch: Dispatch<ActionType | setAppStatusActionType | setAppErrorActionType>) => {
        dispatch(setAppStatusAC('loading'))
        loginApi.loginUser(data)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(changeIsLoggedInAC(true))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkAppError(error, dispatch)
            })
    }
}

export let logOutUserTC = () => {
    return (dispatch: Dispatch<ActionType | setAppStatusActionType | setAppErrorActionType>) => {
        dispatch(setAppStatusAC('loading'))
        loginApi.logOutUser()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(changeIsLoggedInAC(false))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkAppError(error, dispatch)
            })
    }
}

export let initializeAppTC = () => (dispatch: Dispatch) => {
    loginApi.initApp()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeIsLoggedInAC(true))

            }
            dispatch(setIsInitializedAC(true))
        })
}











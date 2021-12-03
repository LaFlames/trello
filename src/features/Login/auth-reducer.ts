import {Dispatch} from "redux";
import {setAppStatusAC} from "../../app/app-reducer";
import {loginApi, LoginDataType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkAppError} from "../../utilites/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";



const InitialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: "auth",
    initialState: InitialState,
    reducers: {
        changeIsLoggedInAC: (state, action: PayloadAction<{isLoggedIn: boolean}>) => {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    }
})

export const authReducer = slice.reducer
export const {changeIsLoggedInAC} = slice.actions






//thunks
export let loginUserTC = (data: LoginDataType) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        loginApi.loginUser(data)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                    dispatch(changeIsLoggedInAC({isLoggedIn: true}))
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
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        loginApi.logOutUser()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                    dispatch(changeIsLoggedInAC({isLoggedIn: false}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkAppError(error, dispatch)
            })
    }
}













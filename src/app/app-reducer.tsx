import {Dispatch} from "redux";
import {loginApi} from "../api/todolists-api";
import {changeIsLoggedInAC} from "../features/Login/auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{status: RequestStatusType}>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{error: string | null}>) {
            state.error = action.payload.error
        },
        setIsInitializedAC(state, action: PayloadAction<{isInitialized: boolean}>) {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer = slice.reducer
export const {setAppStatusAC, setAppErrorAC, setIsInitializedAC} = slice.actions


//thunks
export let initializeAppTC = () => (dispatch: Dispatch) => {
    loginApi.initApp()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeIsLoggedInAC({isLoggedIn: true}))

            }
            dispatch(setIsInitializedAC({isInitialized: true}))
        })
}


//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}



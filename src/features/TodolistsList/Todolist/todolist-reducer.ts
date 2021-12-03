import {todolistsApi, TodolistType} from "../../../api/todolists-api";
import {Dispatch} from "redux";
import {
    RequestStatusType,
    setAppStatusAC
} from "../../../app/app-reducer";
import {handleServerNetworkAppError} from "../../../utilites/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: TodolistEntityType[] = []

const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<string>) {
            const index = state.findIndex(tl => tl.id === action.payload)
            if (index !== -1) state.splice(index, 1)
        },
        addTodolistAC(state, action: PayloadAction<TodolistType>) {
            state.push({...action.payload, filter: "all", entityStatus: "idle"})
        },
        changeTodolistTitleAC(state, action: PayloadAction<{todolistId: string, newTitle: string}>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].title = action.payload.newTitle
        },
        changeTodolistFilterAC(state, action: PayloadAction<{todolistId: string, newFilterValue: FilterType}>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].filter = action.payload.newFilterValue
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{todolistId: string, status: RequestStatusType}>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].entityStatus = action.payload.status
        },
        setTodolistsAC(state, action: PayloadAction<TodolistType[]>) {
            return action.payload.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))
        }
    }
})

export const todoListsReducer = slice.reducer
export const {removeTodolistAC, addTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC,
    changeTodolistEntityStatusAC, setTodolistsAC} = slice.actions


//thunks
export let fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsApi.getTodolists()
            .then(res => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
            .catch((error) => {
                handleServerNetworkAppError(error, dispatch)
            })
    }
}

export let deleteTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        dispatch(changeTodolistEntityStatusAC({status: 'loading', todolistId}))
        todolistsApi.deleteTodolist(todolistId)
            .then(res => {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
    }
}

export let addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsApi.createTodolist(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
    }
}

export let changeTodolistTitleTC = (todolistId: string ,newTitle: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsApi.changeTodolistTitle(todolistId, newTitle)
            .then(res => {
                dispatch(changeTodolistTitleAC({todolistId, newTitle}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
    }
}


//types
export type TodolistEntityType = TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
}
export type FilterType = "all" | "active" | "completed"


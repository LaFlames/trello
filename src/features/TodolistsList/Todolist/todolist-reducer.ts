import {todolistsApi, TodolistType} from "../../../api/todolists-api";
import {FilterType} from "../../../app/App";
import {Dispatch} from "redux";
import {
    RequestStatusType,
    setAppErrorActionType,
    setAppStatusAC,
    setAppStatusActionType
} from "../../../app/app-reducer";
import {handleServerNetworkAppError} from "../../../utilites/error-utils";

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>

type ActionsType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>

export type TodolistEntityType = TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
}

const initialState: TodolistEntityType[] = []

export const todoListsReducer = (state = initialState, action: ActionsType): Array<TodolistEntityType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)
        case 'ADD-TODOLIST':
            let newTodolist: TodolistEntityType = {...action.todolist, filter: "all", entityStatus: "idle"}
            return [...state, newTodolist]
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.newTitle} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.newFilterValue} : tl)
        }
        case "CHANGE-TODOLIST-STATUS": {
            return state.map(tl => tl.id === action.todolistId ? {...tl, entityStatus: action.status} : tl)
        }
        case "SET-TODOLISTS": {
            return action.todolists.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))
        }
        default:
            return state
    }
}


//actions
export const removeTodolistAC = (todolistId: string) => {
    return { type: 'REMOVE-TODOLIST', todolistId} as const
}
export const addTodolistAC = (todolist: TodolistType) => {
    return { type: 'ADD-TODOLIST', todolist } as const
}
export const changeTodolistTitleAC = (todolistId: string, newTitle: string) => {
    return { type: 'CHANGE-TODOLIST-TITLE', todolistId, newTitle} as const
}
export const changeTodolistFilterAC = (newFilterValue: FilterType, todolistId: string) => {
    return { type: 'CHANGE-TODOLIST-FILTER', newFilterValue, todolistId} as const
}
export const changeTodolistEntityStatusAC = (status: RequestStatusType, todolistId: string) => {
    return { type: 'CHANGE-TODOLIST-STATUS', status, todolistId } as const
}
export const setTodolistsAC = (todolists: TodolistType[]) => {
    return { type: 'SET-TODOLISTS', todolists } as const
}





//thunks
export let fetchTodolistsTC = () => {
    return (dispatch: Dispatch<ActionsType | setAppStatusActionType | setAppErrorActionType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistsApi.getTodolists()
            .then(res => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((error) => {
                handleServerNetworkAppError(error, dispatch)
            })
    }
}

export let deleteTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC('loading', todolistId))
        todolistsApi.deleteTodolist(todolistId)
            .then(res => {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export let addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsApi.createTodolist(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export let changeTodolistTitleTC = (todolistId: string ,newTitle: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsApi.changeTodolistTitle(todolistId, newTitle)
            .then(res => {
                dispatch(changeTodolistTitleAC(todolistId, newTitle))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}


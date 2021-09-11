import {v1} from 'uuid';
import {todolistsApi, TodolistType} from "../api/todolists-api";
import {FilterType} from "../AppWithRedux";
import {Dispatch} from "redux";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    todolistId: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    todolist: TodolistType
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    todolistId: string
    newTitle: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    todolistId: string
    newFilterValue: FilterType
}
export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}

export type ActionsType = RemoveTodolistActionType |
    AddTodolistActionType |
    ChangeTodolistTitleActionType |
    ChangeTodolistFilterActionType |
    SetTodolistsActionType;

export type TodolistEntityType = TodolistType & {
    filter: FilterType
}

const initialState: TodolistEntityType[] = []

export const todoListsReducer = (state = initialState, action: ActionsType): Array<TodolistEntityType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)
        case 'ADD-TODOLIST':
            let newTodolist: TodolistEntityType = {...action.todolist, filter: "all"}
            return [...state, newTodolist]
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.todolistId);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.newTitle;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.todolistId);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.newFilterValue;
            }
            return [...state];
        }
        case "SET-TODOLISTS": {
            return action.todolists.map(tl => {
                return {...tl, filter: "all"}
            })
        }
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', todolistId}
}
export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', todolist }
}
export const changeTodolistTitleAC = (todolistId: string, newTitle: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', todolistId, newTitle}
}
export const changeTodolistFilterAC = (newFilterValue: FilterType, todolistId: string): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', newFilterValue, todolistId}
}
export const setTodolistsAC = (todolists: TodolistType[]): SetTodolistsActionType => {
    return { type: "SET-TODOLISTS", todolists }
}



export let fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistsApi.getTodolists()
            .then(res => {
                dispatch(setTodolistsAC(res.data))
            })
    }
}

export let deleteTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.deleteTodolist(todolistId)
            .then(res => {
                dispatch(removeTodolistAC(todolistId))
            })
    }
}

export let addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.createTodolist(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}

export let changeTodolistTitleTC = (todolistId: string ,newTitle: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.changeTodolistTitle(todolistId, newTitle)
            .then(res => {
                dispatch(changeTodolistTitleAC(todolistId, newTitle))
            })
    }
}


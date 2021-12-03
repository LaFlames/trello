import {TaskType, todolistsApi, UpdateTaskPropertiesType} from "../../../../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../../../app/store";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "../todolist-reducer";
import {setAppStatusAC} from "../../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkAppError} from "../../../../utilites/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const InitialState: TaskStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState: InitialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{taskId: string, todolistId: string}>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index !== -1) tasks.splice(index, 1)
        },
        addTaskAC(state, action: PayloadAction<{task: TaskType}>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(state, action: PayloadAction<{taskId: string, properties: UpdateTaskDomainPropertiesType, todolistId: string}>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index !== -1) tasks[index] = {...tasks[index], ...action.payload.properties}
        },
        setTasksAC(state, action: PayloadAction<{tasks: TaskType[], todolistId: string}>) {
            state[action.payload.todolistId] = action.payload.tasks
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.todolistId]
        });
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach(tl => {
                state[tl.id] = []
            })
        });
    }
})


export const tasksReducer = slice.reducer
export const {removeTaskAC, addTaskAC, updateTaskAC, setTasksAC} = slice.actions


//thunks
export let fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsApi.getTasks(todolistId)
            .then(res => {
                dispatch(setTasksAC({tasks: res.data.items, todolistId}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
    }
}

export let removeTasksTC = (todolistId: string, taskId: string, properties: UpdateTaskDomainPropertiesType) => {
    return (dispatch: Dispatch) => {
        dispatch(updateTaskAC({taskId, properties, todolistId}))
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsApi.deleteTask(todolistId, taskId)
            .then(res => {
                dispatch(removeTaskAC({taskId, todolistId}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
    }
}

export let addTaskTC = (todolistId: string, taskTitle: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsApi.createTask(todolistId, taskTitle)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC({task: res.data.data.item}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkAppError(error, dispatch)
            })
    }
}

export type UpdateTaskDomainPropertiesType =  {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
export let updateTaskTC = (taskId: string, properties: UpdateTaskDomainPropertiesType, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        const state = getState();
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            throw new Error("Task not found")
            return
        }

        let apiProperties: UpdateTaskPropertiesType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...properties
        }

        todolistsApi.updateTask(todolistId, taskId, apiProperties)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC({taskId, properties, todolistId}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }

            })
            .catch((error) => {
                handleServerNetworkAppError(error, dispatch)
            })
    }
}

//types
export type TaskStateType = {
    [key: string]: TaskType[]
}









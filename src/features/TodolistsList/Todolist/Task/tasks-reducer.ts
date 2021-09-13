import {TaskStateType} from "../../../../app/App";
import {TaskType, todolistsApi, UpdateTaskPropertiesType} from "../../../../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../../../app/store";
import {AddTodolistACType, RemoveTodolistACType, SetTodolistsACType} from "../todolist-reducer";
import {setAppErrorAC, setAppStatusAC} from "../../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkAppError} from "../../../../utilites/error-utils";


type ActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistACType
    | RemoveTodolistACType
    | SetTodolistsACType
    | ReturnType<typeof setTasksAC>


const InitialState: TaskStateType = {}

export const tasksReducer = (state = InitialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id != action.taskId)}
        }
        case "ADD-TASK": {
            let newTask: TaskType = action.task
            return {...state, [newTask.todoListId]: [newTask, ...state[newTask.todoListId]]}
        }
        case "UPDATE-TASK": {
            return {
                ...state,
                [action.todolistId]:
                    state[action.todolistId].map(t => t.id ===action.taskId ? {...t, ...action.taskProperties} : t)
            }
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolist.id]: []}
        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.todolistId];
            return copyState
        }
        case "SET-TODOLISTS": {
            let copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case "SET-TASKS": {
            return {...state, [action.todolistId]: action.tasks}
        }
        default:
            return state
        }
}



//actions
export const removeTaskAC = (taskId: string, todolistId: string)  => {
    return { type: "REMOVE-TASK", taskId, todolistId } as const
}
export const addTaskAC = (task: TaskType) => {
    return { type: "ADD-TASK", task } as const
}
export const updateTaskAC = (taskId: string, taskProperties: UpdateTaskDomainPropertiesType, todolistId: string) => {
    return { type: "UPDATE-TASK", taskId, taskProperties, todolistId } as const
}
export const setTasksAC = (tasks: TaskType[], todolistId: string) => {
    return { type: "SET-TASKS", tasks, todolistId } as const
}



//thunks
export let fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsApi.getTasks(todolistId)
            .then(res => {
                dispatch(setTasksAC(res.data.items, todolistId))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export let removeTasksTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsApi.deleteTask(todolistId, taskId)
            .then(res => {
                dispatch(removeTaskAC(taskId, todolistId))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export let addTaskTC = (todolistId: string, taskTitle: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsApi.createTask(todolistId, taskTitle)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC(res.data.data.item))
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
        dispatch(setAppStatusAC('loading'))
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
                    dispatch(updateTaskAC(taskId, properties, todolistId))
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









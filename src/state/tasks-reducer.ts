import {TaskStateType} from "../App";
import {v1} from "uuid";


type RemoveTaskActionType = {
    type: "REMOVE-TASK",
    taskId: string,
    todolistId: string
}
type AddTaskActionType = {
    type: "ADD-TASK",
    taskTitle: string,
    todolistId: string
}
type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS",
    taskId: string,
    newIsDone: boolean,
    todolistId: string
}
type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE",
    taskId: string,
    newTitle: string,
    todolistId: string
}


export type ActionType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType

/*reducer - take initial state and action object (that modifies state), and return updated state*/
export const tasksReducer = (state: TaskStateType, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            let copyState = {...state}
            copyState[action.todolistId] = copyState[action.todolistId].filter(t => t.id != action.taskId)
            return copyState
        }
        case "ADD-TASK": {
            let newTask = { id: v1(), title: action.taskTitle, isDone: false }
            /*let copyStatee = {...state}
            let todolistTasks = copyStatee[action.todolistId]
            copyStatee[action.todolistId] = [newTask, ...todolistTasks]
            return copyStatee*/
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        }
        case "CHANGE-TASK-STATUS": {
            let copyState = {...state}
            let updatedTaskTodolist = copyState[action.todolistId].map(task => {
                if (task.id === action.taskId) {
                    return {...task, isDone: action.newIsDone}
                } else {
                    return task
                }
            })
            return {
                ...state,
                [action.todolistId]: updatedTaskTodolist
            }
        }
        case "CHANGE-TASK-TITLE": {
            let copyState = {...state}
            let updatedTaskTodolist = copyState[action.todolistId].map(task => {
                if (task.id === action.taskId) {
                    return {...task, title: action.newTitle}
                } else {
                    return task
                }
            })
            return {
                ...state,
                [action.todolistId]: updatedTaskTodolist
            }
        }
        default:
            return state
    }
}
//{...state,[action.todoListID]:state[action.todoListID].filter(i => i.id !== action.taskID)}


export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType  => {
    return { type: "REMOVE-TASK", taskId, todolistId }
}

export const addTaskAC = (taskTitle: string, todolistId: string): AddTaskActionType  => {
    return { type: "ADD-TASK", taskTitle, todolistId }
}

export const changeTaskStatusAC = (taskId: string, newIsDone: boolean, todolistId: string): ChangeTaskStatusActionType  => {
    return { type: "CHANGE-TASK-STATUS", taskId, newIsDone, todolistId }
}

export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string): ChangeTaskTitleActionType  => {
    return { type: "CHANGE-TASK-TITLE", taskId, newTitle, todolistId }
}
import {v1} from "uuid";
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    setTodolistsAC,
    SetTodolistsActionType
} from "./todolist-reducer";
import {TaskStateType} from "../AppWithRedux";
import {TaskPriorities, TaskStatuses, TaskType, todolistsApi, UpdateTaskPropertiesType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";




type RemoveTaskActionType = {
    type: "REMOVE-TASK",
    taskId: string,
    todolistId: string
}
type AddTaskActionType = {
    type: "ADD-TASK",
    task: TaskType
}
type UpdateTaskActionType = {
    type: "UPDATE-TASK",
    taskId: string,
    taskProperties: UpdateTaskDomainPropertiesType,
    todolistId: string
}
export type SetTasksActionType = {
    type: "SET-TASKS"
    tasks: TaskType[]
    todolistId: string
}



export type ActionType = RemoveTaskActionType |
    AddTaskActionType |
    UpdateTaskActionType |
    AddTodolistActionType |
    RemoveTodolistActionType |
    SetTodolistsActionType |
    SetTasksActionType

/*reducer - take initial state and action object (that modifies state), and return updated state*/
const InitialState: TaskStateType = {}

export const tasksReducer = (state = InitialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            let copyState = {...state}
            copyState[action.todolistId] = copyState[action.todolistId].filter(t => t.id != action.taskId)
            return copyState
        }
        case "ADD-TASK": {
            let newTask: TaskType = action.task
            /*let copyStatee = {...state}
            let todolistTasks = copyStatee[action.todolistId]
            copyStatee[action.todolistId] = [newTask, ...todolistTasks]
            return copyStatee*/
            return {...state, [newTask.todoListId]: [newTask, ...state[newTask.todoListId]]}
        }
        case "UPDATE-TASK": {
            let copyState = {...state}
            let updatedTaskTodolist = copyState[action.todolistId].map(task => {
                if (task.id === action.taskId) {
                    return {...task, ...action.taskProperties}
                } else {
                    return task
                }
            })
            return {
                ...state,
                [action.todolistId]: updatedTaskTodolist
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
            let copyState = {...state}
            copyState[action.todolistId] = action.tasks

            return {...state, [action.todolistId]: action.tasks}
        }
        default:
            return state
        }
}
//{...state,[action.todoListID]:state[action.todoListID].filter(i => i.id !== action.taskID)}


export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType  => {
    return { type: "REMOVE-TASK", taskId, todolistId }
}
export const addTaskAC = (task: TaskType): AddTaskActionType  => {
    return { type: "ADD-TASK", task }
}
export const updateTaskAC = (taskId: string, taskProperties: UpdateTaskDomainPropertiesType, todolistId: string): UpdateTaskActionType  => {
    return { type: "UPDATE-TASK", taskId, taskProperties, todolistId }
}
export const setTasksAC = (tasks: TaskType[], todolistId: string): SetTasksActionType => {
    return { type: "SET-TASKS", tasks, todolistId }
}




export let fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.getTasks(todolistId)
            .then(res => {
                dispatch(setTasksAC(res.data.items, todolistId))
            })
    }
}
export let removeTasksTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.deleteTask(todolistId, taskId)
            .then(res => {
                dispatch(removeTaskAC(taskId, todolistId))
            })
    }
}
export let addTaskTC = (todolistId: string, taskTitle: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.createTask(todolistId, taskTitle)
            .then(res => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}



export type UpdateTaskDomainPropertiesType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

export let updateTaskTC = (taskId: string, properties: UpdateTaskDomainPropertiesType, todolistId: string) => {

    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

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
                dispatch(updateTaskAC(taskId, properties, todolistId))
            })
    }
}









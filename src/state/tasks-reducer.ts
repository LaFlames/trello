import {v1} from "uuid";
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    setTodolistsAC,
    SetTodolistsActionType
} from "./todolist-reducer";
import {TaskStateType} from "../AppWithRedux";
import {TaskPriorities, TaskStatuses, TaskType, todolistsApi} from "../api/todolists-api";
import {Dispatch} from "redux";




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
export type SetTasksActionType = {
    type: "SET-TASKS"
    tasks: TaskType[]
    todolistId: string
}



export type ActionType = RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskStatusActionType |
    ChangeTaskTitleActionType |
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
            let newTask: TaskType = { id: v1(), title: action.taskTitle, status: TaskStatuses.New, todoListId: action.todolistId, startDate: "",
            deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, completed: false, description: ""}
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
                    return {...task, completed: action.newIsDone}
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
                }})
            return {...state,
            [action.todolistId]: updatedTaskTodolist}
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolistId]: []}
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
export const addTaskAC = (taskTitle: string, todolistId: string): AddTaskActionType  => {
    return { type: "ADD-TASK", taskTitle, todolistId }
}
export const changeTaskStatusAC = (taskId: string, newIsDone: boolean, todolistId: string): ChangeTaskStatusActionType  => {
    return { type: "CHANGE-TASK-STATUS", taskId, newIsDone, todolistId }
}
export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string): ChangeTaskTitleActionType  => {
    return { type: "CHANGE-TASK-TITLE", taskId, newTitle, todolistId }
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










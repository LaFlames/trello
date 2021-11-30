import axios from 'axios'



let settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '27fcbdba-1f27-4a26-aef3-5bdefc4c041f'
    }
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
 })


export const loginApi = {
    loginUser(data: LoginDataType) {
        return instance.post<ResponseType<{userId?: number}>>(`auth/login`, {...data})
    }
}


export const todolistsApi = {
    getTodolists () {
        return instance.get<TodolistType[]>(`todo-lists`)
    },
    createTodolist (title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>(`todo-lists`, {title})
    },
    deleteTodolist (todolistId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
    },
    changeTodolistTitle (todolistId: string, title: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {title})
    },



    getTasks (todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask (todolistId: string, title: string) {
        return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask (todolistId: string, taskId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask (todolistId: string, taskId: string, properties: UpdateTaskPropertiesType) {
        return instance.put<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks/${taskId}`, properties)
    }
}


//types
export type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
}
export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}
export enum TaskPriorities {
    Low,
    Middle,
    Mi,
    Urgently,
    Later
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTasksResponseType = {
    items: TaskType[]
    totalCount: number
    error: string
}
export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}
export type UpdateTaskPropertiesType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export type LoginDataType = {
    email: string,
    password: string,
    rememberMe: boolean
    captcha?: string
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

const initialState = {
    status: 'succeeded' as RequestStatusType,
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "APP/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({ type: "APP/SET-STATUS", status } as const)
export const setAppErrorAC = (error: string | null) => ({ type: "APP/SET-ERROR", error } as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({ type: "APP/SET-IS-INITIALIZED", isInitialized } as const)

export type setAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type setAppErrorActionType = ReturnType<typeof setAppErrorAC>
type ActionsType = setAppStatusActionType | setAppErrorActionType | ReturnType<typeof setIsInitializedAC>



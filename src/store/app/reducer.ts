import {ThunkType} from "../store";
import {authAPI} from "../../api";

export type AppStateType = {
    error: string | null
    status: string | null
    isAuth: boolean
}

export enum APP_ACTIONS {
    SET_AUTH = "appReducer/SET_AUTH",
    SET_ERROR = "appReducer/SET_ERROR",
    SET_STATUS = "appReducer/SET_STATUS",
}

export type AppActionsType = AuthMeActionType | SetErrorActionType | SetStatusActionType;

const initState: AppStateType = {
    error: null,
    isAuth: false,
    status: null,
}

export const appReducer = (state = initState, action: AppActionsType): AppStateType => {
    switch (action.type) {
        case APP_ACTIONS.SET_ERROR:
            return {...state, error: action.error}
        case APP_ACTIONS.SET_AUTH:
            return {...state, isAuth: action.isAuth}
        case APP_ACTIONS.SET_STATUS:
            return {...state, status: action.status}
        default:
            return state;
    }
}

// ACTIONS
export type AuthMeActionType = ReturnType<typeof setAuth>
export const setAuth = (isAuth: boolean) => {
    return {
        type: APP_ACTIONS.SET_AUTH,
        isAuth,
    } as const
}

export type SetStatusActionType = ReturnType<typeof setAppStatus>
export const setAppStatus = (status: string | null) => {
    return {
        type: APP_ACTIONS.SET_STATUS,
        status,
    } as const
}

export type SetErrorActionType = ReturnType<typeof setAppError>
export const setAppError = (error: string | null) => {
    return {
        type: APP_ACTIONS.SET_ERROR,
        error,
    } as const
}

// THUNK
export const login = (isSuccess: boolean): ThunkType => dispatch => {
    authAPI.login(isSuccess)
        .then((res) => {
            if (res.data) {
                dispatch(setAppStatus('sign in success'))
                dispatch(setAuth(true))
            }
        })
        .catch((e) => {
            dispatch(setAppError(e.message))
            dispatch(setAuth(false))
        })
}

export const register = (isSuccess: boolean): ThunkType => dispatch => {
    authAPI.register(isSuccess)
        .then((res) => {
            if (res.data) {
                dispatch(setAppStatus('sign up success'))
            }
        })
        .catch((e) => {
            dispatch(setAppError(e.message))
            dispatch(setAuth(false))
        })
}

export const changePassword = (isSuccess: boolean): ThunkType => dispatch => {
    authAPI.changePassword(isSuccess)
        .then((res) => {
            if (res.data) {
                dispatch(setAppStatus('password changed'))
                dispatch(setAuth(true))
            }
        })
        .catch((e) => {
            dispatch(setAppError(e.message))
        })
}
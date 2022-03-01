import {ThunkType} from "../store";
import {authAPI} from "../../api";

export type AppStateType = {
    error: string | null
    status: string | null
    auth: boolean
}

export enum APP_ACTIONS {
    AUTH_ME = "appReducer/AUTH_ME",
    SET_ERROR = "appReducer/SET_ERROR",
    SET_STATUS = "appReducer/SET_STATUS",
}

export type AppActionsType = AuthMeActionType | SetErrorActionType | SetStatusActionType

const initState: AppStateType = {
    error: null,
    auth: false,
    status: null,
}

export const appReducer = (state = initState, action: AppActionsType): AppStateType => {
    switch (action.type) {

        case APP_ACTIONS.SET_ERROR:
            return {...state, error: action.error}
        default:
            return state;
    }
}

// ACTIONS
export type AuthMeActionType = ReturnType<typeof authMe>
export const authMe = (payload: boolean) => {
    return {
        type: APP_ACTIONS.AUTH_ME,
        payload,
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

export const fetchAuthMe = (): ThunkType => dispatch => {
    authAPI.me()
        .then((res) => {
            dispatch(authMe(true))
        })
        .catch((e) => {
            dispatch(authMe(false))
            const error = e.response ? e.response.data.error : e.message;
        })
}

export const login = (): ThunkType => dispatch => {
    authAPI.login()
        .then((res) => {
            dispatch(authMe(true))
            dispatch(setAppStatus('sign in success'))
        })
        .catch((e) => {
            dispatch(authMe(false))
            dispatch(authMe(false))
            const error = e.response ? e.response.data.error : e.message;
        })
}
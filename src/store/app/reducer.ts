import {ThunkType} from "../store";
import {authAPI} from "../../api";

export type AppStateType = {
    error: string | null
    auth: boolean
    signUpSuccess: boolean
}

export enum APP_ACTIONS {
    AUTH_ME = "appReducer/AUTH_ME",
    SIGN_UP_SUCCESS = "appReducer/SIGN_UP_SUCCESS",
    SET_ERROR = "appReducer/SET_ERROR",
}

export type AppActionsType = AuthMeActionType | SetSignUpSuccessType | SetErrorActionType

const initState: AppStateType = {
    error: null,
    auth: false,
    signUpSuccess: false,
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

export type SetSignUpSuccessType = ReturnType<typeof setSignUpSuccess>
export const setSignUpSuccess = (payload: boolean) => {
    return {
        type: APP_ACTIONS.SIGN_UP_SUCCESS,
        payload,
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
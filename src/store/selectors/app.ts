import {RootStateType} from "../store";

export const selectIsAuth = (state: RootStateType): boolean => state.app.isAuth
export const selectAppStatus = (state: RootStateType): string | null => state.app.status
export const selectAppError = (state: RootStateType): string | null => state.app.error
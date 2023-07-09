import {E_SendingStatus} from "../../../const/Events";

export type T_LogoutState = {
    status: E_SendingStatus
    error?: Record<string, any>
}

export const initialState: T_LogoutState = {
    status: E_SendingStatus.idle,
}

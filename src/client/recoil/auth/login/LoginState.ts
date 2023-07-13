import {UserModel} from "../../../models/UserModel";
import {E_SendingStatus} from "../../../const/Events";

export type T_LoginState = {
    user?: UserModel
    isLoading: E_SendingStatus
    error?: Record<string, any>
}

export const initialState: T_LoginState = {
    isLoading: E_SendingStatus.idle
}

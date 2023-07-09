import {UserModel} from "../../../models/UserModel";
import {E_SendingStatus} from "../../../const/Events";

export type T_LoginState = {
    user?: UserModel
    status: E_SendingStatus
    error?: Record<string, any>
}

export const initialState: T_LoginState = {
    status: E_SendingStatus.idle
}

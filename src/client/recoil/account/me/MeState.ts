import {E_SendingStatus} from "../../../const/Events";
import {UserModel} from "../../../models/UserModel";
import {atom} from "recoil";
import {KeyMe} from "../../KeyRecoil";

type T_MeState = {
    user?: UserModel
    isLoading: E_SendingStatus
    error?: Record<string, any>
}

export const initialState: T_MeState = {
    isLoading: E_SendingStatus.idle
}

export const MeState = atom<T_MeState>({
    key: KeyMe,
    default: initialState
})

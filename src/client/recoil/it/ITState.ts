import {atom} from "recoil";
import {E_SendingStatus} from "../../const/Events";
import {KeyIT} from "../KeyRecoil";
import {InitModel, TrackingModel} from "../../models/ITModel";

export type T_ITState = {
    init?: InitModel
    tracking?: TrackingModel
    isLoading: E_SendingStatus
    error?: Record<string, any>
}

export const initialState: T_ITState = {
    isLoading: E_SendingStatus.idle,
}

export const ITState = atom<T_ITState>({
    key: KeyIT,
    default: initialState
})

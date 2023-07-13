import {E_SendingStatus} from "../../../client/const/Events";
import {ProductModel} from "../../../client/models/ProductModel";
import {atom} from "recoil";
import {KeyProduct} from "../KeyRecoil";

export type T_ProductState = {
    isLoading: E_SendingStatus,
    items: ProductModel[],
    error?: Record<string, any>
}

export type T_FormState = {
    isLoading: E_SendingStatus,
    error?: Record<string, any>
}

export const initialState: T_ProductState = {
    isLoading: E_SendingStatus.idle,
    items: []
}

export const ProductState = atom<T_ProductState>({
    key: KeyProduct,
    default: initialState
})

export const initialFormState: T_FormState = {
    isLoading: E_SendingStatus.idle
}
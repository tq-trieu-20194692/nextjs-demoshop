import {E_SendingStatus} from "../../const/Events";
import {ProductModel} from "../../models/ProductModel";
import {atom} from "recoil";
import {KeyProduct} from "../KeyRecoil";
import {PaginateMetaModel} from "../../models/ApiResModel";

export type T_ProductState = {
    isLoading: E_SendingStatus,
    items: ProductModel[],
    error?: Record<string, any>,
    query: {
        page: number,
        count : number,
        page_item:number,
        limit: number,
        sort: string,
        order: string
    }
    oMeta?: PaginateMetaModel
}

export type T_FormState = {
    isLoading: E_SendingStatus,
    error?: Record<string, any>
}

export const initialState: T_ProductState = {
    isLoading: E_SendingStatus.idle,
    items: [],
    query:{
        page:1,
        count:1,
        page_item:10,
        limit: 10,
        sort: "date",
        order: "desc"
    }
}

export const ProductState = atom<T_ProductState>({
    key: KeyProduct,
    default: initialState
})


export const initialFormState: T_FormState = {
    isLoading: E_SendingStatus.idle
}
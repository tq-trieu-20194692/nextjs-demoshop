import {E_SendingStatus} from "../../const/Events";
import {ColorModel} from "../../models/ColorModel";
import {atom} from "recoil";
import {KeyColor} from "../KeyRecoil";

export type T_ColorState = {
    isLoading: E_SendingStatus,
    items: ColorModel[],
    error?: Record<string, any>,
    query : {
        page: number,
        count : number,
        page_item:number
    }

}

export type T_FormState = {
    isLoading: E_SendingStatus,
    error?: Record<string, any>
}

export const initialState: T_ColorState = {
    isLoading: E_SendingStatus.idle,
    items: [],
    query:{
        page:1,
        count:1,
        page_item:10,
    }
}

export const ColorState = atom<T_ColorState>({
    key: KeyColor,
    default: initialState
})


export const initialFormState: T_FormState = {
    isLoading: E_SendingStatus.idle
}
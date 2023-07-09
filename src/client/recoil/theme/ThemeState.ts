import {atom} from "recoil";
import {KeyTheme} from "../KeyRecoil";

export type T_ThemeState = {
    sidebarShow?: boolean,
    sidebarUnfoldable?: boolean
}

export const initialState: T_ThemeState = {
    sidebarShow: true
}

export const ThemeState = atom<T_ThemeState>({
    key: KeyTheme,
    default: initialState
})

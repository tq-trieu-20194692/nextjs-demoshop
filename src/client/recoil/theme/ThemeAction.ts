import {useRecoilState, useRecoilValue, useResetRecoilState} from "recoil";
import {T_ThemeState, ThemeState} from "./ThemeState";

export const ThemeAction = () => {
    const [state, setState] = useRecoilState(ThemeState)
    const vm = useRecoilValue(ThemeState)
    const resetState = useResetRecoilState(ThemeState)

    const dispatchSetState = (item: T_ThemeState) => {
        setState({
            ...state,
            ...item
        })
    }

    return {
        vm,
        dispatchSetState,
        dispatchResetState: resetState
    }
}

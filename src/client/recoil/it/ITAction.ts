import {useRecoilState, useRecoilValue, useResetRecoilState} from "recoil";
import {ITState} from "./ITState";
import {E_SendingStatus} from "../../const/Events";
import {ApiService} from "../../repositories/ApiService";
import {InitModel, TrackingModel} from "../../models/ITModel";
import {useInjection} from "inversify-react";

export const ITAction = () => {
    const apiService = useInjection(ApiService)

    const [state, setState] = useRecoilState(ITState)
    const vm = useRecoilValue(ITState)
    const resetState = useResetRecoilState(ITState)

    const dispatchInit = () => {
        setState({
            ...state,
            isLoading: E_SendingStatus.loading
        })

        apiService
            .init()
            .then(r => {
                if (r.success) {
                    setState({
                        ...state,
                        init: r.data && new InitModel(r.data),
                        isLoading: E_SendingStatus.complete
                    })
                } else {
                    setState({
                        ...state,
                        error: r.error,
                        isLoading: E_SendingStatus.complete
                    })
                }
            })
            .catch(err => {
                setState({
                    ...state,
                    error: {
                        warning: err
                    },
                    isLoading: E_SendingStatus.complete
                })
            })
    }

    const dispatchTracking = () => {
        apiService
            .tracking()
            .then(r => {
                if (r.success) {
                    setState({
                        ...state,
                        tracking: r.data && new TrackingModel(r.data),
                    })
                }
            })
    }

    const dispatchClearInit = () => {
        setState({
            ...state,
            init: undefined
        })
    }

    return {
        vm,
        dispatchInit,
        dispatchTracking,
        dispatchClearInit,
        dispatchResetState: resetState
    }
}

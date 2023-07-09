import {AxiosError, AxiosResponse} from "axios";
import {SetterOrUpdater} from "recoil";
import {E_ResCode, E_SendingStatus} from "../const/Events";

export const setErrorHandled = (
    state: any,
    setState: SetterOrUpdater<any>,
    key?: string | string[],
    err?: any
) => {
    console.error('ErrorHandled', err)

    let status: E_SendingStatus

    if (typeof (err as AxiosError).response === 'object') { // server error
        switch ((err.response as AxiosResponse).status) {
            case E_ResCode.HTTP_UNAUTHORIZED:
                status = E_SendingStatus.unauthorized

                break
            case E_ResCode.HTTP_SERVICE_UNAVAILABLE:
                status = E_SendingStatus.maintenance

                break
            case E_ResCode.HTTP_INTERNAL_SERVER_ERROR:
            default:
                status = E_SendingStatus.serverError

                break
        }
    } else { // internet disconnect
        if (navigator.onLine) {
            status = E_SendingStatus.serverError
        } else {
            status = E_SendingStatus.disConnect
        }

    }

    if (key) {
        if (typeof key === "string") {
            setState({
                ...state,
                [key]: status
            })
        } else if (key.length >= 2) {
            setState({
                ...state,
                [key[0]]: {
                    [key[1]]: status
                }
            })
        }
    }
}

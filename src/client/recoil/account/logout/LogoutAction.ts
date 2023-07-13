import {initialState, T_LogoutState} from "./LogoutState";
import {E_SendingStatus} from "../../../const/Events";
import {ApiService} from "../../../repositories/ApiService";
import {setErrorHandled} from "../../CmAction";
import {useSessionContext} from "../../../presentation/contexts/SessionContext";
import {MeAction} from "../me/MeAction";
import {useInjection} from "inversify-react";
import {useState} from "react";

export const LogoutAction = () => {
    const [session, setSession] = useSessionContext()
    const apiService = useInjection(ApiService)

    const {
        dispatchClearUser
    } = MeAction()

    const [state, setState] = useState<T_LogoutState>(initialState)

    const dispatchLogout = () => {
        setState({
            ...state,
            status: E_SendingStatus.loading
        })

        // apiService
            // .logout()
            // .then(r => {
            //     if (r.success) {
            //         // remove store user
                    dispatchClearUser()

                    setSession({
                        ...session,
                        isAuthenticated: false,
                        user: undefined,
                        redirectPath: ''
                    })

                    setState({
                        ...state,
                        status: E_SendingStatus.success,
                    })
                // } else {
                //     setState({
                //         ...state,
                //         status: E_SendingStatus.error,
                //         error: r.error
                //     })
                // }
            // })
            // .catch(err => setErrorHandled(state, setState, 'status', err))
    }

    const dispatchResetState = () => {
        setState(initialState)
    }

    return {
        vm: state,
        dispatchLogout,
        dispatchResetState
    }
}

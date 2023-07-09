import {initialState, T_LoginState} from "./LoginState";
import {ApiService} from "../../../repositories/ApiService";
import {T_LoginVO, UserModel} from "../../../models/UserModel";
import {setErrorHandled} from "../../CmAction";
import {MeAction} from "../../account/me/MeAction";
import {useSessionContext} from "../../../presentation/contexts/SessionContext";
import {useInjection} from "inversify-react";
import {E_SendingStatus} from "../../../const/Events";
import {useState} from "react";

export const LoginAction = () => {
    const [session, setSession] = useSessionContext()
    const apiService = useInjection(ApiService)

    const {
        dispatchStoreUser
    } = MeAction()

    const [state, setState] = useState<T_LoginState>(initialState)

    const dispatchLogIn = (data: T_LoginVO) => {
        setState({
            ...state,
            status: E_SendingStatus.loading
        })

        apiService
            .login(data)
            .then(r => {
                if (r.success) {
                    const user = new UserModel(r.data)

                    dispatchStoreUser(user)

                    setSession({
                        ...session,
                        isAuthenticated: true,
                        user: user
                    })

                    setState({
                        ...state,
                        user: user,
                        status: E_SendingStatus.success
                    })
                } else {
                    setState({
                        ...state,
                        status: E_SendingStatus.error,
                        error: r.error
                    })
                }
            })
            .catch(err => setErrorHandled(state, setState, 'status', err))
    }

    const dispatchResetState = () => {
        setState(initialState)
    }

    return {
        vm: state,
        dispatchLogIn,
        dispatchResetState
    }
}

import {initialState, T_LoginState} from "./LoginState";
import {ApiService} from "../../../repositories/ApiService";
import {T_LoginVO, UserModel} from "../../../models/UserModel";
import {setErrorHandled} from "../../CmAction";
import {MeAction} from "../../account/me/MeAction";
import {useSessionContext} from "../../../presentation/contexts/SessionContext";
import {useInjection} from "inversify-react";
import {E_SendingStatus} from "../../../const/Events";
import {useState} from "react";
import axios from "axios";

export const LoginAction = () => {
    const [session, setSession] = useSessionContext()
    const apiService = useInjection(ApiService)

    // const {
    //     dispatchStoreUser
    // } = MeAction()

    const [state, setState] = useState<T_LoginState>(initialState)

    const dispatchLogIn = (data: T_LoginVO) => {
        setState({
            ...state,
            isLoading: E_SendingStatus.loading
        })

        axios
            .post("http://222.252.10.203:30100/admin.php?route=auth/login", data)
            .then(response => {
                console.log(response)
                setSession({
                    ...session,
                    isAuthenticated: true,
                    user: new UserModel(response.data),
                    redirectPath:'/'
                })
                setState({
                    ...state,
                    isLoading: E_SendingStatus.success,
                    user: new UserModel(response.data)
                })
            })

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

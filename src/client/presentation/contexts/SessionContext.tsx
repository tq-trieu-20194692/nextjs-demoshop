import React, {createContext, useContext, useEffect, useState} from "react";
import {initialSession, SessionModel} from "../../models/SessionModel";
import {UserModel} from "../../models/UserModel";
import {T_NextAppData} from "../../const/Types";
import {useInjection} from "inversify-react";
import {StoreConfig} from "../../config/StoreConfig";
import {EDLocal} from "../../core/encrypt/EDLocal";
import {Utils} from "../../core/Utils";
import {MeAction} from "../../recoil/account/me/MeAction";
import {E_CookieKey, E_LSKey} from "../../const/Events";

export const SessionContext = createContext<[SessionModel, (session: SessionModel) => void]>([initialSession, () => {
    //
}])

export const useSessionContext = () => useContext(SessionContext)

export const SessionContextProvider: React.FC<{ data?: T_NextAppData, children?: any }> = (props) => {
    const storeConfig = useInjection(StoreConfig)
    const [sessionState, setSessionState] = useState(initialSession)
    const defaultSessionContext: [SessionModel, typeof setSessionState] = [sessionState, setSessionState]

    const {
        dispatchSetMe
    } = MeAction()

    useEffect(() => {
        const cls = EDLocal.getLocalStore(E_LSKey.User)

        if (cls) {
            const user = new UserModel(cls)
            initialSession.user = user
            initialSession.isAuthenticated = true
            initialSession.redirectPath = "/"

            storeConfig.token = user.apiToken

            // if (!EDLocal.getCookie(E_CookieKey.User) && user.apiToken) {
            //     EDLocal.setCookie(E_CookieKey.User, Utils.rmObjectByValue(user.apiToken))
            // }

            dispatchSetMe(user)
        }

        if (props.data && props.data.header?.token) {
            initialSession.user = new UserModel({
                token: props.data.header.token
            })
            initialSession.isAuthenticated = true
            initialSession.redirectPath = "/"

            storeConfig.accessToken = props.data.header.token
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <SessionContext.Provider value={defaultSessionContext}>
            {props.children}
        </SessionContext.Provider>
    )
}

import React, {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import {useSessionContext} from "../contexts/SessionContext";
import {RouteConfig} from "../../config/RouteConfig";
import {useLocation} from "react-router";
import {Color} from "../../const/Color";

type _T_Props = {
    component: any
    props?: any
}

export const PrivateRoute: React.FC<_T_Props> = (props) => {
    const [session, setSession] = useSessionContext()
    const location = useLocation()

    const [isAuth, setIsAuth] = useState<boolean>()

    useEffect(() => {
        if (!session.isAuthenticated) {
            // store current url
            setSession({
                ...session,
                redirectPath: location.pathname
            })

            console.log(`%cNot Login & redirectPath: ${location.pathname}`, Color.ConsoleWarning)

            setIsAuth(false)
        } else {
            setIsAuth(true)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session.isAuthenticated])

    return (
        isAuth === undefined
            ? null
            : isAuth
                ? <props.component {...props.props}/>
                : <Navigate to={RouteConfig.LOGIN}/>
    )
}

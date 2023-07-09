import {memo, Suspense} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {CContainer, CSpinner} from '@coreui/react'
import {PrivateRoute} from "../PrivateRoute";
import {RouteConfig} from "../../../config/RouteConfig";

const AppContent = () => {
    return (
        <CContainer lg>
            <Suspense fallback={<CSpinner color="primary"/>}>
                <Routes>
                    {
                        RouteConfig.masterRoutes.map((route, idx) => (
                            route.component && (
                                <Route
                                    key={idx}
                                    path={route.path}
                                    element={
                                        route.protect
                                            ? <PrivateRoute component={route.component}/>
                                            : <route.component/>
                                    }
                                />
                            )
                        ))
                    }
                    <Route path="/" element={<Navigate to={RouteConfig.DASHBOARD} replace/>}/>
                </Routes>
            </Suspense>
        </CContainer>
    )
}

export default memo(AppContent)

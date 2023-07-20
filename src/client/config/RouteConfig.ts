import React, {lazy} from "react";

type _T_Rcc = {
    path: string
    name?: string
    component?: React.FC<any>
    protect?: boolean
    replace?: boolean
    children?: _T_Rcc[]
}

export type T_Rco = _T_Rcc & {
    routes?: _T_Rcc[]
}

const DashboardScreen = lazy(() => import("../presentation/screens/dashboard/DashboardScreen"))
const ProductScreen = lazy(() => import ("../presentation/screens/Product/ProductScreen"))
const ProductForm = lazy(() => import ("../presentation/screens/Product/ProductForm"))
const ProductSearch = lazy(() => import ("../presentation/screens/Product/ProductSearch"))


export class RouteConfig {
    static readonly NOT_FOUND: string = "*"
    static readonly LOGIN: string = "/login"

    static readonly DASHBOARD: string = "/dashboard"
    static readonly PRODUCT: string = "/product"
    static readonly PRODUCTFORM: string = "/productform"
    static readonly PRODUCTSEARCH: string = "/productsearch"

    static masterRoutes: T_Rco[] = [
        {
            name: 'dashboard',
            path: RouteConfig.DASHBOARD,
            component: DashboardScreen,
            protect: true
        },
        {
            name: 'product',
            path: RouteConfig.PRODUCT,
            component: ProductScreen,
            protect: true
        },
        // {
        //     name: 'product',
        //     path: RouteConfig.PRODUCTFORM,
        //     component: ProductForm,
        //     protect: true
        // },
        // {
        //     name: 'product',
        //     path: RouteConfig.PRODUCTSEARCH,
        //     component: ProductSearch,
        //     protect: true
        // }

    ]
}

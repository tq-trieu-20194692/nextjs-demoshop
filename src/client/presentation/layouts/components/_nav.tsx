import React from 'react'
import CIcon from '@coreui/icons-react'
import {cilChart, cilDrop, cilSpeedometer, cilPhone} from '@coreui/icons'
import {CNavGroup, CNavItem, CNavTitle, } from '@coreui/react'
import {RouteConfig} from "../../../config/RouteConfig";

type _T_NavChild = {
    component: any
    name: string
    to?: string
    badge?: {
        color: string
        text: string
    }
    href?: string
    items?: _T_NavChild[]
}

export type T_Nav = _T_NavChild & {
    icon?: any
}

const _nav: T_Nav[] = [
    {
        component: CNavItem,
        name: 'Dashboard',
        to: RouteConfig.DASHBOARD,
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon"/>,
        badge: {
            color: 'info',
            text: 'NEW',
        },
    },
    {
        component: CNavTitle,
        name: 'COMPONENTS'
    },
    {
        component: CNavItem,
        name: 'Base',
        icon: <CIcon icon={cilDrop} customClassName="nav-icon"/>,
        to: RouteConfig.NOT_FOUND
    },
    {
        component: CNavGroup,
        name: 'Charts',
        icon: <CIcon icon={cilChart} customClassName="nav-icon"/>,
        items: [
            {
                component: CNavItem,
                name: 'Test',
                to: RouteConfig.NOT_FOUND
            }
        ]
    },
    {
        component: CNavItem,
        name: 'Product',
        to: RouteConfig.PRODUCT,
        icon: <CIcon icon={cilPhone} customClassName="nav-icon"/>,
        badge: {
            color: 'info',
            text: '',
        },
    }
]

export default _nav

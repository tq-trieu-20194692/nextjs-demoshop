import React from 'react'
import {NavLink, useLocation} from 'react-router-dom'
import PropTypes from 'prop-types'
import {CBadge} from '@coreui/react'
import {T_Nav} from "./_nav";

type _T_Props = {
    items: T_Nav[]
}

export const AppSidebarNav = ({items}: _T_Props) => {
    const location = useLocation()

    const navLink = (name?: string, icon?: string, badge?: T_Nav["badge"]) => {
        return (
            <>
                {!!icon && icon}
                {!!name && name}
                {
                    !!badge && (
                        <CBadge color={badge.color} className="ms-auto">
                            {badge.text}
                        </CBadge>
                    )
                }
            </>
        )
    }

    const navItem = (item: T_Nav, index: number) => {
        const {component, name, badge, icon, ...rest} = item
        const Component = component

        return (
            <Component
                {
                    ...(
                        rest.to && !rest.items && {
                            component: NavLink
                        }
                    )
                }
                key={index}
                {...rest}
            >
                {navLink(name, icon, badge)}
            </Component>
        )
    }

    const navGroup = (item: T_Nav, index: number) => {
        const {component, name, icon, to, ...rest} = item
        const Component = component

        return (
            <Component
                idx={String(index)}
                key={index}
                toggler={navLink(name, icon)}
                visible={location.pathname.startsWith(to!)}
                {...rest}
            >
                {
                    item.items?.map((item, index) =>
                        item.items ? navGroup(item, index) : navItem(item, index)
                    )
                }
            </Component>
        )
    }

    return (
        <>
            {
                items && items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))
            }
        </>
    )
}

AppSidebarNav.propTypes = {
    items: PropTypes.arrayOf(PropTypes.any).isRequired
}

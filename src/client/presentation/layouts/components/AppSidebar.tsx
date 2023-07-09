import React from 'react'
import {CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler} from '@coreui/react'
import {AppSidebarNav} from './AppSidebarNav'
import {logoFull, logoNarrow} from '../../../assets/brand/brand'
import SimpleBar from 'simplebar-react'
import navigation from './_nav'
import {ThemeAction} from "../../../recoil/theme/ThemeAction";
import CIcon from "@coreui/icons-react";

const AppSidebar = () => {
    const {
        vm,
        dispatchSetState
    } = ThemeAction()

    return (
        <CSidebar
            position="fixed"
            unfoldable={vm.sidebarUnfoldable}
            visible={vm.sidebarShow}
            onVisibleChange={(visible) => {
                dispatchSetState({
                    sidebarShow: visible
                })
            }}
        >
            {/*@ts-ignore*/}
            <CSidebarBrand className="d-none d-md-flex" to="/">
                <CIcon className="sidebar-brand-full" icon={logoFull} height={35}/>
                <CIcon className="sidebar-brand-narrow" icon={logoNarrow} height={35}/>
            </CSidebarBrand>
            <CSidebarNav>
                <SimpleBar>
                    <AppSidebarNav items={navigation}/>
                </SimpleBar>
            </CSidebarNav>
            <CSidebarToggler
                className="d-none d-lg-flex"
                onClick={() => dispatchSetState({
                    sidebarUnfoldable: !vm.sidebarUnfoldable
                })}
            />
        </CSidebar>
    )
}

export default React.memo(AppSidebar)

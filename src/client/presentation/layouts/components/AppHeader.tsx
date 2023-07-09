import React, {ReactNode} from 'react'
import {CContainer, CHeader, CHeaderBrand, CHeaderDivider, CHeaderNav, CHeaderToggler, CNavItem, CNavLink} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {cilBell, cilEnvelopeOpen, cilMenu} from '@coreui/icons'
import {logoHeader} from '../../../assets/brand/brand'
import {ThemeAction} from "../../../recoil/theme/ThemeAction";
import AppBreadcrumb from "./AppBreadcrumb";
import AppHeaderDropdown from "./AppHeaderDropdown";
import {ArrowLeftOutlined, ArrowRightOutlined, ReloadOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router";

type _T_Props = {
    tool?: ReactNode
    onReload?: Function
}

const AppHeader = (props: _T_Props) => {
    const navigate = useNavigate()

    const {
        vm,
        dispatchSetState
    } = ThemeAction()

    return (
        <CHeader position="sticky" className="mb-4">
            <CContainer fluid>
                <CHeaderToggler
                    className="ps-1"
                    onClick={() => dispatchSetState({sidebarShow: !vm.sidebarShow})}
                >
                    <CIcon icon={cilMenu} size="lg"/>
                </CHeaderToggler>
                {/*@ts-ignore*/}
                <CHeaderBrand className="mx-auto d-md-none" to="/">
                    <CIcon icon={logoHeader} height={28}/>
                </CHeaderBrand>
                <CHeaderNav className="d-none d-md-flex me-auto">
                    <CNavItem>
                        <CNavLink className={"cursor-pointer"} onClick={() => navigate(-1)}>
                            <ArrowLeftOutlined style={{fontSize: "1.3rem"}}/>
                        </CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink className={"cursor-pointer"} onClick={() => navigate(1)}>
                            <ArrowRightOutlined style={{fontSize: "1.3rem"}}/>
                        </CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink
                            className={"cursor-pointer"}
                            disabled={props.onReload === undefined}
                            onClick={(event) => {
                                event.preventDefault()

                                if (props.onReload) {
                                    props.onReload()
                                }
                            }}
                        >
                            <ReloadOutlined style={{fontSize: "1.3rem"}}/>
                        </CNavLink>
                    </CNavItem>
                </CHeaderNav>
                <CHeaderNav>
                    <CNavItem>
                        <CNavLink href="#">
                            <CIcon icon={cilBell} size="lg"/>
                        </CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink href="#">
                            <CIcon icon={cilEnvelopeOpen} size="lg"/>
                        </CNavLink>
                    </CNavItem>
                </CHeaderNav>
                <CHeaderNav className="ml-3">
                    <AppHeaderDropdown/>
                </CHeaderNav>
            </CContainer>
            <CHeaderDivider/>
            <CContainer fluid>
                <AppBreadcrumb/>
                {
                    !!props.tool && (
                        <div className={"overflow-x-auto overflow-y-hidden"}>
                            {props.tool}
                        </div>
                    )
                }
            </CContainer>
        </CHeader>
    )
}

export default AppHeader

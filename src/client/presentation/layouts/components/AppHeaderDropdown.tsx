import React, {useState} from 'react'
import {CAvatar} from '@coreui/react'
import {cilAccountLogout, cilUserFollow} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import noAvatar from './../../../assets/images/no_avatar.jpg'
import {MeAction} from "../../../recoil/account/me/MeAction";
import {Card, Dropdown, Modal} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";
import {LogoutWidget} from "../../widgets/LogoutWidget";

const AppHeaderDropdown = () => {
    const {t} = useTranslation()
    const [modalApi, contextHolder] = Modal.useModal()

    const {
        vm: vmMe
    } = MeAction()

    const [isModalLogoutVisible, setIsModalLogoutVisible] = useState(false)

    const onClickLogout = () => {
        modalApi.confirm({
            zIndex: 1030,
            title: t('text.confirmLogout'),
            icon: <ExclamationCircleOutlined/>,
            okText: t('button.ok'),
            cancelText: t('button.close'),
            onOk() {
                setIsModalLogoutVisible(true)
            }
        })
    }

    const onCloseModalLogout = () => {
        setIsModalLogoutVisible(false)
    }

    return (
        <>
            {contextHolder}
            <Dropdown
                trigger={['click']}
                arrow={{
                    pointAtCenter: true
                }}
                dropdownRender={(originNode) => (
                    <Card
                        size="small"
                        title={vmMe.user?.name}
                        style={{
                            width: 200
                        }}
                        bodyStyle={{
                            padding: 0
                        }}
                    >
                        {originNode}
                    </Card>
                )}
                menu={{
                    items: [
                        {
                            key: '0',
                            label: "Profile",
                            icon: <CIcon icon={cilUserFollow}/>
                        },
                        {
                            type: 'divider'
                        },
                        {
                            key: '3',
                            label: 'Đăng xuất',
                            icon: <CIcon icon={cilAccountLogout}/>,
                            onClick: onClickLogout
                        }
                    ],
                    style: {
                        padding: 0,
                        border: 0,
                        borderRadius: 0,
                        boxShadow: "none",
                        marginTop: "1px"
                    }
                }}
            >
                <CAvatar
                    className={"cursor-pointer"}
                    src={vmMe.user?.image ?? noAvatar.src}
                    size="md"
                />
            </Dropdown>
            {
                isModalLogoutVisible && (
                    <LogoutWidget onClose={onCloseModalLogout}/>
                )
            }
        </>
    )
}

export default AppHeaderDropdown

import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {Alert, Modal, Result, Spin} from "antd";
import {Color} from "../../const/Color";
import {LogoutAction} from "../../recoil/account/logout/LogoutAction";
import {E_SendingStatus} from "../../const/Events";
import ErrorItemWidget from "./ErrorItemWidget";

export function LogoutWidget(props: {
    onClose: Function
}) {
    const {t} = useTranslation()

    const {
        vm,
        dispatchLogout,
        dispatchResetState
    } = LogoutAction()

    useEffect(() => {
        console.log('%cMount Screen: LogoutScreen', Color.ConsoleInfo)

        dispatchLogout()

        return () => {
            dispatchResetState()

            console.log('%cUnmount Screen: LogoutScreen', Color.ConsoleInfo)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [isModalVisible, setIsModalVisible] = useState(true)

    const handleClose = () => {
        setIsModalVisible(false)
        props.onClose()
    }

    const isError = vm.status === E_SendingStatus.error

    return (
        <Modal
            forceRender={false}
            zIndex={1030}
            open={isModalVisible}
            onCancel={handleClose}
            cancelText={t('button.close')}
            footer={null}
            closable={isError}
            destroyOnClose={true}
            keyboard={false}
            maskClosable={false}
        >
            <ErrorItemWidget
                status={vm.status}
                onClose={handleClose}
            >
                {
                    (isError && vm.error && vm.error.hasOwnProperty('warning')) && (
                        <Alert className={"mt-6"} message={vm.error['warning']} type="error" showIcon/>
                    )
                }
                {
                    vm.status === E_SendingStatus.loading
                        ? <div className={"text-center"}>
                            <Spin tip={t('text.signingOut')}/>
                        </div>
                        :
                        vm.status === E_SendingStatus.success && (
                            <Result
                                status="success"
                                title={t('text.logoutSuccess')}
                            />
                        )
                }
            </ErrorItemWidget>
        </Modal>
    )
}

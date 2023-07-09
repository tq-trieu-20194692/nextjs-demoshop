import React, {useEffect, useMemo, useRef, useState} from "react";
import {Modal} from "antd";
import {useRouter} from "next/router";
import {NotificationOutlined, RedoOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";
import {useSessionContext} from "./SessionContext";
import {ITAction} from "../../recoil/it/ITAction";
import {MeAction} from "../../recoil/account/me/MeAction";
import {Color} from "../../const/Color";
import {E_SendingStatus} from "../../const/Events";
import {MaintenanceWidget} from "../widgets/it/MaintenanceWidget";
import {Utils} from "../../core/Utils";
import {App} from "../../const/App";
import {UpdateWidget} from "../widgets/it/UpdateWidget";
import {E_Required, InitModel} from "../../models/ITModel";
import {InitErrorWidget, InitLoadingWidget} from "../widgets/it/InitWidget";

export const InitTracking = (props: any) => {
    const [session, setSession] = useSessionContext()
    const router = useRouter()
    const {t} = useTranslation()

    const {
        vm,
        dispatchInit,
        dispatchTracking,
        dispatchResetState
    } = ITAction()

    const {
        dispatchClearUser
    } = MeAction()

    const [isModalUpdateVisible, setIsModalUpdateVisible] = useState<boolean>(false)
    const [dataChange, setDataChange] = useState<InitModel>()
    const trackingInterval = useRef<NodeJS.Timeout>()

    useEffect(() => {
        console.log('%cMount Screen: InitTracking', Color.ConsoleInfo)

        if (vm.isLoading == E_SendingStatus.idle) {
            dispatchInit()
        }

        return () => {
            if (vm.init && vm.tracking) {
                console.log('%cUnmount Screen: InitTracking', Color.ConsoleInfo)

                dispatchResetState()
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (vm.isLoading == E_SendingStatus.complete) {
            if (!trackingInterval.current) {
                trackingInterval.current = setInterval(() => {
                    dispatchTracking()
                }, App.TimeoutTracking)
            }

            if (vm.init) {
                setDataChange(vm.init)
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vm.isLoading])

    useEffect(() => {
        if (vm.tracking) {
            setDataChange(vm.tracking)
        }
    }, [vm.tracking])

    const getView = useMemo(() => {
        if (dataChange) {
            if (session.isAuthenticated) {
                if (!dataChange.user) {
                    // remove store user
                    dispatchClearUser()

                    setSession({
                        ...session,
                        isAuthenticated: false
                    })

                    return props.children
                }
            } else {
                if (dataChange.user) {
                    setSession({
                        ...session,
                        isAuthenticated: true
                    })

                    return props.children
                }
            }

            if (dataChange.maintenance?.status) {
                return <MaintenanceWidget message={dataChange.maintenance?.message}/>
            } else {
                if (dataChange.update?.version) {
                    if (Utils.versionCompare(App.Version, dataChange.update.version) == -1) {
                        if (dataChange.update.required == E_Required.Obligatory) {
                            if (trackingInterval.current) {
                                clearInterval(trackingInterval.current)
                            }

                            return (
                                <UpdateWidget
                                    title={dataChange.update.title}
                                    message={dataChange.update.message}
                                />
                            )
                        } else if (dataChange.update.required == E_Required.Notify) {
                            if (!isModalUpdateVisible) {
                                setIsModalUpdateVisible(true)
                            }
                        }
                    }
                }

                return props.children
            }
        }

        return props.children

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataChange])

    return (
        <>
            <Modal
                forceRender={false}
                title={<><NotificationOutlined className={"mr-2"}/>{vm.init?.update?.title}</>}
                open={isModalUpdateVisible}
                keyboard={false}
                onCancel={() => setIsModalUpdateVisible(false)}
                onOk={() => router.reload()}
                cancelText={t("button.close")}
                okText={<><RedoOutlined className={"mr-2"}/>Tải lại</>}
            >
                <p>{vm.init?.update?.message}</p>
            </Modal>
            {
                vm.isLoading == E_SendingStatus.loading
                    ? <InitLoadingWidget/>
                    : vm.isLoading == E_SendingStatus.complete
                        ? getView
                        : <InitErrorWidget/>
            }
        </>
    )
}

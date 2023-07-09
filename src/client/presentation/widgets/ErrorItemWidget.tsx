import {useTranslation} from "react-i18next";
import {E_SendingStatus} from "../../const/Events";
import {Button, Col, Modal, notification, Result, Row, Space, Typography} from "antd";
import {RouteConfig} from "../../config/RouteConfig";
import {CloseCircleOutlined, FrownOutlined} from "@ant-design/icons";
import {includes} from "lodash";
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";

const ErrorItemWidget = (props: {
    onClose?: Function,
    children: any;
    status?: E_SendingStatus,
    typeView?: 'default' | 'modal' | 'notification',
    onRefresh?: Function | null
}) => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const [modalApi, modalContextHolder] = Modal.useModal()
    const [notificationApi, notiContextHolder] = notification.useNotification()

    const [render, setRender] = useState(props.children)

    useEffect(() => {
        if (!includes([E_SendingStatus.disConnect, E_SendingStatus.serverError, E_SendingStatus.unauthorized], props.status)) {
            if (props.status === E_SendingStatus.maintenance) {
                modalApi.error({
                    zIndex: 1030,
                    title: t('text.maintenance'),
                    content: (
                        <div className={"text-justify"}>
                            {t('message.maintenance')}
                        </div>
                    ),
                    okText: (
                        <>
                            <CloseCircleOutlined className="site-result-demo-error-icon mr-2"/>{t('button.close')}
                        </>
                    ),
                    okType: "default"
                })
            }
        }

        if (props.typeView === 'modal') {
            switch (props.status) {
                case E_SendingStatus.disConnect:
                    modalApi.error({
                        zIndex: 1030,
                        title: t('text.noInternet'),
                        content: (
                            <>
                                <p className={"mb-0"}>
                                    <CloseCircleOutlined className="site-result-demo-error-icon mr-2"/>{t('text.checkModem')}
                                </p>
                                <p className={"mb-0"}>
                                    <CloseCircleOutlined className="site-result-demo-error-icon mr-2"/>{t('text.reconnectWifi')}
                                </p>
                            </>
                        ),
                        okText: (
                            <>
                                <CloseCircleOutlined className="site-result-demo-error-icon mr-2"/>{t('button.close')}
                            </>
                        ),
                        okType: "default"
                    })

                    break;
                case E_SendingStatus.serverError:
                    modalApi.error({
                        zIndex: 1030,
                        title: t('text.error'),
                        content: (
                            <div className={"text-justify"}>
                                {t('message.confirmError')}
                            </div>
                        ),
                        okText: (
                            <>
                                <CloseCircleOutlined className="site-result-demo-error-icon mr-2"/>{t('button.close')}
                            </>
                        ),
                        okType: "default"
                    })

                    break;
                case E_SendingStatus.unauthorized:
                    modalApi.error({
                        zIndex: 1030,
                        title: t('text.loginAgain'),
                        content: (
                            <div className={"text-justify"}>
                                {t('text.contentUnAuthorized')}
                            </div>
                        ),
                        okText: (
                            <>
                                <CloseCircleOutlined className="site-result-demo-error-icon mr-2"/>{t('button.close')}
                            </>
                        ),
                        okType: "default"
                    })

                    break;
                default:
                    setRender(props.children)
            }
        } else if (props.typeView === 'notification') {

            switch (props.status) {
                case E_SendingStatus.disConnect:
                    notificationApi.error({
                        message: t('text.noInternet'),
                        description: (
                            <>
                                <p className={"mb-0"}>
                                    <CloseCircleOutlined className="site-result-demo-error-icon mr-2"/>{t('text.checkModem')}
                                </p>
                                <p className={"mb-0"}>
                                    <CloseCircleOutlined className="site-result-demo-error-icon mr-2"/>{t('text.reconnectWifi')}
                                </p>
                            </>
                        )
                    })

                    break
                case E_SendingStatus.serverError:
                    notificationApi.error({
                        message: t('text.error'),
                        description: (
                            <div className={"text-justify"}>{t('message.confirmError')}</div>
                        ),
                    })

                    break
                case E_SendingStatus.unauthorized:
                    notificationApi.error({
                        message: t('text.loginAgain'),
                        description: (
                            <div className={"text-justify"}>{t('text.contentUnAuthorized')}</div>
                        ),
                    })

                    break
                default:
                    setRender(props.children)
            }
        } else {
            if (includes([E_SendingStatus.disConnect, E_SendingStatus.serverError, E_SendingStatus.unauthorized], props.status)) {
                setRender(
                    <Row justify={"center"}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            {
                                props.status === E_SendingStatus.disConnect
                                    ? <Result
                                        status="error"
                                        title={t('text.noInternet')}
                                    >
                                        <div className="desc">
                                            <Typography.Paragraph>
                                                <Typography.Text
                                                    strong
                                                    style={{
                                                        fontSize: 16,
                                                    }}
                                                >
                                                    {t('text.tryStepToConnect')}
                                                </Typography.Text>
                                            </Typography.Paragraph>
                                            <Typography.Paragraph>
                                                <CloseCircleOutlined className="site-result-demo-error-icon mr-2"/>{t('text.checkModem')}
                                            </Typography.Paragraph>
                                            <Typography.Paragraph>
                                                <CloseCircleOutlined className="site-result-demo-error-icon mr-2"/>{t('text.reconnectWifi')}
                                            </Typography.Paragraph>
                                        </div>
                                    </Result>
                                    : props.status === E_SendingStatus.serverError
                                        ? <div>
                                            <Result
                                                status="500"
                                                title={t('text.error')}
                                                subTitle={t('message.confirmError')}
                                                extra={
                                                    <Space>
                                                        <Button
                                                            type="primary"
                                                            onClick={() => {
                                                                if (props.onClose) {
                                                                    props.onClose()
                                                                }
                                                                navigate(RouteConfig.DASHBOARD)
                                                            }}
                                                        >
                                                            {t('text.home')}
                                                        </Button>
                                                        <Button
                                                            type="primary"
                                                            onClick={() => props.onRefresh != null ? props.onRefresh() : null}
                                                        >
                                                            {t('button.tryAgain')}
                                                        </Button>
                                                    </Space>
                                                }
                                            />
                                        </div>
                                        :
                                        props.status === E_SendingStatus.unauthorized && (
                                            <Result
                                                status={"error"}
                                                icon={<FrownOutlined/>}
                                                title={t('text.noData')}
                                            />
                                        )
                            }
                        </Col>
                    </Row>
                )
            } else {
                setRender(props.children)
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.status, props.children])

    return (
        <>
            {modalContextHolder}
            {notiContextHolder}
            {render}
        </>
    )
}

export default ErrorItemWidget

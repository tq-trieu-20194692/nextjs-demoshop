import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import {CCard, CCardBody, CCardGroup, CCol, CContainer, CRow} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {cilLockLocked, cilUser} from '@coreui/icons'
import {Button, Form, Input, Modal, Typography} from "antd";
import {useTranslation} from "react-i18next";
import {useSessionContext} from "../../contexts/SessionContext";
import {E_SendingStatus} from "../../../const/Events";
import {LoginAction} from "../../../recoil/auth/login/LoginAction";
import {Color} from "../../../const/Color";
import {useNavigate} from "react-router";
import {Navigate} from "react-router-dom";
import {RouteConfig} from "../../../config/RouteConfig";
import {FieldData, ValidateErrorEntity} from "rc-field-form/lib/interface";
import {LoginOutlined} from "@ant-design/icons";
import ErrorItemWidget from "../../widgets/ErrorItemWidget";
import {Utils} from "../../../core/Utils";

type _T_FormName = {
    username: string
    password: string
}

type _T_FormError = {
    [K in keyof _T_FormName]?: _T_FormName[K]
}

const LoginScreen = () => {
    const navigate = useNavigate()
    const {t} = useTranslation()
    const [session] = useSessionContext()
    const [modalApi, contextHolder] = Modal.useModal()

    const {
        vm,
        dispatchLogIn,
        dispatchResetState
    } = LoginAction()

    const [formErrors, setFormErrors] = useState<_T_FormError>({})

    const inputTimeoutRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({})

    useEffect(() => {
        console.log('%cMount Screen: LoginScreen', Color.ConsoleInfo)

        return () => {
            dispatchResetState()

            console.log('%cUnmount Screen: LoginScreen', Color.ConsoleInfo)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useLayoutEffect(() => {
        if (session.isAuthenticated) {
            navigate(session.redirectPath, {
                replace: true
            })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session.isAuthenticated])

    useEffect(() => {
        if (vm.status === E_SendingStatus.error) {
            setFormErrors({})
        }
    }, [vm.status])

    useEffect(() => {
        if (vm.error && Object.keys(vm.error).length > 0) {
            let _formErrors = formErrors

            Object.entries(vm.error).forEach(([key, value]) => {
                _formErrors = {
                    ..._formErrors,
                    [key]: value
                }
            })

            setFormErrors(_formErrors)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vm.error])

    const onFinish = (values: _T_FormName) => {
        dispatchLogIn({
            username: values.username.trim(),
            password: values.password
        })
    }

    const isLoading = vm.status === E_SendingStatus.loading

    const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
        let _formErrors = formErrors

        errorInfo.errorFields.forEach((e) => {
            _formErrors = {
                ..._formErrors,
                [e.name[0]]: e.errors[0]
            }
        })

        setFormErrors(_formErrors)
    }

    const onFieldsChange = (data: FieldData[]) => {
        let _formErrors = formErrors

        data.forEach((e: any) => {
            switch (e.name[0]) {
                case 'username':
                    if (inputTimeoutRef.current.username) clearTimeout(inputTimeoutRef.current.username)

                    if (e.errors.length > 0) {
                        inputTimeoutRef.current.username = setTimeout(() => {
                            setFormErrors(error => ({
                                ...error,
                                username: e.errors[0]
                            }))
                        }, 1000)
                    } else if (_formErrors.username) {
                        _formErrors = {
                            ..._formErrors,
                            username: ''
                        }
                    }

                    break
                case 'password':
                    if (inputTimeoutRef.current.password) clearTimeout(inputTimeoutRef.current.password)

                    if (e.errors.length > 0) {
                        inputTimeoutRef.current.password = setTimeout(() => {
                            setFormErrors(error => ({
                                ...error,
                                password: e.errors[0]
                            }))
                        }, 1000)
                    } else if (_formErrors.password) {
                        _formErrors = {
                            ..._formErrors,
                            password: ''
                        }
                    }

                    break
            }
        })

        setFormErrors(_formErrors)
    }

    // redirect if logged
    if (session.isAuthenticated) {
        return <Navigate to={RouteConfig.DASHBOARD}/>
    }

    return (
        <>
            {contextHolder}
            <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol md={8}>
                            <CCardGroup>
                                <CCard className="p-4">
                                    <CCardBody>
                                        <ErrorItemWidget
                                            status={vm.status}
                                            typeView={'modal'}
                                        >
                                            <Typography.Title
                                                level={2}
                                                className={"mb-0"}
                                            >
                                                {t("text.login")}
                                            </Typography.Title>
                                            <Typography.Text type={"secondary"}>
                                                {t('text.loginSubTitle')}
                                            </Typography.Text>

                                            <Form
                                                className={"mt-3"}
                                                name={"login"}
                                                onFinish={onFinish}
                                                onFinishFailed={onFinishFailed}
                                                onFieldsChange={onFieldsChange}
                                            >
                                                <div className={"flex flex-col gap-2"}>
                                                    <Form.Item
                                                        key={'username'}
                                                        name={"username"}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                whitespace: true,
                                                                message: t('error.required', {
                                                                    label: `${t('text.username')}`.toLowerCase()
                                                                })
                                                            },
                                                            {
                                                                min: 3,
                                                                max: 30,
                                                                message: t('error.length', {
                                                                    label: t('text.username'),
                                                                    min: 3,
                                                                    max: 30
                                                                }).toString()
                                                            }
                                                        ]}
                                                        validateStatus={Utils.viewStatusError<_T_FormError>(formErrors, 'username')}
                                                        help={Utils.viewHelpError<_T_FormError>(formErrors, 'username')}
                                                    >
                                                        <Input
                                                            placeholder={t("text.username")}
                                                            addonBefore={<CIcon icon={cilUser}/>}
                                                        />
                                                    </Form.Item>
                                                    <Form.Item
                                                        className={"form-item-main"}
                                                        key={'password'}
                                                        name={"password"}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: t('error.required', {
                                                                    label: `${t('text.password')}`.toLowerCase()
                                                                })
                                                            },
                                                            {
                                                                min: 6,
                                                                max: 30,
                                                                message: t('error.length', {
                                                                    label: t('text.password'),
                                                                    min: 6,
                                                                    max: 30
                                                                }).toString()
                                                            }
                                                        ]}
                                                        validateStatus={Utils.viewStatusError<_T_FormError>(formErrors, 'password')}
                                                        help={Utils.viewHelpError<_T_FormError>(formErrors, 'password')}
                                                    >
                                                        <Input.Password
                                                            style={{
                                                                textAlign: "start"
                                                            }}
                                                            placeholder={t('text.password')}
                                                            addonBefore={<CIcon icon={cilLockLocked}/>}
                                                        />
                                                    </Form.Item>
                                                </div>
                                                <CRow className={"mt-2"}>
                                                    <CCol xs={6}>
                                                        <Button
                                                            htmlType={"submit"}
                                                            type={"primary"}
                                                            size={"large"}
                                                            loading={isLoading}
                                                            icon={<LoginOutlined/>}
                                                        >
                                                            {t('text.login')}
                                                        </Button>
                                                    </CCol>
                                                    <CCol xs={6} className="text-right">
                                                        <Button
                                                            type="link"
                                                            onClick={() => {
                                                                modalApi.info({
                                                                    title: t('text.notify'),
                                                                    content: t('help.admin'),
                                                                    okText: t('button.close'),
                                                                    okType: "default"
                                                                });
                                                            }}
                                                        >
                                                            {t('text.forgotPassword')}
                                                        </Button>
                                                    </CCol>
                                                </CRow>
                                            </Form>

                                        </ErrorItemWidget>
                                    </CCardBody>
                                </CCard>
                            </CCardGroup>
                        </CCol>
                    </CRow>
                </CContainer>
            </div>
        </>
    )
}

export default LoginScreen

import {LoadingOutlined} from "@ant-design/icons";
import {Button, Result} from "antd";
import {useTranslation} from "react-i18next";

export const InitLoadingWidget = () => {
    return (
        <div className={"flex h-screen justify-between items-center"}>
            <div className="mx-auto">
                <LoadingOutlined style={{fontSize: 60}} spin/>
                <div className={"mt-5"}>Loading...</div>
            </div>
        </div>
    )
}

export const InitErrorWidget = () => {
    const {t} = useTranslation()

    return (
        <div className={"flex h-screen justify-between items-center"}>
            <div className="mx-auto animate__animated animate__bounceIn">
                <Result
                    status="warning"
                    title="Có một số vấn đề với hoạt động của bạn."
                    extra={
                        <Button type="primary" key="console">
                            {t('text.reload')}
                        </Button>
                    }
                />
            </div>
        </div>
    )
}

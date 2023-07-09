import {Button, Result} from "antd";
import {useRouter} from "next/router";
import {RedoOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";

export const MaintenanceWidget = (props: {
    message?: string
}) => {
    const {t} = useTranslation()
    const router = useRouter()

    return (
        <div className={"flex h-screen justify-between items-center"}>
            <div className="mx-auto animate__animated animate__bounceIn">
                <Result
                    title={props.message ?? "Hệ thống đang bảo trì"}
                    extra={
                        <Button
                            type="primary"
                            key="console"
                            icon={<RedoOutlined/>}
                            onClick={() => router.reload()}
                        >
                            {t('text.reload')}
                        </Button>
                    }
                />
            </div>
        </div>
    )
}

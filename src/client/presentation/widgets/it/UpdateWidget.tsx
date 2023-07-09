import {Button, Result} from "antd";
import {RedoOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";
import {useTranslation} from "react-i18next";

export const UpdateWidget = (props: {
    title?: string,
    message?: string
}) => {
    const {t} = useTranslation()
    const router = useRouter()

    return (
        <div className={"flex h-screen justify-between items-center"}>
            <div className="mx-auto animate__animated animate__bounceIn">
                <Result
                    title={props.title ?? "Hệ thống đang bảo trì"}
                    subTitle={props.message}
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

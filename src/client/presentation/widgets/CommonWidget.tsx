import {useTranslation} from "react-i18next";
import {Empty, Spin, Tag} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import {find} from "lodash";
import {CustomTypography} from "../components/CustomTypography";
import {T_TagCheck} from "../../const/Types";

type _T_CTF = {
    key: string
    label: string
    check?: T_TagCheck[]
}

export const CommonEmptyWidget = () => {
    const {t} = useTranslation()

    return (
        <div className={"my-10"}>
            <Empty description={t('text.noData')}/>
        </div>
    )
}

export const CommonTagFilterWidget = (props: {
    is: boolean,
    onClose: Function,
    data: any;
    items: _T_CTF[],
    className?: string
}) => {
    return (
        props.is && props.items.length > 0
            ? <div className={`flex flex-wrap gap-2 pb-4 ${props.className}`}>
                {
                    props.items.map((element, index) => {
                        const key = element.key.split('.')

                        let isTag
                        let value

                        if (key.length > 1) {
                            isTag = props.data.hasOwnProperty(key[0])
                                && props.data[key[0]].hasOwnProperty(key[1])
                                && props.data[key[0]][key[1]].length > 0

                            if (isTag) {
                                if (element.check && element.check.length > 1) {
                                    const search = find(element.check, (o) => o.value == props.data[key[0]][key[1]])

                                    if (search) {
                                        value = search.label
                                    }
                                }

                                if (!value) {
                                    value = props.data[key[0]][key[1]]
                                }
                            }
                        } else {
                            isTag = typeof props.data[element.key] !== "undefined"
                                && props.data[element.key].length > 0;

                            if (isTag) {
                                if (element.check && element.check.length > 1) {
                                    const search = find(element.check, (o) => o.value === props.data[element.key])

                                    if (search) {
                                        value = search.label
                                    }
                                }

                                if (!value) {
                                    value = props.data[element.key]
                                }
                            }
                        }

                        return (
                            isTag && value !== undefined
                                ? <Tag
                                    className={"tag-main"}
                                    key={index}
                                    closable
                                    onClose={_ => props.onClose(element.key)}
                                    color={"blue"}
                                >
                                    <CustomTypography
                                        isStrong
                                        textStyle={"text-body-text-3"}
                                    >
                                        {element.label}
                                    </CustomTypography>
                                    :   &nbsp;
                                    <CustomTypography
                                        textStyle={"text-body-text-3"}
                                    >
                                        {value}
                                    </CustomTypography>
                                </Tag>
                                : null
                        )
                    })
                }
            </div>
            : null
    )
}

export const CommonLoadingSpinWidget = () => {
    return (
        <div className={"container mx-auto text-center mt-8"}>
            <Spin
                size="large"
                indicator={<LoadingOutlined style={{fontSize: "2.5rem"}} spin/>}
            />
        </div>
    )
}

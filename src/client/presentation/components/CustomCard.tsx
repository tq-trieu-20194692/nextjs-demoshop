import React, {FC} from "react";
import {Card, CardProps} from "antd";

type _T_CustomCard = {
    status: boolean
    children?: any
    isFocus?: boolean
    notify?: any
    cardProps?: CardProps
}

export const CustomCard: FC<_T_CustomCard> = (props) => {
    const _headStyle = (isActive: boolean): React.CSSProperties => {
        const css: React.CSSProperties = {}

        if (isActive) {
            css.background = "#009B90"
            css.color = "white"
        } else {
            css.background = "gray"
            css.color = "white"
        }

        return css
    }

    return (
        <Card
            className={`shadow card-title-overflow ${props.isFocus ? "card-focus" : ""}`}
            headStyle={_headStyle(props.status)}
            size={"small"}
            bodyStyle={{
                padding: 0
            }}
            {...props.cardProps}
        >
            {props.children}
        </Card>
    )
}
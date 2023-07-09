import React, {CSSProperties} from "react";
import {Typography} from "antd";

type _T_Props = {
    type?: "text" | "title" | "link"
    href?: string
    target?: React.HTMLAttributeAnchorTarget
    color?: "#969696" | "#009B90" | "#FFFFFF" | "#4F4F4F"
    className?: string
    children?: React.ReactNode
    onClick?: React.MouseEventHandler<HTMLElement> | undefined
    disabled?: boolean
    fullWidth?: boolean
    isStrong?: boolean
    style?: React.CSSProperties
    textStyle?:
        "text-info"
        | "text-body-text-1"
        | "text-body-text-2"
        | "text-body-text-3"
        | "text-button"
        | "text-title-fix"
        | "text-title-3"
        | "text-title-4"
        | "text-title-2"
        | "text-title-1"
        | "text-info-height-0"
        | "text-size-14-h-0"
        | "text-title-header-v2d"
        | "text-v2d-info-text-semibold"
        | "text-v2d-highlight-semibold"
        | "text-title-v2d-body-text-2-semibold"
        | "text-title-v2d-highlight-regular"
        | "text-body-1"
        | "text-14-20"
        | "text-14-18"
        | "text-16-24"
        | "text-12-18"
        | "text-10-16"
        | "text-24-30"
        | "text-12-22"
        | "text-9-14"
        | "text-20-24"
}

export const CustomTypography: React.FC<_T_Props> = (props) => {
    let _stl = `${props.textStyle ?? "text-body-text-3"} ${props.isStrong ? "text-weight-strong" : ''} ${props.className ?? ""}`

    const _style: CSSProperties = {
        color: props.color ?? "#4F4F4F",
        ...props.style
    }

    const _build = () => {
        switch (props.type) {
            case "text":
                return (
                    <Typography.Text className={_stl} style={_style}>
                        {props.children}
                    </Typography.Text>
                )

            case "title":
                return (
                    <Typography.Title className={_stl} style={_style}>
                        {props.children}
                    </Typography.Title>
                )

            case "link":
                return (
                    <Typography.Link href={props.href} target={props.target} className={_stl} style={_style}>
                        {props.children}
                    </Typography.Link>
                )

            default:
                return (
                    <Typography.Text className={_stl} style={_style}>
                        {props.children}
                    </Typography.Text>
                )
        }
    }

    return _build()
}

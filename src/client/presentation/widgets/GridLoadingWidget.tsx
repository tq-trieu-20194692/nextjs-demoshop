import {MediaQuery, TMediaQueryOption} from "../../core/MediaQuery";
import React from "react";

type _T_Props = {
    children: React.ReactNode,
    gridMedia?: TMediaQueryOption,
    defaultLoad?: number
}

export const GridLoadingWidget: React.FC<_T_Props> = props => {
    const _number = (new MediaQuery(props.gridMedia)).getPointOnUp(props.defaultLoad)

    return (
        <>
            {
                new Array(_number).fill('OK').map((_, index: number) => (
                    <div key={index}>
                        {props.children}
                    </div>
                ))
            }
        </>
    )
}

GridLoadingWidget.defaultProps = {
    gridMedia: {
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 3,
        xxl: 4,
        xxxl: 4
    },
    defaultLoad: 4
}

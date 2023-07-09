import {FC} from "react";
import {Pagination, PaginationProps} from "antd";

interface _I_Props extends PaginationProps {
    defaultClass?: boolean
    containerClassName?: string
    isShow?: boolean
}

const CustomPagination: FC<_I_Props> = props => {
    return props.isShow
        ? (
            <div className={`${props.containerClassName ?? props.defaultClass ? "pt-6" : ''}`}>
                <Pagination
                    responsive={true}
                    showLessItems={false}
                    showSizeChanger={false}
                    showQuickJumper
                    {...props}
                />
            </div>
        )
        : null
}

CustomPagination.defaultProps = {
    defaultClass: true,
    isShow: true
}

export default CustomPagination

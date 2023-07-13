import {Drawer} from "antd";

export type T_FormProps = {
    isOpen: boolean
    onClose?: Function
}

export const ProductFormWidget = (props) => {

    const onCloseForm = () => {
        if (props.onClose) {
            props.onClose()
        }
    }

    return (
        <Drawer
            open={props.isOpen}
            onClose={onCloseForm}
        >



        </Drawer>
    )
}
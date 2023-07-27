import {Button, Drawer, Form, Input, message} from "antd";
import {useEffect, useState} from "react";
import "react-quill/dist/quill.snow.css";
import {E_SendingStatus} from "../../../const/Events";
import {ColorModel} from "../../../models/ColorModel";
import {ColorAction} from "../../../recoil/color/ColorAction";

export type T_FormProps = {
    isOpen: boolean
    onClose?: Function
    colorId?: string
    data?: ColorModel
    id?: string
}

type _T_FormFields = {
    name: string;
}

export const ColorFormWidget = (props: T_FormProps) => {
    const {
        vm,
        vmForm,
        onAddColor,
        onEditColor,
    } = ColorAction()

    console.log(props.data)

    const [form] = Form.useForm();

    useEffect(() => {
        console.log('MOUNT: Color Form Widget ')
        if(props.data) {
            form.setFieldsValue({
                color_id: props.data.colorId,
                name: props.data.name || "",
            });


        }
        else {
            form.resetFields();
        }
        return () => {
            console.log('UNMOUNT: Color Form Widget')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.colorId, props.data])

    useEffect(() => {
        if (vmForm.isLoading === E_SendingStatus.success) {
            form.resetFields();
            message.success("Color added successfully");
            onCloseForm()
        }
    }, [vmForm.isLoading])

    const onCloseForm = () => {
        if (props.onClose) {
            props.onClose()
        }
    }

    const [description, setDescription] = useState("");

    const onFinish = (values: _T_FormFields) => {
        console.log("onFinish:", values);

        if (props.colorId) {
            onAddColor(values)
        }
        else {
            onEditColor(props.id,values)
            message.success("Color change successfully");
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("onFinishFailed:", errorInfo);
        form.resetFields();
    }

    const onSubmit = () => {
        form.submit()
    }

    return (
        <Drawer
            open={props.isOpen}
            onClose={onCloseForm}
            width={500} // Tăng kích thước Drawer lên 800px
            extra={
                <Button onClick={onSubmit}>
                    Save
                </Button>
            }
        >
            {/*<div style={{ display: "flex", justifyContent: "space-evenly" }}>*/}
            <Form
                layout={"vertical"}
                name="basic"
                // labelCol={{ span: 5 }}
                // wrapperCol={{ span: 20 }}
                // style={{ maxWidth: 1000,width:600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
            >
                {
                    props.colorId && (
                        <Form.Item
                            label="Color_id"
                            name="color_id"

                        >
                            <Input disabled={true}/>
                        </Form.Item>
                    )
                }
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Color name!"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
                    {props.id === undefined ? (
                        <Button type="primary" htmlType="submit">
                            Add Color
                        </Button>
                    ) : (
                        <Button type="primary" htmlType="submit">
                            Edit Color
                        </Button>
                    )}

                    {/*{isSuccess && <span style={{ marginLeft: 10, color: "green" }}>Add success!</span>} /!* Success message *!/*/}
                </Form.Item>
            </Form>
            {/*</div>*/}


        </Drawer>
    )
}
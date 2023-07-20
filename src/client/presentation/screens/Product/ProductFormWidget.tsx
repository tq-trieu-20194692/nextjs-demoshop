import {Button, Drawer, Form, Input, message, Spin} from "antd";
import {useEffect, useState} from "react";
import { LoadingOutlined}  from "@ant-design/icons";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import {ProductAction} from "../../../recoil/product/ProductAction";
import {useNavigate} from "react-router-dom";
export type T_FormProps = {
    isOpen: boolean
    onClose?: Function
}
const NextQuill = dynamic(() => import("react-quill"), {
    ssr: false,
    loading: () => <Spin indicator={<LoadingOutlined spin />} />,
});
export const ProductFormWidget = (props) => {
    const {
        vm,
        onAddProduct,
    } = ProductAction()
    useEffect(() => {
        console.log('MOUNT: Product Form Widget ')

        return () => {
            console.log('UNMOUNT: Product Form Widget')
        }

    }, [])
    const onCloseForm = () => {
        if (props.onClose) {
            props.onClose()
        }
    }
    const [form] = Form.useForm();
    const [description, setDescription] = useState("");

    const onFinish = async (values: {
        name: string;
        price: number;
        sale?: string;
        description?: string;
        tag?: string;
    }) => {
        console.log("onFinish:", values);
        // Perform your submit logic here
        await onAddProduct(values)
        form.resetFields();
        setIsSuccess(true); // Set success status to true
        message.success("Product added successfully"); // Show success message
    };

    const handleQuillChange = (value: any) => {
        setDescription(value);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("onFinishFailed:", errorInfo);
        form.resetFields();
    };
    return (
        <Drawer
            open={props.isOpen}
            onClose={onCloseForm}
        >
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 20 }}
                    style={{ maxWidth: 800, width: 500 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: "Please input your Product name!" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: "Please input Price!" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Sale" name="sale">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Description" name="description">
                        <NextQuill value={description} onChange={handleQuillChange} />
                    </Form.Item>

                    <Form.Item label="Tag" name="tag">
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Edit Product
                        </Button>
                        {/*{isSuccess && <span style={{ marginLeft: 10, color: "green" }}>Add success!</span>} /!* Success message *!/*/}
                    </Form.Item>
                </Form>
            </div>


        </Drawer>
    )
}
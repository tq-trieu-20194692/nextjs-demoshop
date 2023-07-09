import { useEffect, useState } from "react";
import { Button, Form, Input, Spin, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate} from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import {ProductAction} from "../../../recoil/product/ProductAction";

const NextQuill = dynamic(() => import("react-quill"), {
    ssr: false,
    loading: () => <Spin indicator={<LoadingOutlined spin />} />,
});

const ProductForm = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [description, setDescription] = useState("");
    const [isSuccess, setIsSuccess] = useState(false); // State variable for success status
    const {
        vm,
        onAddProduct,
    } = ProductAction()
    useEffect(() => {
        console.log('MOUNT: Product Form Screen')

        return () => {
            console.log('UNMOUNT: Product Form Screen')
        }


    }, [])


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

    const onFinishFailed = (errorInfo: any) => {
        console.log("onFinishFailed:", errorInfo);
        form.resetFields();
    };

    const handleQuillChange = (value: any) => {
        setDescription(value);
    };

    return (
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
                        Add new Product
                    </Button>
                    {/*{isSuccess && <span style={{ marginLeft: 10, color: "green" }}>Add success!</span>} /!* Success message *!/*/}
                </Form.Item>
            </Form>
        </div>
    );
};

export default ProductForm;


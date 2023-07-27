import {Button, Drawer, Form, Input, message, Spin} from "antd";
import {useEffect, useState} from "react";
import {LoadingOutlined} from "@ant-design/icons";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import {ProductAction} from "../../../recoil/product/ProductAction";
import {E_SendingStatus} from "../../../const/Events";
import {ProductModel} from "../../../models/ProductModel";

export type T_FormProps = {
    isOpen: boolean
    onClose?: Function
    productId?: string
    data?: ProductModel
    id?: string
}

type _T_FormFields = {
    name: string;
    price: number;
    sale?: string;
    description?: string;
    tag?: string;
}

const NextQuill = dynamic(() => import("react-quill"), {
    ssr: false,
    loading: () => <Spin indicator={<LoadingOutlined spin />} />,
});
export const ProductFormWidget = (props: T_FormProps) => {
    const {
        vm,
        vmForm,
        onAddProduct,
        onEditProduct,
    } = ProductAction()

    console.log(props.data)

    const [form] = Form.useForm();

    useEffect(() => {
        console.log('MOUNT: Product Form Widget ')
        if(props.data) {
            // const foundProduct = vm.items.find((product) => product.productId === props.id);
            //     form.setFieldsValue({
            //         product_id: foundProduct?.productId,
            //         name: foundProduct?.name || "",
            //         price: foundProduct?.price,
            //         tag: foundProduct?.tag,
            //         description: foundProduct?.description,
            //     });


                form.setFieldsValue({
                    product_id: props.data.productId,
                    name: props.data.name || "",
                    price: props.data.price,
                    tag: props.data.tag,
                    description: props.data.description,
                });


        }
        else {
            form.resetFields();
        }
        return () => {
            console.log('UNMOUNT: Product Form Widget')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.productId, props.data])

    useEffect(() => {
        if (vmForm.isLoading === E_SendingStatus.success) {
            form.resetFields();
            message.success("Product added successfully");
            onCloseForm()
        }
    }, [vmForm.isLoading])

    const onCloseForm = () => {
        if (props.onClose) {
            props.onClose()
        }
    }

    const [description, setDescription] = useState("");

    // const onFinish = async (values: {
    //     name: string;
    //     price: number;
    //     sale?: string;
    //     description?: string;
    //     tag?: string;
    // }) => {
    //     console.log("onFinish:", values);
    //     // Perform your submit logic here
    //     if(props.id===undefined) {
    //         await onAddProduct(values)
    //         form.resetFields();
    //         message.success("Product added successfully");
    //     }
    //     else {
    //         await onEditProduct(props.id,values)
    //         message.success("Product change successfully");
    //     }
    // };
    const onFinish = (values: _T_FormFields) => {
        console.log("onFinish:", values);
        // Perform your submit logic here
        // if(props.productId ===undefined) {
        //      onAddProduct(values)
        //     form.resetFields();
        //     message.success("Product added successfully");
        // }
        // else {
        //      onEditProduct(props.id,values)
        //     message.success("Product change successfully");
        // }

        if (props.productId) {
            onAddProduct(values)
        }
        else {
            onEditProduct(props.id,values)
            message.success("Product change successfully");
        }
    };

    const handleQuillChange = (value: any) => {
        setDescription(value);
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
                        props.productId && (
                            <Form.Item
                                label="Product_id"
                                name="product_id"

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
                                message: "Please input your Product name!"
                            }
                            ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: "Please input Price!" }]}
                    >
                        <Input/>
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
                        {props.id === undefined ? (
                            <Button type="primary" htmlType="submit">
                                Add Product
                            </Button>
                        ) : (
                            <Button type="primary" htmlType="submit">
                                Edit Product
                            </Button>
                        )}

                        {/*{isSuccess && <span style={{ marginLeft: 10, color: "green" }}>Add success!</span>} /!* Success message *!/*/}
                    </Form.Item>
                </Form>
            {/*</div>*/}


        </Drawer>
    )
}
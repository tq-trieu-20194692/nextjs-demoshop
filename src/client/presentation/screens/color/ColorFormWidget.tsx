import {Button, Drawer, Form, Input, message} from "antd";
import {useEffect} from "react";
import "react-quill/dist/quill.snow.css";
import {ColorAction} from "../../../recoil/color/ColorAction";

export type T_FormProps = {
    isOpen: boolean
    onClose?: Function
    colorId?: string
}
// const NextQuill = dynamic(() => import("react-quill"), {
//     ssr: false,
//     loading: () => <Spin indicator={<LoadingOutlined spin />} />,
// });
export const ColorFormWidget = (props) => {
    const {
        vm,
        onAddColor,
        onEditColor,
    } = ColorAction()
    const [form] = Form.useForm();
    useEffect(() => {
        console.log('MOUNT: Color Form Widget ')
        if(props.id!==undefined)
        {
            const foundColor = vm.items.find((color) => color.colorId === props.id);
            form.setFieldsValue({
                color_id: foundColor?.colorId,
                name: foundColor?.name || "",
            });
        }
        else {
            form.resetFields();
        }
        return () => {
            console.log('UNMOUNT: Color Form Widget')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.id])
    const onCloseForm = () => {
        if (props.onClose) {
            props.onClose()
        }
    }

    // const [ setDescription] = useState("");

    const onFinish = async (values: {
        name: string;
    }) => {
        console.log("onFinish:", values);
        // Perform your submit logic here
        if(props.id===undefined) {
            await onAddColor(values)
            form.resetFields();
            message.success("Color added successfully");
        }
        else {
            await onEditColor(props.id,values)
            message.success("Color change successfully");
        }
    };

    // const handleQuillChange = (value: any) => {
    //     setDescription(value);
    // };

    const onFinishFailed = (errorInfo: any) => {
        console.log("onFinishFailed:", errorInfo);
        form.resetFields();
    };
    return (
        <Drawer
            open={props.isOpen}
            onClose={onCloseForm}
            width={500} // Tăng kích thước Drawer lên 800px

        >
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Form
                    name="basic"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 20 }}
                    style={{ maxWidth: 1000,width:600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    form={form}
                > {props.id !== undefined ? (
                    <Form.Item
                        label="color_id"
                        name="color_id"

                    >
                        <Input disabled={true}/>
                    </Form.Item>
                ) : null}
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: "Please input your Color name!" }]}
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
            </div>


        </Drawer>
    )
}
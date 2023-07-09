import {ProductAction} from "../../../recoil/product/ProductAction";
import React, {useEffect, useState} from "react";
import { ProductModel} from "../../../models/ProductModel";
import {Button, Space, Table, Modal, message, Form, Input, Row, Col} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate} from 'react-router-dom';
import {useParams} from "react-router";
const { Search } = Input;
const { confirm } = Modal;

const ProductSearch =()=>{
    let {page} = useParams()
    if(page==undefined)
    {
        page ='1'
    }
    const {key}= useParams()
    const navigate = useNavigate()
    const {
        vm,
        onDeleteProduct, // xóa dữ liệu
        onEditProduct,
        onSearchProduct
    } = ProductAction()

    const [ProductList,setProductList] = useState<ProductModel[]>(
        ()=>{
            try {
                const lsItem = localStorage.getItem('ProductSearch')
                if (lsItem) {
                    return JSON.parse(lsItem)
                }
            } catch (e) {
                console.error(e)
            }
            return []
        }
    )

    useEffect(() => {
        console.log('MOUNT: Product List Screen')
        // @ts-ignore
        onSearchProduct(key)
        navigate(`/productSearch/${page}/${key}`)
        return () => {
            console.log('UNMOUNT: Product List Screen')
        }


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key])
    useEffect(()=>{
        // @ts-ignore
        onSearchProduct(key)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[page])

    useEffect(() => {
        console.log('vm.isLoading', vm.isLoading)
    }, [vm.isLoading])

    useEffect(() => {
        console.log('vm.items', vm.items)
        setProductList(vm.items)
        localStorage.setItem('ProductSearch',JSON.stringify(vm.items))
    }, [vm.items,page])

    useEffect(() => {
        console.log('vm.error', vm.error)
    }, [vm.error])

    const initialPage = page ? parseInt(page, 10) : 1; // Giá trị ban đầu của currentPage từ page trong URL

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(initialPage); // Cập nhật giá trị ban đầu của currentPage từ page trong URL
    }, [initialPage]);

    const handleDelete = async (id:number) =>{
        confirm({
            title: 'Are you sure delete this Product?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                console.log(id);
                try {
                    await onDeleteProduct(id);
                    // @ts-ignore
                    await onSearchProduct(key);
                    message.success("Delete success");
                } catch (error) {
                    message.error("Delete failed");
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const paginationOptions = {
        pageSize: 10,
        current: currentPage,
        total:45,
        onChange: async (page:number) => {
            setCurrentPage(page);
            //do bất đồng bộ nên sẽ không cập nhâp ngay
            console.log(page)
            await navigate(`/productSearch/${page}/${key}`)
            // Thực hiện xử lý tương ứng với trang mới được chọn
        },
    };

    const [isModalOpenChange, setIsModalOpenChange] = useState(false);
    const [selectForm, setSelectForm] = useState<boolean>(false)
    const [formChange] = Form.useForm();
    const [selectedProduct, setSelectedProduct] = useState<ProductModel | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOk = () => {
        setIsModalOpen(false);
        setIsModalOpenChange(false)
    }
    const handleCancel = () => {
        setIsModalOpen(false);
        setIsModalOpenChange(false)
    }

    const ChangeForm = ()=>{
        const onFinish = (values: any) => {
            console.log('onFinish:', values)
            const id = parseInt(values.product_id)
            console.log(id)
            onEditProduct(id,values)
            // @ts-ignore
            onSearchProduct(key)
            message.success('Update success!').then();
        }

        const onFinishFailed = (errorInfo: any) => {
            console.log('onFinishFailed:', errorInfo)
            message.error('Update failed!').then();
        }
        return (
            <div style={{display: "flex", justifyContent: "space-evenly"}}>
                <Form
                    name="basic"
                    labelCol={{span: 5}}
                    wrapperCol={{span: 20}}
                    style={{maxWidth: 800, width: 500}}
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    form={formChange}
                >
                    <Form.Item
                        label="Product_id"
                        name="product_id"
                        rules={[{required: true, message: 'Please input your name Product!'}]}
                    >
                        <Input disabled={true}/>
                    </Form.Item>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{required: true, message: 'Please input your name Product!'}]}

                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{required: true, message: 'Please input Price!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Sale"
                        name="sale"
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                    >
                        <Input.TextArea rows={6}/>
                    </Form.Item>
                    <Form.Item
                        label="Tag"
                        name="tag"
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 11, span: 16}}>
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }

    const handleEdit =(id:string) => {
        setIsModalOpenChange(true)
        const newData = [...ProductList];
        newData.forEach((product) => {
            setSelectForm(true)
            if (product.data.product_id === id) {
                setSelectedProduct(product);
                formChange.setFieldsValue({
                    product_id: id,
                    name: product.data.name,
                    price: product.data.price,
                    address: product.data.address,
                    tags: product.data.tags,
                    description: product.data.description,
                });
            }
        });
    };

    const onSearch = (value: any) => {
        console.log(value)
        navigate(`/productSearch/${page}/${value}`)

    }
    const columns: ColumnsType<{ data: Record<string, any> }> = [
        {
            title: 'Product Name',
            dataIndex: ['data', 'name'],
            key: 'name',

        },
        {
            title: 'Price',
            dataIndex: ['data','price'],
            key: 'price',
        },
        {
            title: 'Tag',
            dataIndex: ['data','tag'],
            key: 'address',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button danger onClick={() => handleDelete(record.data.product_id)}>
                        Delete
                    </Button>
                    <Button type="primary" onClick={() => handleEdit(record.data.product_id)}>
                        Edit
                    </Button>
                </Space>
            ),
        },
    ];

    return(
        <>
            {
                selectForm && (
                    <Modal title="Update product" open={isModalOpenChange} onOk={handleOk} onCancel={handleCancel}>
                        <ChangeForm/>
                    </Modal>
                )
            }
            <Row>
                <Col span={16}>
                    <Search placeholder="search product" onSearch={onSearch} style={{ width: 200,marginBottom:'12px' }} />
                </Col>
                <Col span={4} style={{ display: 'flex',float:'left' }}>
                </Col>
            </Row>

            <Table
                pagination={paginationOptions}
                columns={columns} dataSource={ProductList.map((item, index) => ({ ...item, key: index.toString() }))} />

        </>
    )
}
export default ProductSearch


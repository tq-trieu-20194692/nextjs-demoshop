import {ProductAction} from "../../../recoil/product/ProductAction";
import React, {useEffect, useState} from "react";
import {ProductModel, T_ProductFQ} from "../../../models/ProductModel";
import {Col,Row,Button, Space, Table, Modal, message, Form, Input} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {useLocation, useNavigate} from 'react-router-dom';
import {useParams} from "react-router";
import {UrlQuery} from "../../../core/UrlQuery";
import {ProductFormWidget, T_FormProps} from "./ProductFormWidget";

const { Search } = Input;
const { confirm } = Modal;

const ProductListScreen =( )=>{
    const navigate = useNavigate()
    const location = useLocation()

    const {
        vm,
        onGetProducts,// lấy danh sách dữ liệu
        onDeleteProduct, // xóa dữ liệu
        onEditProduct
    } = ProductAction()

    const URL = new UrlQuery(location.search)

    const page = URL.getInt("page")
    const limit = URL.getInt("limit")
    const sort = URL.get("sort")
    const order = URL.get("order")

    const [queryParams, setQueryParams] = useState<T_ProductFQ>({
        page: page,
        limit: limit,
        sort: sort,
        order: order
    })

    const [formProps, setFormProps] = useState<T_FormProps>({
        isOpen: false
    })

    const [selectedProductName, setSelectedProductName] = useState<string | null>(null);
    const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
    // const { onGetProducts, onDeleteProduct, onEditProduct } = ProductAction();

    //
    const [ProductList,setProductList] = useState<ProductModel[]>(
        ()=>{
            try {
                const lsItem = localStorage.getItem('ProductList')
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
        console.log('MOUNT: Product List Screen');
        onGetProducts(new UrlQuery(queryParams).toObject())
        return () => {
            console.log('UNMOUNT: Product List Screen');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ selectedProductName, selectedPrice]);

    useEffect(() => {
        console.log('vm.isLoading', vm.isLoading)

    }, [vm.isLoading])

    useEffect(() => {
        console.log('vm.items', vm.items)
        setProductList(vm.items)
        localStorage.setItem('ProductList',JSON.stringify(vm.items))
    }, [vm.items])

    useEffect(() => {
        console.log('vm.error', vm.error)
    }, [vm.error])
    // const initialPage = 1 ? parseInt(1, 10) : 1; // Giá trị ban đầu của currentPage từ page trong URL
    //
    // const [currentPage, setCurrentPage] = useState(initialPage);
    //
    // useEffect(() => {
    //     setCurrentPage(initialPage); // Cập nhật giá trị ban đầu của currentPage từ page trong URL
    // }, [initialPage]);

    const onChangePage = (page: number) => {
        const urlQueryParams = new UrlQuery(queryParams)

        urlQueryParams.set("page", page)

        onGetProducts(urlQueryParams.toObject())
        setQueryParams(urlQueryParams.toObject())

        navigate({
            search: urlQueryParams.toString()
        },{
            replace: true
        })
    }

    // const handleDelete = async (id:any) =>{
    //     confirm({
    //         title: 'Are you sure delete this Product?',
    //         okText: 'Yes',
    //         okType: 'danger',
    //         cancelText: 'No',
    //         onOk: async () => {
    //             console.log(id);
    //             try {
    //                 await onDeleteProduct(id);
    //                 await onGetProducts();
    //                 message.success("Delete success");
    //             } catch (error) {
    //                 message.error("Delete failed");
    //             }
    //         },
    //         onCancel() {
    //             console.log('Cancel');
    //         },
    //     });
    // }

    // const paginationOptions = {
    //     pageSize: 10,
    //     current: currentPage,
    //     total:45,
    //     onChange: (page: number) => {
    //         setCurrentPage(page);
    //         navigate(/productList/${page}, { state: {  selectedProductName, selectedPrice } });
    //     },
    // };

    const [isModalOpenChange, setIsModalOpenChange] = useState(false)
    const [selectForm, setSelectForm] = useState<boolean>(false)
    const [formChange] = Form.useForm();
    const [selectedProduct, setSelectedProduct] = useState<ProductModel | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false)
    //
    const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
    const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

    //
    const handleOk = () => {
        setIsModalOpen(false);
        setIsModalOpenChange(false)
    }
    const handleCancel = () => {
        setIsModalOpen(false);
        setIsModalOpenChange(false)
    }

    // const ChangeForm = ()=>{
    //     const onFinish = (values: any) => {
    //         console.log('onFinish:', values)
    //         const id = parseInt(values.product_id)
    //         console.log(id)
    //         onEditProduct(id,values)
    //         onGetProducts()
    //         message.success('Update success!').then();
    //     }
    //
    //     const onFinishFailed = (errorInfo: any) => {
    //         console.log('onFinishFailed:', errorInfo)
    //         message.error('Update failed!').then();
    //     }
    //     return (
    //         <div style={{display: "flex", justifyContent: "space-evenly"}}>
    //             <Form
    //                 name="basic"
    //                 labelCol={{span: 5}}
    //                 wrapperCol={{span: 20}}
    //                 style={{maxWidth: 800, width: 500}}
    //                 initialValues={{remember: true}}
    //                 onFinish={onFinish}
    //                 onFinishFailed={onFinishFailed}
    //                 autoComplete="off"
    //                 form={formChange}
    //             >
    //                 <Form.Item
    //                     label="Product_id"
    //                     name="product_id"
    //                     rules={[{required: true, message: 'Please input your name Product!'}]}
    //                 >
    //                     <Input disabled={true}/>
    //                 </Form.Item>
    //                 <Form.Item
    //                     label="Name"
    //                     name="name"
    //                     rules={[{required: true, message: 'Please input your name Product!'}]}
    //
    //                 >
    //                     <Input/>
    //                 </Form.Item>
    //
    //                 <Form.Item
    //                     label="Price"
    //                     name="price"
    //                     rules={[{required: true, message: 'Please input Price!'}]}
    //                 >
    //                     <Input/>
    //                 </Form.Item>
    //
    //                 <Form.Item
    //                     label="Sale"
    //                     name="sale"
    //                 >
    //                     <Input/>
    //                 </Form.Item>
    //
    //                 <Form.Item
    //                     label="Description"
    //                     name="description"
    //                 >
    //                     <Input.TextArea rows={6}/>
    //                 </Form.Item>
    //                 <Form.Item
    //                     label="Tag"
    //                     name="tag"
    //                 >
    //                     <Input/>
    //                 </Form.Item>
    //
    //                 <Form.Item wrapperCol={{offset: 11, span: 16}}>
    //                     <Button
    //                         type="primary"
    //                         htmlType="submit"
    //                     >
    //                         Update
    //                     </Button>
    //                 </Form.Item>
    //             </Form>
    //         </div>
    //     )
    // }

    const onOpenForm = () => {
        setFormProps({
            isOpen: true
        })
    }

    const onCloseForm = () => {
        setFormProps({
            isOpen: false
        })
    }

    const handleEdit =(id:string) => {
        setIsModalOpenChange(true)
        const newData = [...ProductList];
        newData.forEach((product) => {
            setSelectForm(true)
            if (product.productId === id) {
                setSelectedProduct(product);
                formChange.setFieldsValue({
                    product_id: id,
                    name: product.name,
                    price: product.price,
                    address: product.address,
                    tag: product.tag,
                    description: product.description,
                });
            }
        });
    };

    const onSearch = (value: any) => {
        console.log(value)
        if(value===undefined)
        {
            message.error("ERROR").then()
        }
        else {
            setSelectedProductName(value);
            // navigate(/productSearch/${value})
        }
    }

    const columns: ColumnsType<ProductModel> = [
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
            // filters: ProductList.map((item) => ({ text: item.name, value: item.name })),
            // onFilter: (value, record) => record.data.name === value,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            // filters: ProductList.map((item) => ({ text: item.price, value: item.price })),
            // onFilter: (value, record) => {
            //     if (minPrice !== undefined && record.data.price < minPrice) {
            //         return false;
            //     }
            //     if (maxPrice !== undefined && record.data.price > maxPrice) {
            //         return false;
            //     }
            //     return true;
            // },
        },
        {
            title: 'Tag',
            dataIndex:'tag',
            key: 'address',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {/*<Button danger onClick={() => handleDelete(record.productId)}>*/}
                    {/*    Delete*/}
                    {/*</Button>*/}
                    {/*<Button type="primary" onClick={() => handleEdit(record.productId)}>*/}
                    <Button type="primary" onClick={onOpenForm}>
                        Edit
                    </Button>
                </Space>
            ),
        },
    ]


    return(
        <>
            {/*{*/}
            {/*    selectForm && (*/}
            {/*        <Modal title="Update product" open={isModalOpenChange} onOk={handleOk} onCancel={handleCancel}>*/}
            {/*            <ChangeForm/>*/}
            {/*        </Modal>*/}
            {/*    )*/}
            {/*}*/}
            <Row>
                <Col span={16}>
                    <Search placeholder="search product" onSearch={onSearch} style={{ width: 200,marginBottom:'12px' }} />
                </Col>

            </Row>
            <Table
                // pagination={paginationOptions}
                columns={columns}
                dataSource={ProductList.map((item, index) => ({ ...item, key: index.toString() }))}
            />

            <ProductFormWidget
                isOpen={formProps.isOpen}
                onClose={onCloseForm}
            />
        </>
    )
}
export default ProductListScreen
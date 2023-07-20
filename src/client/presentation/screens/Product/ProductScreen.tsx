import {ProductAction} from "../../../recoil/product/ProductAction";
import React, {useEffect, useState} from "react";
import {ProductModel, T_ProductFQ} from "../../../models/ProductModel";
import {Col,Row,Button, Space, Table, Modal, message, Form, Input} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {useLocation, useNavigate} from 'react-router-dom';
import {useParams} from "react-router";
import {UrlQuery} from "../../../core/UrlQuery";
import {ProductFormWidget, T_FormProps} from "./ProductFormWidget";

type _T_DataTable = {
    product_id : string
    name : string
    status : string
    tag : string
    description : string
    price : string
}

const { Search } = Input;
const { confirm } = Modal;

const ProductScreen =( )=>{
    const navigate = useNavigate()
    const location = useLocation()

    const {
        vm,
        onGetProducts,// lấy danh sách dữ liệu
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
        console.log('MOUNT: Product Screen');
        onGetProducts(new UrlQuery(queryParams).toObject())
        return () => {
            console.log('UNMOUNT: Product Screen');
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

    const columns: ColumnsType<_T_DataTable> = [
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
                    <Button type="primary" onClick={onOpenForm}>
                        Edit
                    </Button>
                </Space>
            ),
        },
    ]

    const dataSource:Array<_T_DataTable> = vm.items.map((item, index) => ({
        ...item,
        key: index.toString()
    }))


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
                dataSource={dataSource}
            />

            <ProductFormWidget
                isOpen={formProps.isOpen}
                onClose={onCloseForm}
            />
        </>
    )
}
export default ProductScreen
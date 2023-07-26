import {ProductAction} from "../../../recoil/product/ProductAction";
import React, {useEffect, useState} from "react";
import {ProductModel, T_ProductFQ} from "../../../models/ProductModel";
import {Button, Col, Input, message, Modal, Row, Space, Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {useLocation, useNavigate} from 'react-router-dom';
import {UrlQuery} from "../../../core/UrlQuery";
import {ProductFormWidget, T_FormProps} from "./ProductFormWidget";

type _T_DataTable = {
    product_id?: string; // Add 'product_id' property
    name?: string;
    status?: string; // Add 'status' property
    tag?: string;
    description?: string;
    price?: string;
};

const {Search} = Input;
const {confirm} = Modal;

const ProductScreen = () => {
    const navigate = useNavigate()
    const location = useLocation()
    // const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
    // const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState<number | undefined>(1)


    const {
        vm,
        onGetProducts,
        onDeleteProduct// lấy danh sách dữ liệu
    } = ProductAction()

    const URL = new UrlQuery(location.search)

    const page = URL.getInt("page")
    const limit = URL.getInt("limit")
    const sort = URL.get("sort")
    const order = URL.get("order")
    const search = URL.get("search")
    const [queryParams, setQueryParams] = useState<T_ProductFQ>({
        page: page,
        limit: limit,
        sort: sort,
        order: order,
        search: search,
    })

    const [formProps, setFormProps] = useState<T_FormProps>({
        isOpen: false
    })

    const [selectedProductName, setSelectedProductName] = useState<string | null>(null);
    const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

    //
    const [ProductList, setProductList] = useState<ProductModel[]>(
        () => {
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
        onGetProducts(new UrlQuery(queryParams).toObject());
        return () => {
            console.log('UNMOUNT: Product Screen');
        }
    }, []);

    useEffect(() => {
        console.log('vm.isLoading', vm.isLoading)

    }, [vm.isLoading])

    useEffect(() => {
        console.log('vm.items', vm.items)
        setProductList(vm.items)
        setCurrentPage(vm.query.page)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vm.items])

    useEffect(() => {
        console.log('vm.error', vm.error)
    }, [vm.error])

    //
    // const onChangePage = (page: number) => {
    //     const urlQueryParams = new UrlQuery(queryParams)
    //     urlQueryParams.set("page", page)
    //     onGetProducts(urlQueryParams.toObject())
    //     setQueryParams(urlQueryParams.toObject())
    //     navigate({
    //         search: urlQueryParams.toString()
    //     },{
    //         replace: true
    //     })
    // }
    const urlQueryParams = new UrlQuery(queryParams)
    const paginationOptions = {
        pageSize: vm.query.page_item,
        current: currentPage,
        total: vm.query.count,
        onChange: (page: number) => {
            urlQueryParams.set("page", page)
            onGetProducts(urlQueryParams.toObject())
            setQueryParams(urlQueryParams.toObject())
            navigate({
                search: urlQueryParams.toString()
            }, {
                replace: true
            })
        }
    };
    const onSearch = (value: any) => {
        console.log(value)
        if (value.length === 0) {
            //xóa tất cả set trong urlQueryParams
            urlQueryParams.delete("search"); // Xóa tham số 'order'
        } else {
            urlQueryParams.set("search", value)
            urlQueryParams.set("page", 1)

        }

        onGetProducts(urlQueryParams.toObject())
        setQueryParams(urlQueryParams.toObject())
        navigate({
            search: urlQueryParams.toString()
        }, {
            replace: true
        })

    }
    const onOpenForm = () => {
        setFormProps({
            isOpen: true
        })
    }
    const onOpenFormChange = (id: any) => {
        console.log(id)
        setFormProps({
            isOpen: true,
            productId: id
        })

    }
    const onCloseForm = () => {
        setFormProps({
            isOpen: false
        })
    }

    const handleDelete = async (id: any) => {
        confirm({
            title: 'Are you sure delete this Product?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                console.log(id);
                try {
                    await onDeleteProduct(id);

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
            dataIndex: 'tag',
            key: 'address',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => onOpenFormChange(record.product_id)}>
                        Edit
                    </Button>
                    <Button danger onClick={() => handleDelete(record.product_id)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ]

    const dataSource: Array<_T_DataTable> = vm.items.map((item, index) => ({
        product_id: item.productId, // Assign 'productId' to 'product_id'
        name: item.name,
        // Assuming 'status' property exists in 'ProductModel'
        tag: item.tag,
        description: item.description,
        price: item.price,
        key: index.toString(),
    }))


    return (
        <>
            {/*{*/}
            {/*    selectForm && (*/}
            {/*        <Modal title="Update product" open={isModalOpenChange} onOk={handleOk} onCancel={handleCancel}>*/}
            {/*            <ChangeForm/>*/}
            {/*        </Modal>*/}
            {/*    )*/}
            {/*}*/}
            <Row>
                <Col span={20}>
                    <Search placeholder="search product" onSearch={onSearch} style={{width: 200, marginBottom: '12px'}}/>
                </Col>
                <Col span={3}>
                    <Button onClick={() => onOpenForm()}>Add Product</Button>
                </Col>
            </Row>
            <Table
                pagination={paginationOptions}
                columns={columns}
                dataSource={dataSource}
            />

            <ProductFormWidget
                isOpen={formProps.isOpen}
                id={formProps.productId}
                onClose={onCloseForm}

            />
        </>
    )
}
export default ProductScreen
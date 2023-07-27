import {ColorAction} from "../../../recoil/color/ColorAction";
import React, {useEffect, useState} from "react";
import {ColorModel, T_ColorFQ} from "../../../models/ColorModel";
import {Col,Row, Button, Space, Table, Modal, message, Input, AutoComplete} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useLocation, useNavigate} from 'react-router-dom';
import {UrlQuery} from "../../../core/UrlQuery";
import {ColorFormWidget, T_FormProps} from "./ColorFormWidget";
import {PlusOutlined} from "@ant-design/icons"

type _T_DataTable = {
    color_id?: string; // Add 'color_id' property
    name?: string;
};
const {Search} = Input;
const {confirm} = Modal;
const ColorScreen = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [currentPage, setCurrentPage] = useState<number | undefined>(1)
    const {
        vm,
        onGetColors,// lấy danh sách dữ liệu
        onDeleteColor, // xóa dữ liệu
    } = ColorAction()
    //
    const URL = new UrlQuery(location.search)

    const page = URL.getInt("page")
    const limit = URL.getInt("limit")
    const sort = URL.get("sort")
    const order = URL.get("order")
    const search = URL.get("search")
    const [queryParams, setQueryParams] = useState<T_ColorFQ>({
        page: page,
        limit: limit,
        sort: sort,
        order: order,
        search: search,
    })

    const [formProps, setFormProps] = useState<T_FormProps>({
        isOpen: false
    })

    const [selectedColorName, setSelectedColorName] = useState<string | null>(null);
    //
    const [ColorList, setColorList] = useState<ColorModel[]>(
        () => {
            try {
                const lsItem = localStorage.getItem('ColorList')
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
        console.log('MOUNT: Color Screen');
        onGetColors(new UrlQuery(queryParams).toObject());
        return () => {
            console.log('UNMOUNT: Color Screen');
        }
    }, []);

    useEffect(() => {
        console.log('vm.isLoading', vm.isLoading)

    }, [vm.isLoading])

    useEffect(() => {
        console.log('vm.items', vm.items)
        setColorList(vm.items)
        setCurrentPage(vm.query.page)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vm.items])

    useEffect(() => {
        console.log('vm.error', vm.error)
    }, [vm.error])


    const urlQueryParams = new UrlQuery(queryParams)
    const paginationOptions = {
        pageSize: vm.query.page_item,
        current: currentPage,
        total: vm.query.count,
        onChange: (page: number) => {
            urlQueryParams.set("page", page)
            onGetColors(urlQueryParams.toObject())
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

        onGetColors(urlQueryParams.toObject())
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
            colorId: id
        })

    }
    const onCloseForm = () => {
        setFormProps({
            isOpen: false
        })
    }

    const handleDelete = async (id: any) => {
        confirm({
            title: 'Are you sure delete this Color?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                console.log(id);
                try {
                    await onDeleteColor(id);

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
            title: 'Color Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => onOpenFormChange(record.color_id)}>
                        Edit
                    </Button>
                    <Button danger onClick={() => handleDelete(record.color_id)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ]

    const dataSource: Array<_T_DataTable> = vm.items.map((item, index) => ({
        color_id: item.colorId, // Assign 'colorId' to 'color_id'
        name: item.name,
        key: index.toString(),
    }))


    return (
        <>
            <Row>
                <Col span={20}>
                    <Search placeholder="search color" onSearch={onSearch} style={{width: 200, marginBottom: '12px'}}/>
                </Col>
                <Col span={3}>
                    <Button  onClick={() => onOpenForm()}><PlusOutlined />Add Color</Button>
                </Col>
            </Row>
            <Table
                pagination={paginationOptions}
                columns={columns}
                dataSource={dataSource}
            />

            <ColorFormWidget
                isOpen={formProps.isOpen}
                id={formProps.colorId}
                onClose={onCloseForm}

            />
        </>
    )
}
export default ColorScreen




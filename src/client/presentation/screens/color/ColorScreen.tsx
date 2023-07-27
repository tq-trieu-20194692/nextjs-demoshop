import {ColorAction} from "../../../recoil/color/ColorAction";
import React, {useEffect, useState} from "react";
import {ColorModel, T_ColorFQ} from "../../../models/ColorModel";
import {Col,Row, Button, Space, Table, Modal, message, Input, AutoComplete} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useLocation, useNavigate} from 'react-router-dom';
import {UrlQuery} from "../../../core/UrlQuery";
import {ColorFormWidget, T_FormProps} from "./ColorFormWidget";
import {FunnelPlotOutlined, PlusOutlined} from "@ant-design/icons"

type _T_DataTable = {
    color_id?: string; // Add 'color_id' property
    name?: string;
    model: ColorModel
};

const {Search} = Input;
const {confirm} = Modal;

const ColorScreen = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [currentPage, setCurrentPage] = useState<number | undefined>(1)


    const {
        vm,
        dispatchLoadItems,
        onDeleteColor// lấy danh sách dữ liệu
    } = ColorAction()

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

    //
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    const handleFilterApply = () => {
        //....

        setIsFilterModalVisible(false); // Đóng modal sau khi bấm nút "Apply"
    };
    const handleFilterCancel = () => {
        setIsFilterModalVisible(false); // Đóng modal khi bấm nút "Cancel"
    };
    //
    const [selectedColorName, setSelectedColorName] = useState<string | null>(null);
    const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

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
        // onGetColors(new UrlQuery(queryParams).toObject());
        dispatchLoadItems(new UrlQuery(queryParams).toObject())

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
    // const paginationOptions = {
    //     pageSize: vm.query.page_item,
    //     current: currentPage,
    //     total: vm.query.count,
    //     onChange: (page: number) => {
    //         urlQueryParams.set("page", page)
    //         onGetColors(urlQueryParams.toObject())
    //         setQueryParams(urlQueryParams.toObject())
    //         navigate({
    //             search: urlQueryParams.toString()
    //         }, {
    //             replace: true
    //         })
    //     }
    // }
    const paginationOptions = {
        pageSize: vm.oMeta?.perPage,
        current: vm.oMeta?.currentPage,
        total: vm.oMeta?.totalCount,
        onChange: (page: number) => {
            urlQueryParams.set("page", page)
            // onGetColors(urlQueryParams.toObject())
            dispatchLoadItems(urlQueryParams.toObject())
            setQueryParams(urlQueryParams.toObject())
            navigate({
                search: urlQueryParams.toString()
            }, {
                replace: true
            })
        }
    }
    const onSearch = (value: string) => {
        console.log(value)
        if (value.length > 0) {
            urlQueryParams.set("search", "name")
            urlQueryParams.set("key", value)
        }
        else {
            urlQueryParams.delete("search")
            urlQueryParams.delete("key")
        }

        urlQueryParams.delete("page")

        // onGetColors(urlQueryParams.toObject())
        dispatchLoadItems(urlQueryParams.toObject())
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
    const onOpenFormChange = (data: ColorModel) => {
        setFormProps({
            isOpen: true,
            colorId: data.colorId,
            data: data
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
            // filters: ColorList.map((item) => ({ text: item.name, value: item.name })),
            // onFilter: (value, record) => record.data.name === value,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => onOpenFormChange(record.model)}>
                        Edit
                    </Button>
                    <Button danger onClick={() => handleDelete(record.color_id)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ]

    const dataSource: _T_DataTable[] = vm.items.map((item, index) => ({
        color_id: item.colorId, // Assign 'colorId' to 'color_id'
        name: item.name,
        // Assuming 'status' property exists in 'ColorModel'
        tag: item.tag,
        description: item.description,
        price: item.price,
        key: index.toString(),
        model: item
    }))


    return (
        <>
            {/*{*/}
            {/*    selectForm && (*/}
            {/*        <Modal title="Update color" open={isModalOpenChange} onOk={handleOk} onCancel={handleCancel}>*/}
            {/*            <ChangeForm/>*/}
            {/*        </Modal>*/}
            {/*    )*/}
            {/*}*/}
            <Row>
                <Col span={20}>
                    <AutoComplete placeholder="search color" onSearch={onSearch} style={{width: 200, marginBottom: '12px'}}/>
                </Col>
                <Col span={3} style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '16px' }}>
                    <Button onClick={() => setIsFilterModalVisible(true)} style={{ marginRight: '8px' }}><FunnelPlotOutlined /> </Button>
                    <Button onClick={() => onOpenForm()}><PlusOutlined /> Add Color</Button>
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
                data={formProps.data}
            />
            <Modal
                title="Filter Colors"
                open={isFilterModalVisible}
                onOk={handleFilterApply}
                onCancel={handleFilterCancel}
            >
            </Modal>
        </>
    )
}
export default ColorScreen




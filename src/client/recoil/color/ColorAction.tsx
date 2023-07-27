import {useState} from "react";
import {initialFormState, ColorState, T_FormState, T_ColorState} from "./ColorState";
import {E_SendingStatus} from "../../const/Events";
import {AxiosClientTest} from "../../repositories/AxiosClientTest";
import {App} from "../../const/App";
import {ColorModel, T_ColorFQ} from "../../models/ColorModel";
import {useRecoilState} from "recoil";
import {ApiService} from "../../repositories/ApiService";
import {useInjection} from "inversify-react";
import {PaginateMetaModel} from "../../models/ApiResModel"


export const ColorAction = () => {
    const [state, setState] = useRecoilState<T_ColorState>(ColorState)
    const [formState, setFormState] = useState<T_FormState>(initialFormState)
    const apiService = useInjection(ApiService)
    const dispatchLoadItems = (query?: T_ColorFQ) => {
        setState({
            ...state,
            isLoading: E_SendingStatus.loading
        })

        const _query = {
            ...query,
            route: 'color/color_list'
        }

        apiService
            .color.getColor(_query)
            .then(r => {
                if (r.success) {
                    let merge = {...state}
                    const page = query?.page ?? 1

                    if (r.meta instanceof PaginateMetaModel) {
                        merge = {
                            ...merge,
                            oMeta: r.meta
                        }

                        const limit = r.meta.perPage

                        if (limit && limit !== merge.query) {
                            merge.query = {
                                ...merge.query,
                                limit: limit
                            }
                        }
                    }

                    if (r.items) {
                        merge = {
                            ...merge,
                            items: r.items.map(item => new ColorModel(item))
                        }
                    }

                    if (page !== merge.query.page) {
                        merge.query = {
                            ...merge.query,
                            page: page
                        }
                    }

                    setState({
                        ...merge,
                        isLoading: E_SendingStatus.success
                    })
                }
                else {
                    setState({
                        ...state,
                        isLoading: E_SendingStatus.error,
                        error: r.error
                    })
                }
            })
            .catch(err => console.log(err))
    }

    const onGetColors = (query: T_ColorFQ) => {
        console.log(query)
        setState({
            ...state,
            isLoading: E_SendingStatus.loading
        })
        if (query.search !== undefined) {
            AxiosClientTest
                .get(`http://222.252.10.203:30100/admin.php?route=color/color_list&search=name,price&key=${query.search}&page=${query.page}`)
                .then(response => {
                    console.log(response)
                    setState({
                        ...state,
                        isLoading: E_SendingStatus.success,
                        items: response.items.map(item => new ColorModel(item)),
                        query:{
                            page: response.meta_data.current_page,
                            count: response.meta_data.total_count,
                            page_item: response.meta_data.per_page
                        }

                    })
                })
        } else {
            AxiosClientTest
                .get(`http://222.252.10.203:30100/admin.php?route=color/color_list&page=${query.page}`)
                .then(response => {
                    console.log(response)
                    setState({
                        ...state,
                        isLoading: E_SendingStatus.success,
                        items: response.items.map(item => new ColorModel(item)),
                        query:{
                            page: response.meta_data.current_page,
                            count: response.meta_data.total_count,
                            page_item: response.meta_data.per_page
                        }
                    })
                })
        }
    }

    const onAddColor = (data: Record<string, any>) => {
        console.log(data)
        setFormState({
            ...formState,
            isLoading: E_SendingStatus.loading
        })
        AxiosClientTest
            .post(`${App.ApiUrlTest}/admin.php?route=color/color_form`, data)
            .then(r => {
                if (r.success) {
                    console.log(r)

                    setState({
                        ...state,
                        items: [new ColorModel(r.item), ...state.items]
                    })
                    setFormState({
                        ...formState,
                        isLoading: E_SendingStatus.success
                    })
                } else {
                    setFormState({
                        ...formState,
                        isLoading: E_SendingStatus.error,
                        error: r.error
                    })
                }
            })
            .catch(e => {
                console.log(e)

            })
    }

    const onEditColor = (id: string, data: Record<string, any>) => {
        console.log(data)
        AxiosClientTest
            .post(`${App.ApiUrlTest}/admin.php?route=color/color_form`, data)
            .then(r => {
                if (r.success) {
                    console.log(r)
                    setState({
                        ...state,
                        items: state.items.map(item => {
                            if (item.colorId === id) {
                                return item.copyFrom(r.item); // Cập nhật dữ liệu của sản phẩm tại vị trí tương ứng trong mảng
                            }
                            return item;
                        })
                    })
                    setFormState({
                        ...formState,
                        isLoading: E_SendingStatus.success
                    })
                } else {
                    setFormState({
                        ...formState,
                        isLoading: E_SendingStatus.error,
                        error: r.error
                    })
                }
            })
            .catch(e => {
                console.log(e)

            })
    }

    const onDeleteColor = (id: string) => {
        AxiosClientTest
            .get(`${App.ApiUrlTest}/admin.php?route=color/color_delete&selected[]=${id}`)
            .then(r => {
                if (r.success) {
                    console.log(r)
                    setState({
                        ...state,
                        items: state.items.filter((item: ColorModel) => item.colorId !== id)
                    })
                } else {
                    console.log(r.error)
                }
            })
            .catch(e => {
                console.log(e)
            })
    }
    const onSearchColor = (data: Record<string, any>) => {
        const query = {
            route: "color/color_list",
            search: "name",
            key: data
        }
        // AxiosClient.get(`${App.ApiUrlTest}/admin.php?route=color/color_list&search=name&key=${data}`)
        AxiosClientTest.get(`${App.ApiUrlTest}/admin.php`, query)
            .then(r => {
                if (r.success) {
                    if (r.items) {
                        setState({
                            ...state,
                            isLoading: E_SendingStatus.success,
                            //lưu dữ liệu vào state.items là 1 mảng là các phần từ có kiểu ColorModel
                            items: r.items.map((v: Record<string, any>) => new ColorModel(v))
                        })
                    }

                } else {
                    setState({
                        ...state,
                        isLoading: E_SendingStatus.error,
                        error: r.error
                    })
                }
            })
            .catch(e => {
                console.error(e)
            })
    }

    return {
        vm: state,
        vmForm: formState,
        onGetColors,
        onAddColor,
        onEditColor,
        onSearchColor,
        onDeleteColor,
        dispatchLoadItems
    }
}
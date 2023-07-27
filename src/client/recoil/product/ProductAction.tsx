import {useState} from "react";
import {initialFormState, ProductState, T_FormState, T_ProductState} from "./ProductState";
import {AxiosClientTest} from "../../repositories/AxiosClientTest";
import {App} from "../../const/App";
import {ProductModel, T_ProductFQ} from "../../models/ProductModel";
import {E_SendingStatus} from "../../const/Events";
import {useRecoilState} from "recoil";
import {ApiService} from "../../repositories/ApiService";
import {useInjection} from "inversify-react";
import {PaginateMetaModel} from "../../models/ApiResModel"

export const ProductAction = () => {
    const [state, setState] = useRecoilState<T_ProductState>(ProductState)
    const [formState, setFormState] = useState<T_FormState>(initialFormState)
    const apiService = useInjection(ApiService)
    const dispatchLoadItems = (query?: T_ProductFQ) => {
        setState({
            ...state,
            isLoading: E_SendingStatus.loading
        })

        const _query = {
            ...query,
            route: 'product/product_list'
        }

        apiService
            .product.getProduct(_query)
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
                            items: r.items.map(item => new ProductModel(item))
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

    const onGetProducts = (query: T_ProductFQ) => {
        console.log(query)
        setState({
            ...state,
            isLoading: E_SendingStatus.loading
        })
        if (query.search !== undefined) {
            AxiosClientTest
                .get(`http://222.252.10.203:30100/admin.php?route=product/product_list&search=name,price&key=${query.search}&page=${query.page}`)
                .then(response => {
                    console.log(response)
                    setState({
                        ...state,
                        isLoading: E_SendingStatus.success,
                        items: response.items.map(item => new ProductModel(item)),
                        query:{
                            page: response.meta_data.current_page,
                            count: response.meta_data.total_count,
                            page_item: response.meta_data.per_page
                        }

                    })
                })
        } else {
            AxiosClientTest
                .get(`http://222.252.10.203:30100/admin.php?route=product/product_list&page=${query.page}`)
                .then(response => {
                    console.log(response)
                    setState({
                        ...state,
                        isLoading: E_SendingStatus.success,
                        items: response.items.map(item => new ProductModel(item)),
                        query:{
                            page: response.meta_data.current_page,
                            count: response.meta_data.total_count,
                            page_item: response.meta_data.per_page
                        }
                    })
                })
        }
    }

    const onAddProduct = (data: Record<string, any>) => {
        console.log(data)
        setFormState({
            ...formState,
            isLoading: E_SendingStatus.loading
        })
        AxiosClientTest
            .post(`${App.ApiUrlTest}/admin.php?route=product/product_form`, data)
            .then(r => {
                if (r.success) {
                    console.log(r)

                    setState({
                        ...state,
                        items: [new ProductModel(r.item), ...state.items]
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

    const onEditProduct = (id: string, data: Record<string, any>) => {
        console.log(data)
        AxiosClientTest
            .post(`${App.ApiUrlTest}/admin.php?route=product/product_form`, data)
            .then(r => {
                if (r.success) {
                    console.log(r)
                    setState({
                        ...state,
                        items: state.items.map(item => {
                            if (item.productId === id) {
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

    const onDeleteProduct = (id: string) => {
        AxiosClientTest
            .get(`${App.ApiUrlTest}/admin.php?route=product/product_delete&selected[]=${id}`)
            .then(r => {
                if (r.success) {
                    console.log(r)
                    setState({
                        ...state,
                        items: state.items.filter((item: ProductModel) => item.productId !== id)
                    })
                } else {
                    console.log(r.error)
                }
            })
            .catch(e => {
                console.log(e)
            })
    }
    const onSearchProduct = (data: Record<string, any>) => {
        const query = {
            route: "product/product_list",
            search: "name",
            key: data
        }
        // AxiosClient.get(`${App.ApiUrlTest}/admin.php?route=product/product_list&search=name&key=${data}`)
        AxiosClientTest.get(`${App.ApiUrlTest}/admin.php`, query)
            .then(r => {
                if (r.success) {
                    if (r.items) {
                        setState({
                            ...state,
                            isLoading: E_SendingStatus.success,
                            //lưu dữ liệu vào state.items là 1 mảng là các phần từ có kiểu ProductModel
                            items: r.items.map((v: Record<string, any>) => new ProductModel(v))
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
        onGetProducts,
        onAddProduct,
        onEditProduct,
        onSearchProduct,
        onDeleteProduct,
        dispatchLoadItems
    }
}
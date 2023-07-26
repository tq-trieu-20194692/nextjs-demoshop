import {useState} from "react";
import {initialFormState, ProductState, T_FormState, T_ProductState} from "./ProductState";
import {AxiosClient} from "../../repositories/AxiosClientTest";
import {App} from "../../const/App";
import {ProductModel, T_ProductFQ} from "../../models/ProductModel";
import {E_SendingStatus} from "../../const/Events";
import {useRecoilState} from "recoil";

export const ProductAction = () => {
    const [state, setState] = useRecoilState<T_ProductState>(ProductState)
    const [formState, setFormState] = useState<T_FormState>(initialFormState)

    const onGetProducts = (query: T_ProductFQ) => {
        console.log(query)
        setState({
            ...state,
            isLoading: E_SendingStatus.loading
        })
        if (query.search !== undefined) {
            AxiosClient
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
            AxiosClient
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
        AxiosClient
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
                    console.log(r.error)
                    setFormState({
                        ...formState,
                        isLoading: E_SendingStatus.error
                    })
                }
                console.log(state)
            })
            .catch(e => {
                console.log(e)

            })
    }

    const onEditProduct = (id: string, data: Record<string, any>) => {
        console.log(data)
        AxiosClient
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
                } else {
                    console.log(r.error)
                }
            })
            .catch(e => {
                console.log(e)

            })
    }

    const onDeleteProduct = (id: string) => {
        AxiosClient
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
        AxiosClient.get(`${App.ApiUrlTest}/admin.php?route=product/product_list&search=name&key=${data}`)
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

                } else if (r.error) {
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
        onGetProducts,
        onAddProduct,
        onEditProduct,
        onSearchProduct,
        onDeleteProduct
    }
}
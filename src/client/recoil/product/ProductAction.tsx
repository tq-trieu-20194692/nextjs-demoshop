import {useState} from "react";
import {initialFormState, ProductState, T_FormState, T_ProductState} from "../../../client/recoil/product/ProductState";
import {AxiosClient} from "../../../client/repositories/AxiosClientTest";
import {App} from "../../../client/const/App";
import {ProductModel, T_ProductFQ} from "../../../client/models/ProductModel";
import {useParams} from "react-router";
import {E_SendingStatus} from "../../../client/const/Events";
import {useRecoilState} from "recoil";
import axios from "axios";
import {UserModel} from "../../models/UserModel";
import {StoreConfig} from "../../config/StoreConfig";
import {useSessionContext} from "../../presentation/contexts/SessionContext";

export const ProductAction = () => {
    const [session, setSession] = useSessionContext()
    const [state, setState] = useRecoilState<T_ProductState>(ProductState)
    const [formState, setFormState] = useState<T_FormState>(initialFormState)

    const  onGetProducts =   (query: T_ProductFQ) => {
        setState({
            ...state,
            isLoading: E_SendingStatus.loading
        })

        AxiosClient
            .get("http://222.252.10.203:30100/admin.php?route=product/product_list")
            .then(response => {
                const items = new ProductModel(response.data)
                console.log(response)
                setState({
                    ...state,
                    isLoading: E_SendingStatus.success,
                    items: response.items.map(item => new ProductModel(item))
                })
            })
    }

    const onAddProduct = (data: Record<string, any>) => {
        const dataAdd = new ProductModel(data)
        console.log(dataAdd)
        setFormState({
            ...formState,
            isLoading: E_SendingStatus.loading
        })

        AxiosClient
            .post(`${App.ApiUrlTest}/admin.php?route=product/product_form`)
            .then(r=>{
                if (r.success){
                    console.log(r)
                    setState({
                        ...state,
                        items: [new ProductModel(r.data), ...state.items]
                    })

                    setFormState({
                        ...formState,
                        isLoading: E_SendingStatus.success
                    })
                }
                else {
                    console.log(r.error)

                    setFormState({
                        ...formState,
                        isLoading: E_SendingStatus.error
                    })
                }
            })
            .catch(e => {
                console.log(e)

            })
    }

    const onEditProduct = (id: number, data: Record<string, any>) => {
        const dataEdit = new ProductModel(data)
        AxiosClient
            .post(`${App.ApiUrlTest}/admin.php?route=product/product_form`,data)
            .then(r=>{
                if (r.success){
                    console.log(r)
                    setState({
                        ...state,
                        items: state.items.map(item => {
                            if (item.productId === id) {
                                return item.copyFrom(r.data)
                            }
                            return item
                        })
                    })
                }
                else {
                    console.log(r.error)
                }
            })
            .catch(e => {
                console.log(e)

            })
    }

    const onDeleteProduct = (id:number) => {
        AxiosClient
            .get(`${App.ApiUrlTest}/admin.php?route=product/product_delete&selected[]=${id}`)
            .then(r=>{
                if (r.success){
                    console.log(r)
                }
                else {
                    console.log(r.error)
                }
            })
            .catch(e => {
                console.log(e)
            })
    }
    const  onSearchProduct = (data:Record<string, any>)=>
    {
        AxiosClient.get(`${App.ApiUrlTest}/admin.php?route=product/product_list&search=name&key=${data}`)
            .then( r=>{
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
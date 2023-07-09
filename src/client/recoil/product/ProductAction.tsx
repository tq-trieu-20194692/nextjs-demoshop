import {useState} from "react";
import {initialState, T_ProductState} from "../../../client/recoil/product/ProductState";
import {AxiosClient} from "../../../client/repositories/AxiosClientTest";
import {App} from "../../../client/const/App";
import {ProductModel} from "../../../client/models/ProductModel";
import {useParams} from "react-router";
import {E_SendingStatus} from "../../../client/const/Events";
export const ProductAction = () => {

    const [state, setState] = useState<T_ProductState>(initialState)
    let {page} = useParams()
    if(page==undefined)
    {
        page ='1'
    }
    const  onGetProducts =   () => {
        setState({
            ...state,
            isLoading: E_SendingStatus.loading
        })
        AxiosClient
            .get(`${App.ApiUrlTest}/admin.php?route=product/product_list&page=${page}`)
            .then(r => {
                // console.log('r', r)
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

    const onAddProduct = (data: Record<string, any>) => {
        const dataAdd = new ProductModel(data)
        console.log(dataAdd)
        AxiosClient
            .post(`${App.ApiUrl}/admin.php?route=product/product_form`,dataAdd.data)
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

    const onEditProduct = (id: number, data: Record<string, any>) => {
        const dataEdit = new ProductModel(data)
        AxiosClient
            .post(`${App.ApiUrlTest}/admin.php?route=product/product_form`,data)
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
        AxiosClient.get(`${App.ApiUrlTest}/admin.php?route=product/product_list&page=${page}&search=name&key=${data}`)
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
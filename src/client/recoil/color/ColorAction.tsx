import {useState} from "react";
import {initialFormState, ColorState, T_FormState, T_ColorState} from "./ColorState";
import {E_SendingStatus} from "../../const/Events";
import {AxiosClientTest} from "../../repositories/AxiosClientTest";
import {App} from "../../const/App";
import {ColorModel, T_ColorFQ} from "../../models/ColorModel";
import {useRecoilState} from "recoil";

export const ColorAction = () => {

    const [state, setState] = useRecoilState<T_ColorState>(ColorState)
    const [formState, setFormState] = useState<T_FormState>(initialFormState)

    const onGetColors = (query: T_ColorFQ) => {
        console.log(query)
        setState({
            ...state,
            isLoading: E_SendingStatus.loading
        })
        if (query.search !== undefined) {
            AxiosClientTest
                .get(`http://222.252.10.203:30100/admin.php?route=product/color_list&search=name,price&key=${query.search}&page=${query.page}`)
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
                .get(`http://222.252.10.203:30100/admin.php?route=product/color_list&page=${query.page}`)
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
        const dataAdd = new ColorModel(data)
        console.log(dataAdd)
        AxiosClientTest
            .post(`${App.ApiUrl}/admin.php?route=product/color_form`,data)
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
    const onEditColor = (id: number, data: Record<string, any>) => {
        const dataEdit = new ColorModel(data)
        AxiosClientTest
            .post(`${App.ApiUrl}/admin.php?route=product/color_form`,data)
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

    const onDeleteColor = (id:number) => {
        AxiosClientTest
            .get(`${App.ApiUrl}/admin.php?route=product/_delete&selected[]=${id}`)
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
    const  onSearchColor = (data:Record<string, any>)=>
    {
        AxiosClientTest.get(`${App.ApiUrl}/admin.php?route=product/color_list&&search=name&key=${data}`)
            .then( r=>{
                if (r.success) {
                    if (r.items) {
                        setState({
                            ...state,
                            isLoading: E_SendingStatus.success,
                            //lưu dữ liệu vào state.items là 1 mảng là các phần từ có kiểu ColorModel
                            items: r.items.map((v: Record<string, any>) => new ColorModel(v))
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
        onGetColors,
        onAddColor,
        onEditColor,
        onSearchColor,
        onDeleteColor
    }
}
import axios, {AxiosRequestConfig} from "axios";
import {StoreConfig} from "../config/StoreConfig";
import {ApiResModel} from "../models/ApiResModel";
import {App} from "../const/App";
import {Color} from "../const/Color";
import moment from "moment/moment";

export class AxiosClientTest {
    protected static getConfig(): AxiosRequestConfig {
        const config: AxiosRequestConfig = {
            headers: {
                "Content-Type": 'multipart/form-data',
                Accept: 'application/json'
            },
            withCredentials: false
        }

        const storeConfig = StoreConfig.getInstance()

        if (storeConfig.token) {
            config.headers!.Authorization = `Bearer ${storeConfig.token}`
        }

        return config
    }

    public static get(
        url: string,
        query?: any
    ) {
        const config = this.getConfig()
        const q = AxiosClientTest.convertDataGet(query)

        console.log('%c<-GET--------------------------------------------', Color.ConsoleInfo);
        console.log(`QUERY:`, query);
        console.log(`${App.ApiUrlTest}/${url}?${q}`)

        return axios
            .get(`${App.ApiUrlTest}/${url}?${q}`, AxiosClientTest.getConfig())
            .then(r => {

                console.log('RES:', r.data);
                console.log('%c--END------------------------------------------->', Color.ConsoleInfo);
                return new ApiResModel(r.data)
            })
    }

    public static post(
        url: string,
        data?: Record<string, any>
    ) {
        const config = this.getConfig()

        return axios
            .post(url, data, config)
            .then(r => {

                return new ApiResModel(r.data)
            })
    }

    public static convertDataGet(data: any) {
        let cv: string = ""
        if (typeof data === "object") {
            Object.entries(data).forEach(([key, value]) => {
                if (value) {
                    cv = `${cv}&${key}=${value}`
                }
            })
        }

        return cv
    }
}
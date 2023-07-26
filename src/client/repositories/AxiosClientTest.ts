import axios, {AxiosRequestConfig} from "axios";
import {StoreConfig} from "../config/StoreConfig";

export class AxiosClient {
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

    static get(
        url: string
    ) {
        const config = this.getConfig()

        return axios
            .get(url, config)
            .then(r => r.data)
    }

    static post(
        url: string,
        data?: Record<string, any>
    ) {
        const config = this.getConfig()

        return axios
            .post(url, data, config)
            .then(r => r.data)
    }
}
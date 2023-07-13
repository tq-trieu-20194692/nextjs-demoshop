import axios, {AxiosRequestConfig, CancelToken} from "axios";
import {getLng} from "../locales/i18n";
import {App} from "../const/App";
import {ApiResModel} from "../models/ApiResModel";
import {EDFile} from "../core/encrypt/EDFile";
import moment from "moment";
import {Color} from "../const/Color";
import {EDData} from "../core/encrypt/EDData";
import {StoreConfig} from "../config/StoreConfig";
import {isArray, isObject} from "lodash";

type _T_OsDataHeader = {
    agent?: Record<string, any>
    langCode?: string
    platform?: string
}

export class AxiosClient {
    static readonly Config = (isUp: boolean = false): AxiosRequestConfig => {
        const config: AxiosRequestConfig = {
            headers: {
                "Content-Type": isUp ? "multipart/form-data" : "text/json",
                // "Lang-Code": lng ?? 'vi',
                // "Platform": "web"
            },
            withCredentials: false
        }

        if (!isUp) {
            config.headers!.Accept = "application/json";
        }

        const storeConfig = StoreConfig.getInstance()

        if (storeConfig.token && storeConfig.token.length > 0) {
            // console.log('accessToken', storeConfig.accessToken.token)
            const et = EDData.setData({
                t: storeConfig.token,
                e: moment().add(30, 'seconds').unix()
            })

            config.headers!.Authorization = `Bearer ${storeConfig.token}`
        }

        const osData: _T_OsDataHeader = {
            langCode: getLng() ?? 'vi',
            platform: 'web'
        }

        config.headers!['os-data'] = EDData.setData(osData)

        return config;
    }

    public static get(path: string, query?: any, cancelToken?: CancelToken): Promise<ApiResModel> {
        const ep = EDFile.setLinkUrl({
            p: path,
            q: AxiosClient.convertDataGet(query),
            e: moment().add(30, 'seconds').unix()
        })

        console.log('%c<-GET--------------------------------------------', Color.ConsoleInfo);
        console.log(`[${moment().format(App.FormatTimeFull)}] PATH: ${path}`);
        console.log(`QUERY:`, query);

        return axios
            .get(`${App.ApiUrlTest}/${ep}`, cancelToken
                ? {
                    ...AxiosClient.Config(),
                    ...{
                        cancelToken: cancelToken,
                    }
                }
                : AxiosClient.Config())
            .then(r => {
                const data = EDData.getData(r.data) ?? r.data

                console.log('RES:', data);
                console.log('%c--END------------------------------------------->', Color.ConsoleInfo);

                return new ApiResModel(data);
            });
    }

    public static post(
        path: string,
        data?: any,
        isUp: boolean = false,
        config?: AxiosRequestConfig,
    ): Promise<ApiResModel> {
        const ep = EDFile.setLinkUrl({
            p: path,
            e: moment().add(30, 'seconds').unix()
        });

        console.log('%c<-POST-------------------------------------------', Color.ConsoleInfo);
        console.log(`[${moment().format(App.FormatTimeFull)}] PATH: ${path}`);

        let _data

        if (data) {
            console.log(`DATA:`, data)

            if (isUp) {
                _data = data
            } else {
                _data = EDData.setData(data)
            }
        }

        return axios
            .post(`${App.ApiUrlTest}/${ep}`, _data, config ?? AxiosClient.Config(isUp))
            .then(r => {
                const data = EDData.getData(r.data) ?? r.data

                console.log('RES:', data);
                console.log('%c--END------------------------------------------->', Color.ConsoleInfo);

                return new ApiResModel(data);
            });
    }

    public static put(
        path: string,
        data: any,
        config: AxiosRequestConfig = AxiosClient.Config()
    ): Promise<ApiResModel> {
        const ep = EDFile.setLinkUrl({
            p: path,
            e: moment().add(30, 'seconds').unix()
        });

        console.log('%c<-PUT--------------------------------------------', Color.ConsoleInfo);
        console.log(`[${moment().format(App.FormatTimeFull)}] PATH: ${path}`);

        let _data

        if (data) {
            console.log(`DATA:`, data)

            _data = EDData.setData(data)
        }

        return axios
            .put(`${App.ApiUrl}/${ep}`, _data, config)
            .then(r => {
                const data = EDData.getData(r.data) ?? r.data

                console.log('RES:', data);
                console.log('%c--END------------------------------------------->', Color.ConsoleInfo);

                return new ApiResModel(data);
            });
    }

    public static delete(
        path: string,
        config: AxiosRequestConfig = AxiosClient.Config()
    ): Promise<ApiResModel> {
        const ep = EDFile.setLinkUrl({
            p: path,
            e: moment().add(30, 'seconds').unix()
        });

        console.log('%c<-DELETE--------------------------------------------', Color.ConsoleInfo);
        console.log(`[${moment().format(App.FormatTimeFull)}] PATH: ${path}`);

        return axios
            .delete(`${App.ApiUrl}/${ep}`, config)
            .then(r => {
                const data = EDData.getData(r.data) ?? r.data

                console.log('RES:', data);
                console.log('%c--END------------------------------------------->', Color.ConsoleInfo);

                return new ApiResModel(data);
            });
    }

    public static convertDataGet(data: any, prefix: string = '') {
        const cv: any = {};

        if (typeof data === "object") {
            Object.entries(data as any).forEach(([key, value]) => {
                if (isObject(value) && !isArray(value)) {
                    Object.assign(cv, AxiosClient.convertDataGet(value, prefix.length > 0 ? `${prefix}_${key}` : key));
                } else {
                    cv[prefix.length > 0 ? `${prefix}_${key}` : key] = value;
                }
            });
        }

        return cv;
    }
}

import {App} from "../const/App";
import {forEach, forIn, includes, snakeCase, sum} from "lodash";
import moment, {Moment} from "moment";
import {ReactNode} from "react";
import {ValidateStatus} from "antd/es/form/FormItem";
import {validate as uuidValidate} from "uuid";
import {EDFile} from "./encrypt/EDFile";

export class Utils {
    public static isDev = (): boolean => {
        return !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    }

    public static getOSName = () => {
        return "Web";
    }

    public static getVersion = (): string => {
        return navigator.appVersion;
    }

    public static getNPT = (): string => {
        return "";
    }

    public static copyClipboard = async (str: string) => {
        await navigator.clipboard.writeText(str)
    }

    public static boolToInt = (bool: boolean): number => {
        return bool ? 1 : 0;
    }

    public static intToBool = (value: string | number): boolean => {
        return value.toString() === '1';
    }

    public static debounce = <F extends ((...args: any) => any)>(func: F, waitFor: number) => {
        let timeout: number = 0

        const debounced = (...args: any) => {
            clearTimeout(timeout)
            setTimeout(() => func(...args), waitFor)
        }

        return debounced as (...args: Parameters<F>) => ReturnType<F>
    }

    public static clearEmptyUrl = (data: any) => {
        if (typeof data !== "object") {
            return data;
        }

        const newData: any = {};

        forIn(data, (value: any, key: string) => {
            if (value !== undefined && value.toString().length > 0) {
                newData[key] = value;
            }
        });

        return newData;
    }

    public static strSlug = (str: string): string => {
        let filter = str.toLowerCase();

        filter = filter.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a");
        filter = filter.replace(/[èéẹẻẽêềếệểễ]/g, "e");
        filter = filter.replace(/[ìíịỉĩ]/g, "i");
        filter = filter.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o");
        filter = filter.replace(/[ùúụủũưừứựửữ]/g, "u");
        filter = filter.replace(/[ỳýỵỷỹ]/g, "y");
        filter = filter.replace(/đ/g, "d");
        filter = filter.replace(/ & /g, "-")
        filter = filter.replace(/-&-/g, "-");
        // filter = filter.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");
        filter = filter.replace(/!|@|%|\^|\*|\(|\)|\+|=|<|>|\?|\/|,|\.|:|;|'| |"|&|#|\[|]|~|$|_/g, "-");

        filter = filter.replace(/-+-/g, "-");
        // filter = filter.replace(/^\-+|\-+$/g, "");
        filter = filter.replace(/^-+|-+$/g, "");

        return filter;
    }

    public static dataURLtoBlob(dataUrl: any) {
        const arr = dataUrl.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bStr = atob(arr[1]);
        let n = bStr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bStr.charCodeAt(n);
        }

        return new Blob([u8arr], {type: mime});
    }

    public static checkError = (e: any) => {
        console.warn(e.constructor, e.name, e.message, e.stack);
    }

    public static homeAsset = (path: string): string => {
        return App.HomeUrl + `/${path}`;
    }

    public static appAsset = (path: string): string => {
        return App.AppUrl + `/${path}`;
    }

    public static checkHourState(timestamp: number, expired: number = App.HoursStoreState) {
        return moment().diff(moment.unix(timestamp), 'hours') > expired;
    }

    public static htmlDecode(msg: string) {
        const e = document.createElement('div');
        e.innerHTML = msg;
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue ?? '';
    }

    public static getLocalAsset(path?: string) {
        return `${window.location.origin}/${path ?? ''}`;
    }

    public static isObject(obj: any, keysLength?: number) {
        const is = obj.constructor === Object;

        if (keysLength) {
            return is && Object.keys(obj).length > keysLength;
        } else {
            return obj.constructor === Object;
        }
    }

    public static isArray(arr: any, length?: number) {
        const is = arr instanceof Array;

        if (length) {
            return is && arr.length > length;
        } else {
            return arr instanceof Array;
        }
    }

    public static arrayAvg(arr: number[]) {
        if (arr.length === 0) {
            return 0;
        }

        return sum(arr) / arr.length;
    }

    public static formatByte(num: number, precision: number = 1) {
        let i = 0;
        const suffix = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        while ((num / 1024) > 1) {
            num = num / 1024;
            i++;
        }

        return num.toFixed(precision) + suffix[i];
    }

    public static stringToUUID(value: string, join: string = "-") {
        return [20, 16, 12, 8].reduce((previous, current) => previous.substring(0, current) + join + previous.substring(current), value)
    }

    public static UUIDToString(value: string, join: string = "-") {
        return value.replaceAll(join, "")
    }

    public static imageDataSrc(data: string) {
        return data.indexOf("http") === -1
            ? data.indexOf("data:image") === -1
                ? `data:image/jpeg;base64,${data}`
                : data
            : data
    }

    static getSecondStr = (seconds: number) => {
        const minutes: number = Math.floor(seconds / 60);
        const sec: number = seconds % 60;

        if (minutes > 0 && sec > 0) {
            return minutes + " phút " + sec + " giây";
        } else if (minutes > 0) {
            return minutes + " phút";
        } else {
            return sec + " giây";
        }
    }

    static animateNumber(finalNumber: number, duration = 5000, startNumber = 0, callback: any) {
        const startTime = performance.now()

        function updateNumber(currentTime: number) {
            const elapsedTime = currentTime - startTime
            if (elapsedTime > duration) {
                callback(finalNumber)
            } else {
                const rate = elapsedTime / duration
                const currentNumber = Math.round(rate * finalNumber)
                callback(currentNumber)
                requestAnimationFrame(updateNumber)
            }
        }

        requestAnimationFrame(updateNumber)
    }

    // [lon (-90 -> 90), lat (-180 -> 180)]
    static getDistance = (c1: [number, number], c2: [number, number], opt_radius?: number) => {
        const DEFAULT_RADIUS = 6371008.8;

        const toRadians = (angleInDegrees: number) => {
            return (angleInDegrees * Math.PI) / 180;
        }

        const radius = opt_radius ?? DEFAULT_RADIUS;
        const lat1 = toRadians(c1[1]);
        const lat2 = toRadians(c2[1]);
        const deltaLatBy2 = (lat2 - lat1) / 2;
        const deltaLonBy2 = toRadians(c2[0] - c1[0]) / 2;
        const a = Math.sin(deltaLatBy2) * Math.sin(deltaLatBy2) +
            Math.sin(deltaLonBy2) *
            Math.sin(deltaLonBy2) *
            Math.cos(lat1) *
            Math.cos(lat2);

        return 2 * radius * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    static delay = (second: number) => {
        return new Promise(resolve => setTimeout(resolve, 1000 * second));
    }

    static rmObjectByValue<T>(obj: Record<string, any>, compare: any = [null, [], '', undefined, {}]): T {
        let data: any = {};

        for (const key in obj) {
            const value = obj[key]

            if (!(value instanceof Array) && value instanceof Object && Object.keys(value).length > 0) {
                data[key] = Utils.rmObjectByValue(value, compare)
            } else {
                if (compare instanceof Array) {
                    if (includes(compare, value)) {
                        continue
                    }
                } else {
                    if (value === compare) {
                        continue
                    }
                }

                data[key] = value
            }
        }

        return data
    }

    static base64Encode(str: string | object) {
        if (typeof str == "object") {
            str = JSON.stringify(str)
        }

        return Buffer.from(str).toString('base64')
    }

    static base64Decode(str: string) {
        return Buffer.from(str, 'base64').toString('ascii')
    }

    static versionCompare(v1: string, v2: string, options?: { lexicographical?: boolean, zeroExtend?: boolean }): number {
        let lexicographical = options && options.lexicographical,
            zeroExtend = options && options.zeroExtend,
            v1parts: (number | string)[] = v1.split('.'),
            v2parts: (number | string)[] = v2.split('.');

        const isValidPart = (x: string) => {
            return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
        }

        // @ts-ignore
        if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
            return NaN;
        }

        if (zeroExtend) {
            while (v1parts.length < v2parts.length) v1parts.push("0");
            while (v2parts.length < v1parts.length) v2parts.push("0");
        }

        if (!lexicographical) {
            v1parts = v1parts.map(Number);
            v2parts = v2parts.map(Number);
        }

        for (let i = 0; i < v1parts.length; ++i) {
            if (v2parts.length == i) {
                return 1;
            }

            if (v1parts[i] == v2parts[i]) {
                // continue;
            } else if (v1parts[i] > v2parts[i]) {
                return 1;
            } else {
                return -1;
            }
        }

        if (v1parts.length != v2parts.length) {
            return -1;
        }

        return 0;
    }

    static viewHelpError<T extends any>(form: T | undefined, key: string | keyof T): ReactNode {
        if (!form || Object.keys(form).length == 0) {
            return ''
        }

        const split = (key as string).split('.')

        let data: any = form

        for (const v of split) {
            if (data[v]) {
                data = data[v]
            } else {
                return ''
            }
        }

        return data.length > 0 ? data : ''
    }

    static viewStatusError<T extends any>(form: T | undefined, key: string | keyof T): ValidateStatus {
        if (!form || Object.keys(form).length == 0) {
            return ''
        }

        const split = (key as string).split('.')

        let data: any = form

        for (const v of split) {
            if (data[v]) {
                data = data[v]
            } else {
                return ''
            }
        }

        return data.length > 0 ? 'error' : ''
    }

    static isNumeric(n: any) {
        return !isNaN(parseFloat(n)) && isFinite(n)
    }

    static cvObjectKeySnakeCase<T extends Record<string, any>>(obj: T): T {
        const newObj: Record<string, any> = {}

        forEach(obj, (value, key) => {
            newObj[snakeCase(key)] = value
        })

        return newObj as T
    }

    // static cvErrorKeyFromApi<T extends Record<string, any>>(obj: T): T {
    //     console.log('obj', obj)
    //
    //     const newObj: Record<string, any> = {}
    //
    //     forEach(obj, (value, key) => {
    //         const split = (key as string).split('.')
    //
    //         let newKey: Record<string, any> = {}
    //
    //         for (const v of split) {
    //             newObj[v] = value
    //         }
    //
    //         console.log('newKey', newKey)
    //
    //         newObj[camelCase(key)] = value
    //     })
    //
    //     return newObj as T
    // }

    static compactUUID(uuid: string) {
        if (!uuidValidate(uuid)) {
            return uuid
        }

        const split = uuid.split('-')

        return `${split[0]}...${split[split.length - 1]}`
    }

    static assetCdnGs(
        path: 'si' | 'sv' | 'sp',
        options?: Record<string, any>
    ) {
        let url = `${App.UrlCdnGs}/${path}/`;

        if (options) {
            url += EDFile.setLinkUrl(options)
        }

        return url
    }

    public static cdnGdtV3Dec(options: {
        type: "raw" | "tile" | "pc" | "tm" | "i3s" | "gs" | "ms" | "mc" | "mp" | 'vr' | 'obj',
        data?: {
            id: string
            dt?: string | Moment
            uri: string
        } | Record<string, any>,
        uri?: string
        timeout?: number
    }) {
        if (options.data?.dt && typeof options.data.dt != "string") {
            if (moment.isMoment(options.data.dt)) {
                options.data.dt = options.data.dt.format(App.FormatFromDateTime)
            }
        }

        return `${App.UrlCdnGdt}/v3/d/` + EDFile.setLinkUrl({
            t: options.type,
            ...(
                options.data && {
                    d: options.data
                }
            ),
            ...(
                options.uri && {
                    uri: options.uri
                }
            ),
            ...(
                options.timeout && {
                    e: options.timeout
                }
            )
        })
    }

    public static cdnGdtV3DecRaw(uri: string) {
        return this.cdnGdtV3Dec({
            type: "raw",
            uri: uri
        })
    }
}

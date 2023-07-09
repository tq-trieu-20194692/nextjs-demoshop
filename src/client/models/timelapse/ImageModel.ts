import {Model} from "../Model";
import {Normalize} from "../../core/Normalize";
import {App} from "../../const/App";
import moment from "moment/moment";
import {T_FQ} from "../../const/Types";
import {E_ImageResUrlType} from "../../const/Events";
import {Utils} from "../../core/Utils";

export type T_MachineImageFQ = T_FQ & {
    filter?: T_MachineImageFilterFields
}

export type T_ImageFQ = T_FQ & {
    filter?: T_ImageFilterFields
}

export type T_MachineImageFilterFields = {
    id?: string
    name?: string
    order_start?: number
    order_end?: number
    date_shot_start?: string
    date_shot_end?: string
}

export type T_ImageFilterFields = T_MachineImageFilterFields & {
    mid: string
}

type _T_InfoType = {
    size?: number
    width?: number
    height?: number
    sensor?: {
        airTemp?: number
        airHumid?: number
    }
}

export class ImageModel extends Model {
    id?: string
    name?: string
    order?: number
    info?: _T_InfoType
    dateShot?: string
    dateSync?: string

    isCi: boolean
    dateRaw?: string

    dateShotFormatted = (format: string = App.FormatToMoment): string => moment(this.dateShot, App.FormatISOFromMoment).format(format)
    dateSyncFormatted = (format: string = App.FormatToMoment): string => moment(this.dateSync, App.FormatISOFromMoment).format(format)

    getShotImageUrl = (options: {
        ci?: boolean,
        id?: string,
        name?: string,
        timeout?: number,
        type: E_ImageResUrlType,
        size?: 426 | 1280 | 1920,
        attach?: Record<string, any>[] | boolean
    }) => {
        let ci

        if (options.ci) {
            ci = options.ci
        } else if (
            options.type === E_ImageResUrlType.Thumb
            && this.isCi
            && (options.size && (options.size == 426 || options.size == 1280))
        ) {
            ci = this.isCi
        }

        const id = options.id ?? this.id
        const name = options.name ?? this.name
        const dateShot = this.dateRaw ?? this.dateShotFormatted(App.FormatFromDateTime)

        if (!dateShot || !id) {
            return undefined
        }

        const typeData: any[] = [options.type]

        if (options.size) {
            typeData.push(options.size)
        }

        // if (options.attach !== undefined) {
        //     let attach
        //
        //     if (typeof options.attach === "boolean") {
        //         if (options.attach && this.info?.sensor && this.info.sensor.length > 0) {
        //             attach = this.info.sensor.map(v => v.toObject())
        //         }
        //     } else if (options.attach.length > 0) {
        //         attach = options.attach
        //     }
        //
        //     if (attach) {
        //         typeData.push(attach)
        //     }
        // }

        return Utils.assetCdnGs(
            'si',
            {
                ...(
                    ci && {
                        ci: ci
                    }
                ),
                i: id,
                n: name,
                t: typeData,
                ds: dateShot,
                ...(
                    options.timeout && {
                        e: options.timeout
                    }
                )
            }
        )
    }


    formatBytes = (bytes?: number, decimals = 2) => {
        const byte = bytes ?? this.info?.size
        if (!byte || !+byte) {
            return '0 Bytes'
        }

        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

        const i = Math.floor(Math.log(byte) / Math.log(k))

        return `${parseFloat((byte / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }

    constructor(data: Record<string, any>) {
        super(data)

        this.id = Normalize.initJsonString(data, "id")
        this.name = Normalize.initJsonString(data, "name")
        this.order = Normalize.initJsonNumber(data, "order")
        this.dateShot = Normalize.initJsonString(data, "date_shot")
        this.dateSync = Normalize.initJsonString(data, "date_sync")
        this.info = Normalize.initJsonObject(data, "info", v1 => ({
            size: Normalize.initJsonNumber(v1, "size"),
            width: Normalize.initJsonNumber(v1, "width"),
            height: Normalize.initJsonNumber(v1, "height"),
            sensor: Normalize.initJsonObject(v1, "sensor", v2 => ({
                airTemp: Normalize.initJsonNumber(v2, "air_temp"),
                airHumid: Normalize.initJsonNumber(v2, "air_humid")
            }))
        }))

        this.isCi = Normalize.initJsonBool(data, 'is_ci') ?? false
        this.dateRaw = Normalize.initJsonString(data, 'date_raw')
    }
}
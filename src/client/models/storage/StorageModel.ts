import {Model} from "../Model";
import {App} from "../../const/App";
import moment from "moment/moment";
import {Normalize} from "../../core/Normalize";
import {T_FQ} from "../../const/Types";

export type T_StorageFQ = T_FQ & {
    name?: string
    include?: "file" | "dir" | string
}

export type T_FileV0 = {
    path: string
    content: string
}

export class StorageModel extends Model {
    path?: string
    type?: string
    size?: number
    lastModified?: number
    hasChildren?: boolean

    sizeFormatted = (bytes?: number, decimals = 2) => {
        const byte = bytes ?? this.size
        if (!byte || !+byte) {
            return ""
        }

        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

        const i = Math.floor(Math.log(byte) / Math.log(k))

        return `${parseFloat((byte / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }

    lastModifiedFormatted = (format: string = App.FormatToMoment): string => this.lastModified ? moment.unix(this.lastModified).format(format) : ""

    constructor(data: Record<string, any>) {
        super(data)

        this.path = Normalize.initJsonString(data, "path")
        this.type = Normalize.initJsonString(data, "type")
        this.size = Normalize.initJsonNumber(data, "size")
        this.lastModified = Normalize.initJsonNumber(data, "last_modified")
        this.hasChildren = Normalize.initJsonBool(data, "has_children")
    }
}
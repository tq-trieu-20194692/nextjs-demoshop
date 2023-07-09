import {Model} from "../Model";
import {Normalize} from "../../core/Normalize";
import {App} from "../../const/App";
import moment from "moment";
import {T_FQ} from "../../const/Types";

export type T_UserFQ = T_FQ & {
    filter?: T_UserFilterFields
    fields?: string | ('id' | 'name' | 'username' | 'email' | 'phone' | 'status' | 'adm' | 'created_at')[]
}

export type T_UserFilterFields = {
    q?: string
    name?: string
    username?: string
    email?: string
    phone?: string
    status?: string
    adm?: string
}

type _T_SettingType = {
    service?: {
        timelapse?: string[]
    }
}

export type T_UserV0 = {
    name?: string
    username?: string
    email?: string
    phone?: string
    password?: string
    setting?: _T_SettingType
    state?: number
    status?: boolean
    adm?: boolean
    parent_id?: string
    exp_at?: {
        start?: string
        end?: string
    }
}

type _T_ParentType = {
    id?: string
    name?: string
    username?: string
}

export class CUserModel extends Model {
    id?: string
    parent?: _T_ParentType
    name?: string
    username?: string
    email?: string
    phone?: string
    state?: number
    status?: boolean
    adm?: boolean
    setting?: _T_SettingType
    createdAt?: string
    expAt?: {
        start?: string
        end?: string
    }

    createdAtFormatted = (format: string = App.FormatToMoment): string => moment(this.createdAt, App.FormatISOFromMoment).format(format)
    expStartAtFormatted = (format: string = App.FormatToMoment): string => moment(this.expAt?.start, App.FormatISOFromMoment).format(format)
    expEndAtFormatted = (format: string = App.FormatToMoment): string => moment(this.expAt?.end, App.FormatISOFromMoment).format(format)

    constructor(data: Record<string, any>) {
        super(data)

        this.id = Normalize.initJsonString(data, "id")
        this.parent = Normalize.initJsonObject(data, "parent", (v1): _T_ParentType => ({
            id: Normalize.initJsonString(v1, "id"),
            name: Normalize.initJsonString(v1, "name"),
            username: Normalize.initJsonString(v1, "username")
        }))
        this.name = Normalize.initJsonString(data, "name")
        this.username = Normalize.initJsonString(data, "username")
        this.email = Normalize.initJsonString(data, "email")
        this.phone = Normalize.initJsonString(data, "phone")
        this.state = Normalize.initJsonNumber(data, "state")
        this.status = Normalize.initJsonBool(data, "status")
        this.adm = Normalize.initJsonBool(data, "adm")
        this.setting = Normalize.initJsonObject(data, "setting", (v1) => ({
            service: Normalize.initJsonObject(v1, "service", (v2) => ({
                timelapse: Normalize.initJsonArray(v2, "timelapse")
            }))
        }))
        this.createdAt = Normalize.initJsonString(data, "created_at")
        this.expAt = Normalize.initJsonObject(data, "exp_at", v1 => ({
            start: Normalize.initJsonString(v1, "start"),
            end: Normalize.initJsonString(v1, "end"),
        }))
    }

    copyFrom = (data: Record<string, any>): CUserModel => {
        if (this.raw) {
            return new CUserModel({...this.raw, ...data})
        } else {
            return new CUserModel(data)
        }
    }
}

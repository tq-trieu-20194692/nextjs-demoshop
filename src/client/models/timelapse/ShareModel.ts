import {Model} from "../Model";
import {App} from "../../const/App";
import moment from "moment";
import {Normalize} from "../../core/Normalize";
import {T_FQ} from "../../const/Types";

export type T_ShareFQ = T_FQ & {
    filter?: T_ShareFilterFields
    fields?: string | ("id" | "user" | "permission" | "status" | "created_at")[]
}

export type T_ShareFilterFields = {
    user_id?: string
    status?: string
}

export type T_ShareV0 = {
    user_id?: string
    status?: boolean
    permission?: _T_PermissionType
    machines?: T_PermissionMachine[]
}

type _T_UserType = {
    id?: string
    name?: string
    username?: string
}

type _T_PermissionType = {
    share?: ("view" | "add" | "edit" | "delete")[]
    sensor?: ("air_temp" | "air_humid")[]
}

export type T_PermissionMachine = {
    mid?: string
    name?: string
    status?: boolean
    permission?: {
        image?: boolean
        video?: boolean
        sensor?: ("air_temp" | "air_humid")[]
    }
}

export class ShareModel extends Model {
    id?: string
    userId?: string
    user?: _T_UserType
    permission?: _T_PermissionType
    machines?: T_PermissionMachine[]
    status?: boolean
    createdAt?: string

    createdAtFormatted = (format: string = App.FormatToMoment): string => moment(this.createdAt, App.FormatISOFromMoment).format(format)

    constructor(data: Record<string, any>) {
        super(data)

        this.id = Normalize.initJsonString(data, "id")
        this.userId = Normalize.initJsonString(data, "user_id")
        this.user = Normalize.initJsonObject(data, "user", v1 => ({
            id: Normalize.initJsonString(v1, "id"),
            name: Normalize.initJsonString(v1, "name"),
            username: Normalize.initJsonString(v1, "username")
        }))
        this.permission = Normalize.initJsonObject(data, "permission", v1 => ({
            share: Normalize.initJsonArray(v1, "share"),
            sensor: Normalize.initJsonArray(v1, "sensor"),
        }))
        this.machines = Normalize.initJsonArray(data, "machines", v1 => v1.map(item => ({
            mid: Normalize.initJsonString(item, "mid"),
            name: Normalize.initJsonString(item, "name"),
            permission: Normalize.initJsonObject(item, "permission", v2 => ({
                image: Normalize.initJsonBool(v2, "image"),
                video: Normalize.initJsonBool(v2, "video"),
                sensor: Normalize.initJsonArray(v2, "sensor")
            })),
            status: Normalize.initJsonBool(item, "status")
        })))
        this.status = Normalize.initJsonBool(data, "status")
        this.createdAt = Normalize.initJsonString(data, "created_at")
    }

    copyFrom = (data: Record<string, any>): ShareModel => {
        if (this.raw) {
            return new ShareModel({...this.raw, ...data})
        } else {
            return new ShareModel(data)
        }
    }
}

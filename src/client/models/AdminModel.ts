import {Model} from "./Model";
import {App} from "../const/App";
import moment from "moment/moment";
import {Normalize} from "../core/Normalize";
import {T_FQ} from "../const/Types";

export type T_AdminFQ = T_FQ & {
    filter?: T_AdminFilterFields
    fields?: string | ("id" | "name" | "username" | "email" | "status" | "is_owner" | "created_at")[]
}

export type T_AdminFilterFields = {
    q?: string
    name?: string
    username?: string
    email?: string
    status?: string
    is_owner?: string
}

export type T_AdminV0 = {
    name: string
    username: string
    email: string
    status?: boolean
    is_owner?: boolean
    password?: string
}
export class AdminModel extends Model {
    id?: string
    name?: string
    username?: string
    email?: string
    status?: boolean
    isOwner?: boolean
    createdAt?: string

    createdAtFormatted = (format: string = App.FormatToMoment): string => moment(this.createdAt, App.FormatISOFromMoment).format(format)

    constructor(data: Record<string, any>) {
        super(data)

        this.id = Normalize.initJsonString(data, "id")
        this.name = Normalize.initJsonString(data, "name")
        this.username = Normalize.initJsonString(data, "username")
        this.email = Normalize.initJsonString(data, "email")
        this.status = Normalize.initJsonBool(data, "status")
        this.isOwner = Normalize.initJsonBool(data, "is_owner")
        this.createdAt = Normalize.initJsonString(data, "created_at")
    }

    copyFrom = (data: Record<string, any>): AdminModel => {
        if (this.raw) {
            return new AdminModel({...this.raw, ...data})
        } else {
            return new AdminModel(data)
        }
    }
}

import {Model} from "../Model";
import {App} from "../../const/App";
import moment from "moment/moment";
import {Normalize} from "../../core/Normalize";
import {T_FQ} from "../../const/Types";

type _T_ShareType = ("view" | "add" | "edit" | "delete")[]

export type T_GdtShareFQ = T_FQ & {
    filter?: T_GdtShareFilterFields
    fields?: string | ("id" | "user" | "permission" | "status" | "created_at")[]
}

export type T_GdtShareFilterFields = {
    user_id?: string
    status?: string
}

export type T_GdtShareV0 = {

}

export class GdtShareModel extends Model {
    id?: string
    user?: {
        id?: string
        name?: string
        username?: string
    }
    permission?: {
        share?: _T_ShareType
    }
    status?: boolean
    createdAt?: string

    createdAtFormatted = (format: string = App.FormatToMoment): string => moment(this.createdAt, App.FormatISOFromMoment).format(format)

    constructor(data: Record<string, any>) {
        super(data)

        this.id = Normalize.initJsonString(data, "id")
        this.user = Normalize.initJsonObject(data, "user", v1 => ({
            id: Normalize.initJsonString(v1, "id"),
            name: Normalize.initJsonString(v1, "name"),
            username: Normalize.initJsonString(v1, "username")
        }))
        this.permission = Normalize.initJsonObject(data, "permission", v1 => ({
            share: Normalize.initJsonArray(v1, "share")
        }))
        this.status = Normalize.initJsonBool(data, "status")
        this.createdAt = Normalize.initJsonString(data, "created_at")
    }

    copyFrom = (data: Record<string, any>): GdtShareModel => {
        if (this.raw) {
            return new GdtShareModel({...this.raw, ...data})
        } else {
            return new GdtShareModel(data)
        }
    }
}
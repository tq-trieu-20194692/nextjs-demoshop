import {Model} from "../../Model";
import {Normalize} from "../../../core/Normalize";
import {App} from "../../../const/App";
import moment from "moment";
import {T_FQ} from "../../../const/Types";
import {E_DriveBoxState} from "../../../const/Events";

export type T_DriveBoxFQ = T_FQ & {
    filter?: T_DriveBoxFilterFields
    fields?: string | ("id" | "name" | "describe" | "size" | "total" | "state" | "user" | "files" | "created_at")[]
}

export type T_DriveBoxFilterFields = {
    q?: string
    id?: string
    name?: string
    user_id?: string
    describe?: string
}

export class DriveBoxModel extends Model {
    id: string
    name: string
    describe?: string
    size?: number
    total?: number
    state?: E_DriveBoxState
    createdAt?: string
    user?: {
        id?: string
        name?: string
    }
    files?: {
        id?: string
        name?: string
        size?: number
        extension?: string
        state?: number
        createdAt?: string
    } []

    createdAtFormatted = (format: string = App.FormatToMoment): string => moment(this.createdAt, App.FormatISOFromMoment).format(format)

    constructor(data: Record<string, any>) {
        super(data)

        this.id = Normalize.initJsonString(data, "id") || ""
        this.name = Normalize.initJsonString(data, "name") || ""
        this.describe = Normalize.initJsonString(data, "describe")
        this.size = Normalize.initJsonNumber(data, "size")
        this.total = Normalize.initJsonNumber(data, "total")
        this.state = Normalize.initJsonNumber(data, "state")
        this.createdAt = Normalize.initJsonString(data, "created_at")
        this.user = Normalize.initJsonObject(data, "user", v1 => ({
            id: Normalize.initJsonString(v1, "id"),
            name: Normalize.initJsonString(v1, "name")
        }))
        this.files = Normalize.initJsonArray(data, "files", v1 => v1.map(item => ({
            id: Normalize.initJsonString(item, "id"),
            name: Normalize.initJsonString(item, "name"),
            size: Normalize.initJsonNumber(item, "size"),
            extension: Normalize.initJsonString(item, "extension"),
            state: Normalize.initJsonNumber(item, "state"),
            createdAt: Normalize.initJsonString(item, "created_at")
        })))
    }

    copyFrom = (data: Record<string, any>): DriveBoxModel => {
        if (this.raw) {
            return new DriveBoxModel({...this.raw, ...data})
        } else {
            return new DriveBoxModel(data)
        }
    }
}
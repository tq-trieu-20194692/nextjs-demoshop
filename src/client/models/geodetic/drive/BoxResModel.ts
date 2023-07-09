import {Model} from "../../Model";
import {App} from "../../../const/App";
import moment from "moment";
import {Normalize} from "../../../core/Normalize";
import {T_FQ} from "../../../const/Types";
import {E_DriveBoxResState} from "../../../const/Events";

export type T_BoxResFQ = T_FQ & {
    filter?: T_BoxResFilterFields
    fields?: string | ("id" | "box_id" | "name" | "describe" | "type" | "files" | "state" | "user_id" | "created_at")
}

export type T_BoxResFilterFields = {
    q?: string
    id?: string
    box_id?: string
    name?: string
    describe?: string
    type?: string
    state?: string
}

export class BoxResModel extends Model {
    id: string
    boxId: string
    name: string
    describe?: string
    type?: string
    files?: string[]
    state?: E_DriveBoxResState
    user?: {
        id?: string
        name?: string
    }
    createdAt?: string

    createdAtFormatted = (format: string = App.FormatToMoment): string => moment(this.createdAt, App.FormatISOFromMoment).format(format)

    constructor(data: Record<string, any>) {
        super(data)

        this.id = Normalize.initJsonString(data, "id") ?? ""
        this.boxId = Normalize.initJsonString(data, "box_id") ?? ""
        this.name = Normalize.initJsonString(data, "name") ?? ""
        this.describe = Normalize.initJsonString(data, "describe")
        this.type = Normalize.initJsonString(data, "type")
        this.files = Normalize.initJsonArray(data, "files")
        this.state = Normalize.initJsonNumber(data, "state")
        this.user = Normalize.initJsonObject(data, "user", v1 => ({
            id: Normalize.initJsonString(v1, "id"),
            name: Normalize.initJsonString(v1, "name")
        }))
        this.createdAt = Normalize.initJsonString(data, "created_at")
    }

    copyFrom = (data: Record<string, any>): BoxResModel => {
        if (this.raw) {
            return new BoxResModel({...this.raw, ...data})
        } else {
            return new BoxResModel(data)
        }
    }
}
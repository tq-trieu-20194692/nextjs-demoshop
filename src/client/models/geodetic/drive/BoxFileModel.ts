import {Model} from "../../Model";
import {App} from "../../../const/App";
import moment from "moment/moment";
import {Normalize} from "../../../core/Normalize";
import {T_FQ} from "../../../const/Types";
import {E_DriveBoxFileState} from "../../../const/Events";

export type T_BoxFileFQ = T_FQ & {
    filter?: T_BoxFileFilterFields
    fields?: string | ("id" | "name" | "box_id" | "size" | "checksum" | "extension" | "t_group" | "state" | "created_at")
}

export type T_BoxFileFilterFields = {
    q?: string
    id?: string
    box_id?: string
    name?: string
    state?: string
    res_type?: string
    extension?: string
    extensions?: string
    t_path?: string
    t_label?: string
    t_group?: string
}

export class BoxFileModel extends Model {
    id: string
    boxId: string
    name: string
    size?: number
    checkSum?: string
    extension?: string
    tGroup?: string
    state?: E_DriveBoxFileState
    createdAt?: string

    createdAtFormatted = (format: string = App.FormatToMoment): string => moment(this.createdAt, App.FormatISOFromMoment).format(format)

    constructor(data: Record<string, any>) {
        super(data)

        this.id = Normalize.initJsonString(data, "id") || ""
        this.name = Normalize.initJsonString(data, "name") || ""
        this.boxId = Normalize.initJsonString(data, "box_id") || ""
        this.size = Normalize.initJsonNumber(data, "size")
        this.state = Normalize.initJsonNumber(data, "state")
        this.checkSum = Normalize.initJsonString(data, "checksum")
        this.extension = Normalize.initJsonString(data, "extension")
        this.tGroup = Normalize.initJsonString(data, "t_group")
        this.createdAt = Normalize.initJsonString(data, "created_at")
    }

    copyFrom = (data: Record<string, any>): BoxFileModel => {
        if (this.raw) {
            return new BoxFileModel({...this.raw, ...data})
        } else {
            return new BoxFileModel(data)
        }
    }
}
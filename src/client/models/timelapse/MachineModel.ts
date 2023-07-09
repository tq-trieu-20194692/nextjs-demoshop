import {Model} from "../Model";
import {App} from "../../const/App";
import moment from "moment";
import {Normalize} from "../../core/Normalize";
import {T_FQ} from "../../const/Types";

export type T_ProjectMachineFQ = T_FQ & {
    filter?: T_PMachineFilterFields
    fields?: string | ('id' | 'name' | 'project' | 'is_rs' | 'state' | 'status' | 'created_at')[]
}

export type T_MachineFQ = T_ProjectMachineFQ & {
    filter?: T_MachineFilterFields
    fields?: string | ('id' | 'name' | 'project' | 'is_rs' | 'state' | 'status' | 'created_at')[]
}

export type T_PMachineFilterFields = {
    q?: string
    name?: string
    state?: string
    status?: string
    type?: string
}

export type T_MachineFilterFields = T_PMachineFilterFields & {
    project_id: string
}

type _T_SettingType = {
    sensor?: string[]
}

type _T_InfoType = {
    google?: {
        gid?: string
        vid?: string
        fid?: string
    }
    type?: {
        name?: string
        value?: string
    }
}

export type T_MachineV0 = {
    project_id?: string
    name: string
    state?: number
    status?: boolean
    setting?: _T_SettingType
    info?: {
        google?: {
            gid?: string
            vid?: string
            fid?: string
        }
        type?: {
            value?: string
        }
    }
}

export class MachineModel extends Model {
    id?: string
    name?: string
    project?: {
        id?: string
        name?: string
    }
    setting?: _T_SettingType
    info?: _T_InfoType
    state?: number
    status?: boolean
    isRemove?: boolean
    createdAt?: string

    createdAtFormatted = (format: string = App.FormatToMoment): string => moment(this.createdAt, App.FormatISOFromMoment).format(format)

    constructor(data: Record<string, any>) {
        super(data)

        this.id = Normalize.initJsonString(data, "id")
        this.name = Normalize.initJsonString(data, "name")
        this.project = Normalize.initJsonObject(data, "project", v1 => ({
            id: Normalize.initJsonString(v1, "id"),
            name: Normalize.initJsonString(v1, "name")
        }))
        this.setting = Normalize.initJsonObject(data, "setting", v1 => ({
            sensor: Normalize.initJsonArray(v1, "sensor")
        }))
        this.info = Normalize.initJsonObject(data, "info", v1 => ({
            google: Normalize.initJsonObject(v1, "google", v2 => ({
                gid: Normalize.initJsonString(v2, "gid"),
                vid: Normalize.initJsonString(v2, "vid"),
                fid: Normalize.initJsonString(v2, "fid")
            })),
            type: Normalize.initJsonObject(v1, "type", v2 => ({
                name: Normalize.initJsonString(v2, "name"),
                value: Normalize.initJsonString(v2, "value")
            }))
        }))
        this.state = Normalize.initJsonNumber(data, "state")
        this.status = Normalize.initJsonBool(data, "status")
        this.isRemove = Normalize.initJsonBool(data, "is_rs")
        this.createdAt = Normalize.initJsonString(data, "created_at")
    }

    copyFrom = (data: Record<string, any>): MachineModel => {
        if (this.raw) {
            return new MachineModel({...this.raw, ...data})
        } else {
            return new MachineModel(data)
        }
    }
}

/**
 * Drive folder model
 */

export type T_DriveV0 = {
    name: string
}

export class DriveModel extends Model {
    id?: string
    name?: string
    createdAt?: string

    createdAtFormatted = (format: string = App.FormatToMoment): string => moment(this.createdAt, App.FormatISOFromMoment).format(format)

    constructor(data: Record<string, any>) {
        super(data)

        this.id = Normalize.initJsonString(data, "id")
        this.name = Normalize.initJsonString(data, "name")
        this.createdAt = Normalize.initJsonString(data, "created_at")
    }
}
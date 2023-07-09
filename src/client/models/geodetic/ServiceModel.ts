import {Model} from "../Model";
import {E_CommonState} from "../../const/Events";
import {App} from "../../const/App";
import moment from "moment/moment";
import {Normalize} from "../../core/Normalize";
import {T_FQ} from "../../const/Types";

export type T_ServiceFQ = T_FQ & {
    filter?: T_ServiceFilterFields
    fields?: string | ("id" | "name" | "project" | "user" | "describe" | "type" | "state" | "status" | "address" | "created_at")[]
}

export type T_ServiceFilterFields = {
    q?: string
    id?: string
    project_id?: string
    user_id?: string
    name?: string
    state?: string
    status?: string
    address?: string
}

export type T_CmServiceV0 = {
    name: string
    project_id?: string
    user_id?: string
    describe?: string
    address?: string
    state?: E_CommonState
    status?: boolean
}

export type T_ServiceV0 = T_CmServiceV0 & {
    type?: string
}

export class ServiceModel extends Model {
    id?: string
    project?: {
        id?: string
        name?: string
    }
    user?: {
        id?: string
        name?: string
    }
    name?: string
    describe?: string
    address?: string
    state?: E_CommonState
    status?: boolean
    createdAt?: string

    createdAtFormatted = (format: string = App.FormatToMoment): string => moment(this.createdAt, App.FormatISOFromMoment).format(format)

    constructor(data: Record<string, any>) {
        super(data)

        this.id = Normalize.initJsonString(data, "id")
        this.project = Normalize.initJsonObject(data, "project", v1 => ({
            id: Normalize.initJsonString(v1, "id"),
            name: Normalize.initJsonString(v1, "name")
        }))
        this.user = Normalize.initJsonObject(data, "user", v1 => ({
            id: Normalize.initJsonString(v1, "id"),
            name: Normalize.initJsonString(v1, "name")
        }))
        this.name = Normalize.initJsonString(data, "name")
        this.describe = Normalize.initJsonString(data, "describe")
        this.address = Normalize.initJsonString(data, "address")
        this.state = Normalize.initJsonNumber(data, "state")
        this.status = Normalize.initJsonBool(data, "status")
        this.createdAt = Normalize.initJsonString(data, "created_at")
    }

    copyFrom = (data: Record<string, any>): ServiceModel => {
        if (this.raw) {
            return new ServiceModel({...this.raw, ...data})
        } else {
            return new ServiceModel(data)
        }
    }
}
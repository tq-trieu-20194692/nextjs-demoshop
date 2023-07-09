import {Model} from "../Model";
import {T_Coord, T_FQ} from "../../const/Types";
import {E_CommonState} from "../../const/Events";
import {App} from "../../const/App";
import moment from "moment/moment";
import {Normalize} from "../../core/Normalize";

export type T_GdtProjectFQ = T_FQ & {
    filter?: T_GdtProjectFilterFields
    fields?: string | ("id" | "name" | "user_id" | "address" | "coord" | "describe" | "state" | "status" | "total" | "created_at")[]
}

export type T_GdtProjectFilterFields = {
    q?: string
    user_id?: string
    name?: string
    address?: string
    status?: string
    state?: string
}

export type T_GdtProjectV0 = {
    user_id?: string
    name: string
    address?: string
    state?: E_CommonState
    status?: boolean
    coord?: [number | string, number | string]
    describe?: string
}

export class GdtProjectModel extends Model {
    id?: string
    name?: string
    user?: {
        id?: string
        name?: string
        username?: string
    }
    address?: string
    coord?: T_Coord
    describe?: string
    state?: E_CommonState
    status?: boolean
    createdAt?: string

    total?: {
        m2d?: number
        m3d?: number
        vr?: number
    }

    createdAtFormatted = (format: string = App.FormatToMoment): string => moment(this.createdAt, App.FormatISOFromMoment).format(format)

    constructor(data: Record<string, any>) {
        super(data)

        this.id = Normalize.initJsonString(data, "id")
        this.name = Normalize.initJsonString(data, "name")
        this.user = Normalize.initJsonObject(data, "user", v1 => ({
            id: Normalize.initJsonString(v1, "id"),
            name: Normalize.initJsonString(v1, "name"),
            username: Normalize.initJsonString(v1, "username")
        }))
        this.address = Normalize.initJsonString(data, "address")
        this.coord = Normalize.initJsonObject(data, "coord", v1 => ({
            lat: v1[0],
            lng: v1[1],
        }))
        this.describe = Normalize.initJsonString(data, "describe")
        this.state = Normalize.initJsonNumber(data, "state")
        this.status = Normalize.initJsonBool(data, "status")
        this.createdAt = Normalize.initJsonString(data, "created_at")

        this.total = Normalize.initJsonObject(data, "total", v1 => ({
            m2d: Normalize.initJsonNumber(v1, "m2d"),
            m3d: Normalize.initJsonNumber(v1, "m3d"),
            vr: Normalize.initJsonNumber(v1, "vr")
        }))
    }

    copyFrom = (data: Record<string, any>): GdtProjectModel => {
        if (this.raw) {
            return new GdtProjectModel({...this.raw, ...data})
        } else {
            return new GdtProjectModel(data)
        }
    }
}
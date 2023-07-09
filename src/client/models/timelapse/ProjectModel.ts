import {Model} from "../Model";
import {Normalize} from "../../core/Normalize";
import {App} from "../../const/App";
import moment from "moment/moment";
import {T_Coord, T_FQ} from "../../const/Types";
import {E_CommonState} from "../../const/Events";

export type T_ProjectFQ = T_FQ & {
    filter?: T_ProjectFilterFields
    fields?: string | ('id' | 'user_id' | 'name' | 'address' | 'coord' | 'state' | 'status' | 'created_at' | 'total')[]
}

export type T_ProjectFilterFields = {
    q?: string
    name?: string
    user_id?: string
    address?: string
    state?: string
    status?: string
}

export type T_ProjectV0 = {
    name: string
    user_id?: string
    address?: string
    state?: number
    status?: boolean
    coord?: [string, string]
}

type _T_UserType = {
    id?: string
    name?: string
    username?: string
}

export class ProjectModel extends Model {
    id?: string
    user?: _T_UserType
    name?: string
    address?: string
    coord?: T_Coord
    state?: E_CommonState
    status?: boolean
    createdAt?: string

    totalMachine?: number

    createdAtFormatted = (format: string = App.FormatToMoment): string => moment(this.createdAt, App.FormatISOFromMoment).format(format)

    constructor(data: Record<string, any>) {
        super(data)

        this.id = Normalize.initJsonString(data, "id")
        this.user = Normalize.initJsonObject(data, "user", v1 => ({
            id: Normalize.initJsonString(v1, "id"),
            name: Normalize.initJsonString(v1, "name"),
            username: Normalize.initJsonString(v1, "username"),
        }))
        this.name = Normalize.initJsonString(data, "name")
        this.address = Normalize.initJsonString(data, "address")
        this.coord = Normalize.initJsonArray(data, "coord", value => ({
            lat: value[0],
            lng: value[1]
        }))
        this.state = Normalize.initJsonNumber(data, "state")
        this.status = Normalize.initJsonBool(data, "status")
        this.createdAt = Normalize.initJsonString(data, "created_at")
        this.totalMachine = Normalize.initJsonNumber(data, "total")
    }

    copyFrom = (data: Record<string, any>): ProjectModel => {
        if (this.raw) {
            return new ProjectModel({...this.raw, ...data})
        } else {
            return new ProjectModel(data)
        }
    }
}
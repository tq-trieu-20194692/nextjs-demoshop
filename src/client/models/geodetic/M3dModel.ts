import {Normalize} from "../../core/Normalize";
import {T_FQ} from "../../const/Types";
import {ServiceModel, T_ServiceFilterFields, T_CmServiceV0} from "./ServiceModel";

export type T_M3dFQ = T_FQ & {
    filter?: T_M3dFilterFields
    fields?: string | ("id" | "name" | "project" | "user" | "describe" | "type" | "state" | "status" | "address" | "created_at")[]
}

export type T_M3dFilterFields = T_ServiceFilterFields & {}

export type T_M3dV0 = T_CmServiceV0 & {
    type?: string
}

export class M3dModel extends ServiceModel {
    type?: string

    constructor(data: Record<string, any>) {
        super(data)

        this.type = Normalize.initJsonString(data, "type")
    }

    copyFrom = (data: Record<string, any>): M3dModel => {
        if (this.raw) {
            return new M3dModel({...this.raw, ...data})
        } else {
            return new M3dModel(data)
        }
    }
}
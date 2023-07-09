import {T_FQ} from "../../const/Types";
import {ServiceModel, T_ServiceFilterFields, T_CmServiceV0} from "./ServiceModel";

export type T_VrFQ = T_FQ & {
    filter?: T_VrFilterFields
    fields?: string | ("id" | "name" | "project" | "user" | "describe" | "state" | "status" | "address" | "created_at")[]
}

export type T_VrFilterFields = T_ServiceFilterFields & {}

export type T_VrV0 = T_CmServiceV0 & {}

export class VrModel extends ServiceModel {
    constructor(data: Record<string, any>) {
        super(data)
    }

    copyFrom = (data: Record<string, any>): VrModel => {
        if (this.raw) {
            return new VrModel({...this.raw, ...data})
        } else {
            return new VrModel(data)
        }
    }
}
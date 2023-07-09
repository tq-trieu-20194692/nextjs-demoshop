import {T_FQ} from "../../const/Types";
import {ServiceModel, T_ServiceFilterFields, T_CmServiceV0} from "./ServiceModel";

export type T_M2dFQ = T_FQ & {
    filter?: T_M2dFilterFields
    fields?: string | ("id" | "name" | "project" | "user" | "describe" | "state" | "status" | "address" | "created_at")[]
}

export type T_M2dFilterFields = T_ServiceFilterFields & {}

export type T_M2dV0 = T_CmServiceV0 & {}

export class M2dModel extends ServiceModel {
    constructor(data: Record<string, any>) {
        super(data)
    }

    copyFrom = (data: Record<string, any>): M2dModel => {
        if (this.raw) {
            return new M2dModel({...this.raw, ...data})
        } else {
            return new M2dModel(data)
        }
    }
}
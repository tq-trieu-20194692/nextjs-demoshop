import {ReportModel, T_ReportFilterFields, T_ReportFQ} from "./ReportModel";
import {Normalize} from "../../../core/Normalize";
import {App} from "../../../const/App";
import moment from "moment/moment";

export type T_ReportMachineFQ = T_ReportFQ & {
    filter?: T_ReportMachineFilterFields
}

export type T_ReportMachineFilterFields = T_ReportFilterFields & {
    type?: string
}

export class ReportMachineModel extends ReportModel {
    info?: {
        new?: Record<string, {
            name: string
            date: string
        }[]>
        close?: Record<string, {
            name: string
            date: string
        }[]>
    }

    constructor(data: Record<string, any>) {
        super(data)

        this.info = Normalize.initJsonObject(data, "info", v1 => ({
            new: Normalize.initJsonObject(v1, "new"),
            close: Normalize.initJsonObject(v1, "close")
        }))
    }
}
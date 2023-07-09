import {ReportModel, T_ReportFilterFields, T_ReportFQ} from "./ReportModel";

export type T_ReportUploadFQ = T_ReportFQ & {
    filter?: T_ReportUploadFilterFields
}

export type T_ReportUploadFilterFields = T_ReportFilterFields & {
    mid?: string
    type?: string
}

export class ReportUploadModel extends ReportModel {
    constructor(data: Record<string, any>) {
        super(data)
    }
}
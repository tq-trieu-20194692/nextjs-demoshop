import {ReportModel, T_ReportFilterFields, T_ReportFQ} from "./ReportModel";
import {Model} from "../../Model";
import {Normalize} from "../../../core/Normalize";

export type T_ReportImageFQ = T_ReportFQ & {
    filter?: T_ReportUploadFilterFields
}

export type T_ReportUploadFilterFields = T_ReportFilterFields & {
    mid?: string
}

export class ReportImageModel extends Model{
    range?: string
    stats?: {
        name?: string
        chart?: {
            xaxis: string[]
            data: number[]
        }
    }
    constructor(data: Record<string, any>) {
        super(data)

        this.range = Normalize.initJsonString(data, "range")
        this.stats = Normalize.initJsonObject(data, "stats", v1 => ({
            name: Normalize.initJsonString(v1, "name"),
            chart: Normalize.initJsonObject(v1, "chart", v2 => ({
                xaxis: Normalize.initJsonArray(v2, "xaxis") || [],
                data: Normalize.initJsonArray(v2, "data") || []
            }))
        }))
    }
}
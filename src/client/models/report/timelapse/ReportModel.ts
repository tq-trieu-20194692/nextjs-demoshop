import {Model} from "../../Model";
import {Normalize} from "../../../core/Normalize";
import {T_FQ} from "../../../const/Types";

export type T_ReportFQ = T_FQ & {
    fields?: string | ("range" | "stats")[]
    range?: string
}

export type T_ReportFilterFields = {
    date_start?: string
    date_end?: string
}

export class ReportModel extends Model {
    range?: string
    stats?: {
        name?: string
        chart?: {
            xaxis: string[]
            data: number[]
        }
    }[]

    constructor(data: Record<string, any>) {
        super(data)

        this.range = Normalize.initJsonString(data, "range")
        this.stats = Normalize.initJsonArray(data, "stats", v1 => v1.map(item => ({
            name: Normalize.initJsonString(item, "name"),
            chart: Normalize.initJsonObject(item, "chart", v2 => ({
                xaxis: Normalize.initJsonArray(v2, "xaxis") || [],
                data: Normalize.initJsonArray(v2, "data") || []
            }))
        })))
    }
}
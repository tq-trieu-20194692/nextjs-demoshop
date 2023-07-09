import {E_SendingStatus} from "./Events";
import {PaginateMetaModel} from "../models/ApiResModel";
import {MemoizedFunction} from "lodash";

export type T_NextAppData = {
    header?: Record<string, any>;
    more?: {
        now?: number
        env?: Record<string, any>
    }
}

export type T_TagCheck = {
    label: string,
    value: any
}

export type T_AntTableSorter = {
    column: {
        dataIndex: string
        key: string
        sorter: boolean
        title: string
    },
    columnKey: string
    field: string
    order: string
}

export type T_FQ = {
    page?: number
    limit?: number
    sort?: string
    order?: string
}

export type T_Coord = {
    lat: string
    lng: string
}

export type T_CommonState = {
    isLoading: E_SendingStatus
    error?: Record<string, any>
    query: {
        page: number
        limit: number
        sort: string
        order: string
    }
    oMeta?: PaginateMetaModel
    timestamp?: number
    memoizeSearch: MemoizedFunction
}

export type T_TypeService = "2d"|"3d"|"vr"

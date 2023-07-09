import {Normalize} from "../core/Normalize";

export class ApiResModel {
    success: boolean;
    data?: any;
    error?: any;
    items?: any[];
    meta?: PaginateMetaModel
    code: number;

    constructor(data: Record<string, any>) {
        this.success = data['success'];
        this.data = Normalize.initJsonObject(data, 'data')
        this.error = Normalize.initJsonObject(data, 'error')
        this.items = Normalize.initJsonArray(data, 'items')
        this.meta = Normalize.initJsonObject(data, '_meta', (item: Record<string, any>) => new PaginateMetaModel(item))
        this.code = Normalize.initJsonNumber(data, 'code') ?? 1
    }
}

export class PaginateMetaModel {
    totalCount: number
    pageCount: number
    currentPage: number
    nextPage?: number
    perPage: number

    constructor(data: Record<string, any>) {
        this.totalCount = Normalize.initJsonNumber(data, 'total_count') ?? 0
        this.pageCount = Normalize.initJsonNumber(data, 'page_count') ?? 0
        this.currentPage = Normalize.initJsonNumber(data, 'current_page') ?? 0
        this.nextPage = Normalize.initJsonNumber(data, 'next_page')
        this.perPage = Normalize.initJsonNumber(data, 'per_page') ?? 0
    }

    fromObject = (object: any) => {
        Object.assign(this, object)
    }
}

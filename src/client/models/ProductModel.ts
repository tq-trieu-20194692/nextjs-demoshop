import {Model} from "./Model";
import {Normalize} from "../core/Normalize";


export type T_ProductFQ = {
    page?: number
    limit?: number
    sort?: string
    order?: string
    search?: string
}

export class ProductModel extends Model{
    productId?: string;
    name?: string;
    description?: string;
    price: string;
    sale: string;
    tag: string;
    address?:string
    date: string
    // data : Record<string, any>

    constructor(data: Record<string, any>) {
        // this.data= data
        super(data)
        this.productId = Normalize.initJsonString(data,"product_id")
        this.name = Normalize.initJsonString(data, "name")
        this.description = Normalize.initJsonString(data, "description")
        this.price = Normalize.initJsonString(data, "price") || ""
        this.sale = Normalize.initJsonString(data, "sale") || ""
        this.tag = Normalize.initJsonString(data, "tag") || ""
        this.address = Normalize.initJsonString(data, "address")
        this.date = Normalize.initJsonString(data, "date") || ""

    }
    copyFrom = (data: Record<string, any>): ProductModel => {
        if (this.raw) {
            return new ProductModel({...this.raw, ...data})
        } else {
            return new ProductModel(data)
        }
    }
}

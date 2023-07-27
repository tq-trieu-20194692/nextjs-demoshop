import {Model} from "./Model";
import {Normalize} from "../core/Normalize";


export type T_ColorFQ = {
    page?: number
    limit?: number
    sort?: string
    order?: string
    search?: string
}

export class ColorModel extends Model{
    colorId?: string;
    name?: string;

    constructor(data: Record<string, any>) {
        // this.data= data
        super(data)
        this.colorId = Normalize.initJsonString(data,"color_id")
        this.name = Normalize.initJsonString(data, "name")
    }
    copyFrom = (data: Record<string, any>): ColorModel => {
        if (this.raw) {
            return new ColorModel({...this.raw, ...data})
        } else {
            return new ColorModel(data)
        }
    }
}

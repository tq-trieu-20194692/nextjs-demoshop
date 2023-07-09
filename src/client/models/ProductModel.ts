export interface DataItem {
    attribute_id: string;
    name: string;
    images: string[] | null;
    description: string;
    price: string;
    sale: boolean;
    href: string;
    tag: string;
}

export class ProductModel {
    data : Record<string, any>

    constructor(data: Record<string, any>) {
        this.data= data
    }
    copyFrom(merge?: Record<string, any>) {
        return new ProductModel({
            ...this.data,
            ...(
                !!merge && merge
            )
        })
    }
}

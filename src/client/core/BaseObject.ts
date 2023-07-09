export class BaseObject {
    protected data: Record<string, any> = {}

    add(key: string, value: any) {
        this.data[key] = value
    }

    get(key: string, df: any = undefined) {
        if (this.data.hasOwnProperty(key)) {
            return this.data[key]
        }

        return df
    }

    all() {
        return this.data
    }
}

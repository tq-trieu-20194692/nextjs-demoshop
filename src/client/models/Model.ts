export class Model {
    raw: Record<string, any>

    constructor(data: Record<string, any>) {
        this.raw = data
    }

    toObject = (merge?: Record<string, any>) => {
        const instance = Object(this)
        const keys = Object.keys(this)

        let data: Record<string, any> = {};

        for (const key of keys) {
            if (key == 'raw') {
                continue
            }

            if (instance.hasOwnProperty(key) && !(instance[key] instanceof Function)) {
                if (instance[key] instanceof Model) {
                    data[key] = instance[key].toObject()
                } else {
                    data[key] = instance[key]
                }
            }
        }

        if (merge) {
            data = {...data, ...merge}
        }

        return data
    }

    toJson = (merge?: Record<string, any>) => {
        const obj = this.toObject(merge)

        if (obj && Object.keys(obj).length > 0) {
            return JSON.stringify(this.toObject(merge))
        }

        return ''
    }
}

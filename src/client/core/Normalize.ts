import {camelCase, snakeCase} from "lodash";

export class Normalize {
    static initJsonObject<T>(json: Record<string, any>, key: string | string[], fn?: (obj: Record<string, any>) => T): T | undefined {
        if (!json || Object.keys(json).length == 0) {
            return undefined
        }

        const _key = this._key(json, key)

        if (_key === undefined) {
            return undefined
        }

        return json[_key] instanceof Object && Object.keys(json[_key]).length > 0
            ? fn === undefined
                ? json[_key]
                : fn(json[_key])
            : undefined
    }

    static initJsonArray<T>(json: Record<string, any>, key: string | string[], fn?: (arr: any[]) => T): T | undefined {
        if (!json || Object.keys(json).length == 0) {
            return undefined
        }

        const _key = this._key(json, key)

        if (_key === undefined) {
            return undefined
        }

        return json[_key] instanceof Array && json[_key].length > 0
            ? fn === undefined
                ? json[_key]
                : fn(json[_key])
            : undefined
    }

    static initJsonString(json: Record<string, any>, key: string | string[], fn?: Function): string | undefined {
        if (!json || Object.keys(json).length == 0) {
            return undefined;
        }

        const _key = this._key(json, key)

        if (_key === undefined) {
            return undefined
        }

        return (typeof json[_key] === "string" || typeof json[_key] === "number") && json[_key].toString().length > 0
            ? fn === undefined
                ? typeof json[_key] === "number"
                    ? json[_key].toString()
                    : json[_key]
                : fn(json[_key])
            : undefined
    }

    static initJsonNumber(json: Record<string, any>, key: string | string[], fn?: Function): number | undefined {
        if (!json || Object.keys(json).length == 0) {
            return undefined;
        }

        const _key = this._key(json, key)

        if (_key === undefined) {
            return undefined
        }

        return (typeof json[_key] === "string" || typeof json[_key] === "number") && json[_key].toString().length > 0
            ? fn === undefined
                ? typeof json[_key] === "string"
                    ? json[_key].indexOf('.') !== -1 ? parseFloat(json[_key]) : parseInt(json[_key])
                    : json[_key]
                : fn(json[_key])
            : undefined
    }

    static initJsonBool(json: Record<string, any>, key: string | string[], fn?: Function): boolean | undefined {
        if (!json || Object.keys(json).length == 0) {
            return undefined;
        }

        const _key = this._key(json, key)

        if (_key === undefined) {
            return undefined
        }

        return (typeof json[_key] === "string" || typeof json[_key] === "number" || typeof json[_key] === "boolean") && json[_key].toString().length > 0
            ? fn === undefined
                ? typeof json[_key] === "string"
                    ? json[_key] === '1'
                    : typeof json[_key] === "number"
                        ? json[_key] === 1
                        : json[_key]
                : fn(json[_key])
            : undefined
    }

    protected static _key(json: Record<string, any>, key: string | string[]) {
        if (typeof key === "string") {
            if (key.indexOf('_') === 0) {
                return key
            } else if (json.hasOwnProperty(key)) {
                return key
            }

            const _key1 = snakeCase(key)

            if (json.hasOwnProperty(_key1)) {
                return _key1
            }

            const _key2 = camelCase(key)

            if (json.hasOwnProperty(_key2)) {
                return _key2
            }
        }

        if (key instanceof Array) {
            for (const item of key) {
                if (json.hasOwnProperty(item)) {
                    return item
                }
            }
        }

        return undefined
    }
}

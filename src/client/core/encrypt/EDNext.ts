import {AES, enc} from "crypto-js";
import {Utils} from "./Utils";

export class EDNext {
    protected static key() {
        const _df = 'SHk6eY8pIyILzLw8QGM3xJtguCQtqim9'
        const _key = process.env.NEXT_PRIVATE_KEY ?? _df

        if (_key.length == 32) {
            return _key
        }

        const chunk = _key.match(/.{1,5}/g)

        if (!chunk) {
            return _df
        }

        const str = ['s', 'i', '0', 'i', 'e', '8']

        return chunk?.map((value, index) => value + str[index]).join('')
    }

    protected static iv() {
        return process.env.NEXT_PRIVATE_IV ?? '44e9d4e4fef327032e20b633acf3eeb8'
    }

    public static encrypt(value: any): string {
        if (typeof value === "object") {
            value = JSON.stringify(value)
        }

        const encrypted = AES.encrypt(value, enc.Utf8.parse(this.key()), {
            iv: enc.Hex.parse(this.iv())
        })

        return encrypted.toString()
    }

    public static decrypt(value: any): any {
        let data

        try {
            const decrypted = AES.decrypt(value, enc.Utf8.parse(this.key()), {
                iv: enc.Hex.parse(this.iv())
            })

            data = JSON.parse(decrypted.toString(enc.Utf8));
        } catch (_) {
            data = undefined
        }

        return data
    }

    public static setData(value: any) {
        let data

        try {
            const enc = this.encrypt(value)

            if (enc) {
                data = Utils.base64Encode(enc)
            }
        } catch (e) {
            console.error(e)
        }

        return data
    }

    public static getData(value: any) {
        let data

        try {
            value = Utils.base64Decode(value)

            if (value) {
                data = this.decrypt(value)
            }
        } catch (e) {
            console.error(e)
        }

        return data
    }
}

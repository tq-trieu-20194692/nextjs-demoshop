import {AES, enc} from "crypto-js";
import {Utils} from "./Utils";
import {EnvSingleton} from "../../config/EnvSingleton";

export class EDFile {
    protected static envSingleton = EnvSingleton.getInstance()

    protected static key() {
        return this.envSingleton.get('NEXT_ED_FILE_SECRET', '13245678913245678913245678913245')
    }

    protected static iv() {
        return this.envSingleton.get('NEXT_ED_FILE_IV', '13245678913245678913245678913245')
    }

    public static encrypt(value: any, key?: string): string {
        if (typeof value === "object") {
            value = JSON.stringify(value);
        }

        const encrypted = AES.encrypt(value, enc.Utf8.parse(key ?? this.key()), {
            iv: enc.Hex.parse(this.iv())
        })

        return encrypted.toString()

        // let data = encrypted.toString();
        //
        // if (data.indexOf('/') === 0) {
        //     data = '!' + data.substring(1, data.length)
        // }
        //
        // return data;
    }

    public static decrypt(value: any, key?: string): any {
        // if (value.indexOf('!') === 0) {
        //     value = '/' + value.substring(1, value.length)
        // }

        const decrypted = AES.decrypt(value, enc.Utf8.parse(key ?? this.key()), {
            iv: enc.Hex.parse(this.iv())
        })

        let data;

        try {
            data = JSON.parse(decrypted.toString(enc.Utf8));
        } catch (_) {
            data = undefined
        }

        return data;
    }

    public static setLinkUrl(value: any) {
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

    public static getLinkData(value: any) {
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

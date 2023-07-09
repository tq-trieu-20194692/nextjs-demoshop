import {CryptoJSAesJson, T_EDOpts} from "./CryptoJSAesJson";
import {Utils} from "../Utils";
import {EnvSingleton} from "../../config/EnvSingleton";

export class EDData {
    protected static envSingleton = EnvSingleton.getInstance()

    protected static opts(): T_EDOpts {
        return {
            secret: this.envSingleton.get('NEXT_ED_DATA_SECRET')
        }
    }

    public static encrypt(value: any) {
        const driver = new CryptoJSAesJson(this.opts())

        return driver.encrypt(value)
    }

    public static decrypt(value: string | object): any {
        if (typeof value == "object") {
            value = JSON.stringify(value)
        }

        const driver = new CryptoJSAesJson(this.opts())

        return driver.decrypt(value)
    }

    static getData(str: string) {
        try {
            const decode = Utils.base64Decode(str)

            if (decode) {
                return this.decrypt(decode);
            }
        } catch (e) {
            Utils.checkError(e);
        }

        return undefined
    }

    static setData(value: any) {
        try {
            const enc = this.encrypt(value)

            if (enc) {
                return Utils.base64Encode(enc)
            }
        } catch (e) {
            Utils.checkError(e);
        }

        return ''
    }
}

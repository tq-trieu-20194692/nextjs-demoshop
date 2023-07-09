import {CryptoJSAesJson, T_EDOpts} from "./CryptoJSAesJson";
import {Utils} from "../Utils";
import Cookies from "universal-cookie";
import {EnvSingleton} from "../../config/EnvSingleton";

export class EDLocal {
    protected static envSingleton = EnvSingleton.getInstance()

    protected static opts(): T_EDOpts {
        return {
            secret: this.envSingleton.get('NEXT_ED_LOCAL_SECRET')
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

    static setLocalStore(name: string, value: any): boolean {
        if (typeof window === 'undefined') {
            return false
        }

        try {
            const enc = this.encrypt(value)

            if (enc) {
                localStorage.setItem(name, Utils.base64Encode(enc));

                return true
            }
        } catch (e) {
            Utils.checkError(e);
        }

        return false
    }

    static getLocalStore(name: string) {
        if (typeof window === 'undefined') {
            return null;
        }

        try {
            const item = localStorage.getItem(name);

            if (item) {
                const decode = Utils.base64Decode(item)

                if (decode) {
                    return this.decrypt(decode);
                }
            }
        } catch (e) {
            Utils.checkError(e);
        }

        return null;
    }

    static removeLocalStore(name: string) {
        if (typeof window === 'undefined') {
            return;
        }

        localStorage.removeItem(name);
    }

    static setCookie(name: string, value: any, opts?: any) {
        try {
            const enc = this.encrypt(value)

            if (enc) {
                const cookies = new Cookies()
                cookies.set(name, Utils.base64Encode(enc), opts ?? {
                    secure: !Utils.isDev(),
                    // httpOnly: true
                })

                return true
            }
        } catch (e) {
            Utils.checkError(e)
        }

        return false
    }

    static getCookie(name: string, value?: string) {
        try {
            if (!value) {
                const cookies = new Cookies()
                value = cookies.get(name)
            }

            if (value) {
                const decode = Utils.base64Decode(value)

                if (decode) {
                    return this.decrypt(decode);
                }
            }
        } catch (e) {
            Utils.checkError(e);
        }

        return null;
    }

    static removeCookie(name: string) {
        const cookies = new Cookies()

        if (cookies.get(name)) {
            cookies.remove(name)
        }

        return true
    }
}

import {AES, enc, lib} from "crypto-js";

export type T_EDOpts = {
    secret?: string
}

type _T_Res = {
    c: string
    i: string,
    s: string
}

export class CryptoJSAesJson {
    protected secret: string

    constructor(opts: T_EDOpts) {
        this.secret = opts?.secret ?? '13245678913245678913245678913245'
    }

    protected JsonFormatter = {
        stringify: (cipherParams: lib.CipherParams) => {
            const j: any = {
                c: cipherParams.ciphertext.toString(enc.Base64)
            }

            if (cipherParams.iv) j.i = cipherParams.iv.toString()
            if (cipherParams.salt) j.s = cipherParams.salt.toString()

            return JSON.stringify(j).replace(/\s/g, '');
        },
        parse: (jsonStr: string) => {
            const j = JSON.parse(jsonStr)
            const cipherParams = lib.CipherParams.create({ciphertext: enc.Base64.parse(j.c)})

            if (j.i) cipherParams.iv = enc.Hex.parse(j.i)
            if (j.s) cipherParams.salt = enc.Hex.parse(j.s)

            return cipherParams
        }
    }

    encrypt(value: string | object, secret?: string): _T_Res {
        if (typeof value == "object") {
            value = JSON.stringify(value)
        }

        const encrypted = AES
            .encrypt(
                value,
                secret ?? this.secret, {
                    format: this.JsonFormatter
                }
            ).toString()

        return JSON.parse(encrypted)
    }

    decrypt(json: string, secret?: string) {
        const decrypted = AES
            .decrypt(
                json,
                secret ?? this.secret,
                {
                    format: this.JsonFormatter
                }
            )
            .toString(enc.Utf8)

        try {
            return JSON.parse(decrypted)
        } catch (e) {
            return decrypted
        }
    }
}

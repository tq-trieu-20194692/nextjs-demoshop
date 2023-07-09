export class Utils {
    static base64Encode(str: string | object) {
        if (typeof str == "object") {
            str = JSON.stringify(str)
        }

        return Buffer.from(str).toString('base64')
    }

    static base64Decode(str: string) {
        return Buffer.from(str, 'base64').toString('ascii')
    }
}

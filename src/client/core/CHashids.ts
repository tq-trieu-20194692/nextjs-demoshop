import Hashids from 'hashids';
import {EnvSingleton} from "../config/EnvSingleton";

type _T_Connect = {
    salt: string
    length: number
}

type NumberLike = number

type _T_Config = {
    df: keyof _T_Config['connections']
    connections: {
        [key: string]: _T_Connect
    }
}

export class CHashids {
    protected static envSingleton = EnvSingleton.getInstance()

    protected static config(): _T_Config {
        return {
            df: "main",

            connections: {
                main: {
                    salt: this.envSingleton.get('NEXT_HASHIDS_MAIN_SALT', "132456"),
                    length: Number(this.envSingleton.get('NEXT_HASHIDS_MAIN_LENGTH', 10))
                },
                cache: {
                    salt: this.envSingleton.get('NEXT_HASHIDS_CACHE_SALT', "132456"),
                    length: Number(this.envSingleton.get('NEXT_HASHIDS_CACHE_LENGTH', 10))
                }
            }
        }
    }

    protected static connect: _T_Connect;

    static init() {
        if (!this.connect) {
            const {df, connections} = this.config()

            this.connect = connections[df]
        }
    }

    static connection(name: keyof _T_Config['connections']) {
        const {df, connections} = this.config()

        if (connections.hasOwnProperty(name)) {
            this.connect = connections[name]
        } else {
            this.connect = connections[df]
        }

        return this;
    }

    static encode(number: any): string {
        if (!this.connect) {
            this.init()
        }

        const hashids = new Hashids(this.connect.salt, this.connect.length);

        return hashids.encode(number);
    }

    static decode(id: string): NumberLike[] {
        if (!this.connect) {
            this.init()
        }

        const hashids = new Hashids(this.connect.salt, this.connect.length);

        return hashids.decode(id) as NumberLike[];
    }

    static decodeGetFirst(id: string): number | null {
        if (!this.connect) {
            this.init()
        }

        const hashids = new Hashids(this.connect.salt, this.connect.length);
        const result = hashids.decode(id);

        return result.length > 0 ? result[0] as number : null;
    }

    static encodeHex(value: string | bigint): string {
        if (!this.connect) {
            this.init()
        }

        const hashids = new Hashids(this.connect.salt, this.connect.length);

        return hashids.encodeHex(value);
    }

    static decodeHex(id: string): string {
        if (!this.connect) {
            this.init()
        }

        const hashids = new Hashids(this.connect.salt, this.connect.length);

        return hashids.decodeHex(id);
    }
}

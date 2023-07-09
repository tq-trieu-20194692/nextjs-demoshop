import {BaseObject} from "../core/BaseObject";

export class EnvSingleton extends BaseObject {
    private static instance: EnvSingleton;

    public static getInstance(): EnvSingleton {
        if (!EnvSingleton.instance) {
            EnvSingleton.instance = new EnvSingleton();
        }

        return EnvSingleton.instance;
    }

    get(key: string, df: any = undefined) {
        if (process.env[key]) {
            return process.env[key]
        }

        return super.get(key, df)
    }
}

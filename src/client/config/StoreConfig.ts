import {injectable} from "inversify";
import {AccessTokenModel} from "../models/UserModel";
import {container} from "./InversifyConfig";

@injectable()
export class StoreConfig {
    public static getInstance(): StoreConfig {
        return container.get(StoreConfig)
    }

    accessToken?: AccessTokenModel
    token?: string
}

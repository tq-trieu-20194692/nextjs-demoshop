import {App} from "../const/App";
import moment from "moment";
import {Normalize} from "../core/Normalize";
import {Model} from "./Model";

export type T_LoginVO = {
    username: string
    password: string
}

// export type T_MeInfoV0 = {
//     name?: string
//     email?: string
//     telephone?: string
//     address?: string
// }

// export type T_MePasswordVO = {
//     password: string
//     current: string
// }

// export type T_MeImageV0 = {
//     image: File
//     type: string
// }

export class UserModel extends Model {
    id?: number
    name?: string
    username?: string
    email?: string
    image?: string
    isOwner?: boolean

    accessToken?: AccessTokenModel

    constructor(data: Record<string, any>) {
        super(data)

        this.id = Normalize.initJsonNumber(data, 'id')
        this.name = Normalize.initJsonString(data, 'name')
        this.username = Normalize.initJsonString(data, 'username')
        this.email = Normalize.initJsonString(data, 'email')
        this.image = Normalize.initJsonString(data, 'image')
        this.isOwner = Normalize.initJsonBool(data, 'is_owner')

        this.accessToken = Normalize.initJsonObject(data, 'access_token', v => new AccessTokenModel(v))
    }
}

export class AccessTokenModel extends Model {
    token?: string
    abilities?: string[]
    expiresAt?: string
    updatedAt?: string
    createdAt?: string

    expiresAtFormatted = (format: string = App.FormatToMoment): string => moment(this.expiresAt, App.FormatISOFromMoment).format(format)
    updatedAtFormatted = (format: string = App.FormatToMoment): string => moment(this.updatedAt, App.FormatISOFromMoment).format(format)
    createdAtFormatted = (format: string = App.FormatToMoment): string => moment(this.createdAt, App.FormatISOFromMoment).format(format)

    constructor(data: Record<string, any>) {
        super(data)

        this.token = Normalize.initJsonString(data, 'token')
        this.abilities = Normalize.initJsonArray(data, 'abilities')
        this.expiresAt = Normalize.initJsonString(data, 'expires_at')
        this.updatedAt = Normalize.initJsonString(data, 'updated_at')
        this.createdAt = Normalize.initJsonString(data, 'created_at')
    }
}

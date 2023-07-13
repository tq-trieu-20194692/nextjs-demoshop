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
    userId : string
    userGroupId?: string
    username: string
    status?: string
    createAt?: string
    updateAt?: string
    apiToken?: string

    constructor(data: Record<string, any>) {
        super(data)

        this.username = Normalize.initJsonString(data, 'username') || ""
        this.userId = Normalize.initJsonString(data, 'user_id') || ""
        this.userGroupId = Normalize.initJsonString(data, 'user_group_id')
        this.status = Normalize.initJsonString(data, 'status')
        this.createAt = Normalize.initJsonString(data, 'creat_at')
        this.updateAt = Normalize.initJsonString(data, 'update_at')
        this.apiToken = Normalize.initJsonString(data, 'api_token')
    }
}

export class AccessTokenModel extends Model {
    abilities?: string[]
    expiresAt?: string
    updatedAt?: string
    createdAt?: string

    expiresAtFormatted = (format: string = App.FormatToMoment): string => moment(this.expiresAt, App.FormatISOFromMoment).format(format)
    updatedAtFormatted = (format: string = App.FormatToMoment): string => moment(this.updatedAt, App.FormatISOFromMoment).format(format)
    createdAtFormatted = (format: string = App.FormatToMoment): string => moment(this.createdAt, App.FormatISOFromMoment).format(format)

    constructor(data: Record<string, any>) {
        super(data)

        this.abilities = Normalize.initJsonArray(data, 'abilities')
        this.expiresAt = Normalize.initJsonString(data, 'expires_at')
        this.updatedAt = Normalize.initJsonString(data, 'updated_at')
        this.createdAt = Normalize.initJsonString(data, 'created_at')
    }
}

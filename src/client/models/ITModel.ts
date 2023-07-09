import {UserModel} from "./UserModel";
import {Normalize} from "../core/Normalize";

export enum E_Required {
    Optional, // Không bắt buộc => không hiển thị gì cả
    Notify, // Hiển thị thông báo và cho phép tắt
    Obligatory// Hiển thị trang mới bắt buộc phải nâng cấp mới dùng tiếp được
}

class UpdateModel {
    version: string
    required: E_Required
    title: string
    message?: string
    link?: string

    constructor(data: Record<string, any>) {
        this.version = Normalize.initJsonString(data, 'version') ?? ""
        this.required = Normalize.initJsonNumber(data, 'required') ?? E_Required.Optional
        this.title = Normalize.initJsonString(data, 'title') ?? ""
        this.message = Normalize.initJsonString(data, 'message')
        this.link = Normalize.initJsonString(data, 'link')
    }
}

class MaintenanceModel {
    status: boolean
    message: string

    constructor(data: Record<string, any>) {
        this.status = Normalize.initJsonBool(data, 'status') ?? false
        this.message = Normalize.initJsonString(data, 'message') ?? ""
    }
}

export class InitModel {
    user?: UserModel
    update?: UpdateModel
    maintenance?: MaintenanceModel

    constructor(data: Record<string, any>) {
        this.user = Normalize.initJsonObject(data, 'user', (obj) => new UserModel(obj))
        this.update = Normalize.initJsonObject(data, 'update', (obj) => new UpdateModel(obj))
        this.maintenance = Normalize.initJsonObject(data, 'maintenance', (obj) => new MaintenanceModel(obj))
    }
}

export class TrackingModel extends InitModel {
    constructor(data: Record<string, any>) {
        super(data);
    }
}

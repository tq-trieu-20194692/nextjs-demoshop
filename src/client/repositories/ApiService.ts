import {AxiosClient} from "./AxiosClient";
import {ApiResModel} from "../models/ApiResModel";
import {injectable} from "inversify";
import {T_LoginVO} from "../models/UserModel";
import {App} from "../const/App"
@injectable()
export class ApiService {
    init(): Promise<ApiResModel> {
        return AxiosClient.get("init-web")
    }

    tracking(): Promise<ApiResModel> {
        return AxiosClient.get("tracking-web")
    }

    login(data: T_LoginVO): Promise<ApiResModel> {
        return AxiosClient.post(`${App.ApiUrlTest}/admin.php?route=auth/login`, data);
    }

    logout(): Promise<ApiResModel> {
        return AxiosClient.post("account/logout");
    }

    getMe(): Promise<ApiResModel> {
        return AxiosClient.get("account/me")
    }
}

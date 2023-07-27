import {AxiosClient} from "./AxiosClient";
import {ApiResModel} from "../models/ApiResModel";
import {injectable} from "inversify";
import {T_LoginVO} from "../models/UserModel";
import {App} from "../const/App"
import {T_ProductFQ} from "../models/ProductModel";
import {AxiosClientTest} from "./AxiosClientTest";
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

    product = {
        getProduct(query?: T_ProductFQ): Promise<ApiResModel> {
            return AxiosClientTest.get("admin.php", query)
        }
    }
    color = {
        getColor(query?: T_ColorFQ): Promise<ApiResModel> {
            return AxiosClientTest.get("admin.php", query)
        }
    }

}

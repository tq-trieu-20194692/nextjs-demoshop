import {UserModel} from "./UserModel";

export type SessionModel = {
    isAuthenticated?: boolean
    redirectPath: string
    user?: UserModel
}

export const initialSession: SessionModel = {
    redirectPath: ''
}

import {GetServerSideProps, NextPage} from "next";
import App from "../client/presentation/App";
import moment from "moment";
import {StoreConfig} from "../client/config/StoreConfig";
import Cookies from "universal-cookie";
import {E_CookieKey} from "../client/const/Events";
import {EDLocal} from "../client/core/encrypt/EDLocal";
import {AccessTokenModel} from "../client/models/UserModel";
import {EDNext} from "../client/core/encrypt/EDNext";

// type _T_ContextParams = {
//     all: string[]
// }

const AllPage: NextPage = (props: any) => {
    return <App {...props}/>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    context.res.statusCode = 200

    // const params = context.params as _T_ContextParams
    const storeConfig = StoreConfig.getInstance()
    const cookies = new Cookies(context.req.headers.cookie)

    const cookieUser = cookies.get(E_CookieKey.User)

    if (cookieUser) {
        const accessToken = EDLocal.getCookie(E_CookieKey.User, cookieUser)

        if (accessToken) {
            storeConfig.accessToken = new AccessTokenModel(accessToken)
        }
    }

    let more: any = {
        now: moment().unix()
    }

    const nextEnv = {}

    Object.entries(process.env).forEach(([key, value]) => {
        if (key.indexOf('NEXT_') === 0) {
            nextEnv[key] = value
        }
    })

    more = {
        ...more,
        env: nextEnv
    }

    let props: any = {
        more: EDNext.setData(more)
    }

    return {
        props: props
    }
}

export default AllPage

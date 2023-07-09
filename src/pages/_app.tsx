import '../styles/globals.scss'
import type {AppProps} from 'next/app'
import Head from "next/head";
import {RecoilRoot} from "recoil";
import {ConfigContextProvider} from "../client/presentation/contexts/ConfigContext";
import {Fragment, ReactNode, useEffect, useMemo, useState} from "react";
import {Provider as InversifyProvider} from "inversify-react";
import {container} from "../client/config/InversifyConfig";
import {BrowserRouter} from "react-router-dom";
import {App} from "../client/const/App";
import {T_NextAppData} from "../client/const/Types";
import {SessionContextProvider} from "../client/presentation/contexts/SessionContext";
import {InitTracking} from "../client/presentation/contexts/InitTracking";
import {EDNext} from "../client/core/encrypt/EDNext";
import {EnvSingleton} from "../client/config/EnvSingleton";

const MyApp = ({Component, pageProps}: AppProps) => {
    const [render, setRender] = useState<ReactNode>()
    const envSingleton = EnvSingleton.getInstance()

    useEffect(() => {
        const data: T_NextAppData = {}

        if (pageProps) {
            if (pageProps.hasOwnProperty('header')) {
                data.header = EDNext.getData(pageProps.header)
            }

            if (pageProps.hasOwnProperty('more')) {
                data.more = EDNext.getData(pageProps.more)
            }
        }

        if (data.more?.env) {
            Object.entries(data.more.env).forEach(([key, value]) => {
                process.env[key] = value
                envSingleton.add(key, value)
            })
        }

        const isInitTracking = envSingleton.get('NEXT_INIT_TRACKING') && (envSingleton.get('NEXT_INIT_TRACKING') == "true")

        setRender(
            <Fragment>
                <BrowserRouter>
                    <InversifyProvider container={container}>
                        <RecoilRoot>
                            <SessionContextProvider data={data}>
                                <ConfigContextProvider>
                                    {
                                        isInitTracking
                                            ? <InitTracking>
                                                <Component {...pageProps} />
                                            </InitTracking>
                                            : <Component {...pageProps} />
                                    }
                                </ConfigContextProvider>
                            </SessionContextProvider>
                        </RecoilRoot>
                    </InversifyProvider>
                </BrowserRouter>
            </Fragment>
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {
                useMemo(() => (
                    <Head>
                        <title>{pageProps.title ?? App.Title}</title>
                        <meta name="description" content="AutoTimelapse"/>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    </Head>
                ), [pageProps])
            }
            {render ?? null}
        </>
    )
}

export default MyApp

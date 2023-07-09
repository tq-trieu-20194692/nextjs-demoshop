import React, {createContext, useCallback, useContext, useEffect, useState} from "react";
import {ConfigProvider} from "antd";
import {initReactI18next} from "react-i18next";
import i18n from "i18next";
import {findIndex} from "lodash";
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import 'dayjs/locale/en-gb';
import 'dayjs/locale/zh-cn';
import moment from "moment";
import 'moment/locale/vi';
import 'moment/locale/en-gb';
import 'moment/locale/zh-cn';
import antViVN from 'antd/locale/vi_VN';
import antZhCN from 'antd/locale/zh_CN';
import antEnGB from 'antd/locale/en_GB';
import {ConfigModel, initialConfig} from "../../models/ConfigModel";
import {getLng, initLng, resources} from "../../locales/i18n";
import {App} from "../../const/App";
import {Color} from "../../const/Color";
import {Style} from "../../const/Style";
import {Locale} from "antd/es/locale";

export const ConfigContext = createContext<[ConfigModel, (config: ConfigModel) => void]>([initialConfig, () => {
    //
}])

export const useConfigContext = () => useContext(ConfigContext)

export const ConfigContextProvider = (props: any) => {
    const [configState, setConfigState] = useState(initialConfig)
    const defaultConfigContext: [ConfigModel, typeof setConfigState] = [configState, setConfigState]

    const [localeAnt, setLocaleAnt] = useState<Locale>()

    useEffect(() => {
        console.log('%cInit: ConfigContextProvider', Color.ConsoleInfo);

        const lng: string = initLng()

        i18n.use(initReactI18next).init({
            fallbackLng: 'vi',
            ns: ['translation'],
            defaultNS: 'translation',
            lng: lng,
            resources
        }).then(() => console.log(`Init i18n: ${lng}`))

        const lang = App.Lang[findIndex(App.Lang, (o) => o.code === getLng())]

        moment.locale(lang.moment)
        dayjs.locale(lang.dayjs)

        switch (lang.code) {
            case 'vi':
                setLocaleAnt({...antViVN})
                break
            case 'en':
                setLocaleAnt({...antEnGB})
                break
            case 'zh':
                setLocaleAnt({...antZhCN})
                break
        }

        return () => {
            console.log('%cUnmount: ConfigContextProvider', Color.ConsoleInfo)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        //Do not use condition (configState.lang) because it always returns false
        if (typeof configState.lang === "number") {
            const lang = App.Lang[configState.lang]

            moment.locale(lang.moment)
            dayjs.locale(lang.dayjs)

            switch (lang.code) {
                case 'vi':
                    setLocaleAnt({...antViVN})
                    break
                case 'en':
                    setLocaleAnt({...antEnGB})
                    break
                case 'zh':
                    setLocaleAnt({...antZhCN})
                    break
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [configState.lang])

    const getView = useCallback(() => {
        if (localeAnt) {
            return (
                <ConfigProvider
                    locale={localeAnt}
                    theme={Style.AntThemeConfig}
                >
                    {props.children}
                </ConfigProvider>
            )
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localeAnt])

    return (
        <ConfigContext.Provider value={defaultConfigContext}>
            {getView()}
        </ConfigContext.Provider>
    )
}

import flagVn from "../assets/flags/4x3/vn.svg";
import flagGbEn from "../assets/flags/4x3/gb-eng.svg";
import flagCn from "../assets/flags/4x3/cn.svg";

export class App {
    static readonly Version = '1.0.0'
    static readonly Title = "ATL Admin"
    static readonly Id = 1 // 1: web - 2: app
    static readonly Host = "autotimelapse.com"
    static readonly Company = "I&I HiTech"
    static readonly Domain = `https://${App.Host}/`
    static readonly AppUrl = `https://app.${App.Host}`
    static readonly HomeUrl = `https://manage.${App.Host}`
    static readonly ApiUrl = `https://dev-api-amc.${App.Host}/v1`
    static readonly UrlCdnSc = `https://cdn-sc.${App.Host}/files`
    static readonly UrlCdnGdt = `https://cdn-gdt.${App.Host}`
    static readonly UrlCdnGs = `https://cdn-gs.${App.Host}/v1`
    static readonly ApiUrlTest = 'http://222.252.10.203:30100'


    static readonly Lang = [
        {
            name: 'Tiếng Việt',
            code: 'vi',
            icon: flagVn,
            // ant: new Promise((resolve) => import('antd/lib/locale/vi_VN').then(e => resolve(e))),
            // @ts-ignore
            // moment: new Promise((resolve) => import('moment/locale/vi').then(resolve('vi'))),
            moment: 'vi',
            dayjs: 'vi'
        },
        {
            name: 'English',
            code: 'en',
            icon: flagGbEn,
            // ant: new Promise((resolve) => import('antd/lib/locale/en_GB').then(e => resolve(e))),
            // @ts-ignore
            // moment: new Promise((resolve) => import('moment/locale/en-gb').then(resolve('en-gb')))
            moment: 'en-gb',
            dayjs: 'en-gb'
        },
        {
            name: 'China',
            code: 'zh',
            icon: flagCn,
            // ant: new Promise((resolve) => import('antd/lib/locale/zh_CN').then(e => resolve(e))),
            // @ts-ignore
            // moment: new Promise((resolve) => import('moment/locale/zh-cn').then(resolve('zh-cn')))
            moment: 'zh-cn',
            dayjs: 'zh-cn'
        },
    ]

    static readonly TimeoutTracking: number = 10_000 * 5 // minute
    static readonly HoursStoreState: number = 24
    static readonly DelaySearch: number = 400
    static readonly TimeoutHideCopy: number = 4500
    static readonly FormatFromDate: string = "YYYY-MM-DD"
    static readonly FormatFromDateTime: string = "YYYY-MM-DD HH:mm:ss"
    static readonly FormatFromTime: string = "HH:mm:ss"
    static readonly FormatAtomFromMoment: string = "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
    static readonly FormatISOFromMoment: string = "YYYY-MM-DD[T]HH:mm:ss.SSSSSSZ"
    static readonly FormatToMoment: string = "DD-MM-YYYY HH:mm:ss"
    static readonly FormatToDate: string = "DD-MM-YYYY"
    static readonly FormatToTime: string = "HH:mm:ss"
    static readonly FormatTimeFull: string = "HH:mm:ss.SSS"
    static readonly FormatDateShort: string = "HH:mm DD/MM/YYYY"
    static readonly TimestampDb: string = "YYYY-MM-DD HH:mm:ss"
    static readonly VideoIntroSecond: number = 6
    static readonly VideoOutroSecond: number = 15
    static readonly RV_FPS: number = 30
    static readonly FTitle: string = "ATL - "
}

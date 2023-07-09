import i18n from 'i18next';
import tranVI from './vi/translation.json';
import tranEN from './en/translation.json';
import tranZH from './zh/translation.json';
import {EDLocal} from "../core/encrypt/EDLocal";
import {E_LSKey} from "../const/Events";

export const resources = {
    vi: {
        translation: tranVI
    },
    en: {
        translation: tranEN
    },
    zh: {
        translation: tranZH
    }
}

export function initLng(df = 'vi'): string {
    let lng = EDLocal.getLocalStore(E_LSKey.Lang);

    if (!lng) {
        lng = df;

        EDLocal.setLocalStore(E_LSKey.Lang, df)
    }

    return lng;
}

export function getLng(): string {
    return i18n.language;
}

type _TLangCode = 'vi' | 'en' | 'zh';

export function setLng(lang: _TLangCode): void {
    EDLocal.setLocalStore(E_LSKey.Lang, lang)

    i18n.changeLanguage(lang)
        .then(() => `Change language: ${lang}`);
}

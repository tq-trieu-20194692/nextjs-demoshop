import {Utils} from "../core/Utils";
import {v4 as uuid} from "uuid";

const createKey = (key: string) => {
    if (Utils.isDev()) {
        return `${key}-${uuid()}`
    }

    return key
}

// Init Tracking
export const KeyIT = createKey("it")

// Config
export const KeyTheme = createKey("theme")

// Account
export const KeyMe = createKey("me")
export const KeyProduct = createKey("product")

export const KeyColor = createKey("color")
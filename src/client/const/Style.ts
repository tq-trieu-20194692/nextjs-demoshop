import {ListGridType} from "antd/lib/list";
import {TMediaQueryOption} from "../core/MediaQuery";
import {CSSProperties} from "react";
import {ThemeConfig} from "antd/es/config-provider/context";

export class Style {
    static readonly AntThemeConfig: ThemeConfig = {
        token: {
            colorPrimary: '#009B90',
            colorWarning: '#F5C61D',
            colorError: '#EB5757',
            borderRadius: 2,
        }
    }

    static readonly GridOnlyOne: ListGridType = {
        gutter: 16,
        xs: 1,
        sm: 1,
        md: 1,
        lg: 1,
        xl: 1,
        xxl: 1,
    }

    static readonly GridTypeMain: ListGridType = {
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 3,
        xxl: 4,
    }

    static readonly GridTypeHome: ListGridType = {
        // @ts-ignore
        gutter: [16 * 4, 16],
        column: 1,
        xs: 1,
        sm: 3,
        md: 4,
        lg: 4,
        xl: 4,
        xxl: 4,
    }

    static readonly GridLimit: TMediaQueryOption = {
        xs: 6,
        sm: 6,
        md: 12,
        lg: 12,
        xl: 12,
        xxl: 12,
        xxxl: 12,
    }

    static readonly GridLoadingAnimation: TMediaQueryOption = {
        xs: 1,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 3,
        xxl: 4,
        xxxl: 4,
    }

    static readonly Grid2dShareItemModal: TMediaQueryOption = {
        xs: 1,
        sm: 1,
        md: 1,
        lg: 2,
        xl: 2,
        xxl: 4,
        xxxl: 4,
    }

    static readonly GridLimitBlog: TMediaQueryOption = {
        xs: 4,
        sm: 4,
        md: 6,
        lg: 8,
        xl: 8,
        xxl: 8,
    }

    static readonly GridTypeBlog: ListGridType = {
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 4,
        xxl: 4,
    }

    static readonly GridTypeBlogPost: ListGridType = {
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 4,
    }

    static readonly FlexRadioOption: CSSProperties = {
        flexGrow: 1,
        textAlign: 'center',
        fontSize: '0.85rem'
    }
}

interface Navigator {
    msSaveBlob?: (blob: any, defaultName?: string) => boolean;
    xr?: any;
    userAgentData?: {
        brands: any[],
        mobile: boolean,
        platform: string,
    }
}

declare module '*.svg' {
    import React from 'react'

    const Component: React.FunctionComponent<React.SVGProps<SVGSVGElement>>

    export default Component
}

declare module '*.mp3';

declare interface String {
    ucwords(): string;
}

declare interface Number {
    format(n?: number, x?: number): string;
}

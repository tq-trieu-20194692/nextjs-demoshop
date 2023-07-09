export type TMediaQueryOption = {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    xxl?: number
    xxxl?: number
}

type  TBreakPoint = "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";

export class MediaQuery {
    protected breakpoint: TMediaQueryOption | any;
    /**
     * @see https://github.com/twbs/bootstrap/blob/1e5e65567049cc5a7521530fbc1149f8c35b96f9/scss/_variables.scss#L467
     */
    protected readonly GRID_BREAKPOINTS: any = {
        xs: 0, // `xs` returns only a ruleset and no media query
        sm: 576, // `sm` applies to x-small devices (portrait phones, less than 576px)
        md: 768, // `md` applies to small devices (landscape phones, less than 768px)
        lg: 992, // `lg` applies to medium devices (tablets, less than 992px)
        xl: 1200, // `xl` applies to large devices (desktops, less than 1200px)
        xxl: 1400,// `xxl` applies to x-large devices (large desktops, less than 1400px)
        xxxl: 1700,
    }

    constructor(breakpoint?: TMediaQueryOption | any) {
        this.breakpoint = breakpoint;
    }

    getPoint = (df: number | null = null) => {
        const arr = Object.keys(this.breakpoint);
        arr.reverse();
        let key: any = null;

        for (let i = 0; i < arr.length; i++) {
            if (window.matchMedia(this.getMediaBreakpointOnly(arr[i])).matches) {
                key = arr[i];
                break;
            }
        }

        return (key !== null && this.breakpoint.hasOwnProperty(key)) ? this.breakpoint[key] : df;
    }

    getPointOnUp = (df: number | null = null) => {
        const arr = Object.keys(this.breakpoint);
        arr.reverse();
        let key: any = null;

        for (let i = 0; i < arr.length; i++) {
            if (window.matchMedia(this.getMediaBreakpointUp(arr[i])).matches) {
                key = arr[i];
                break;
            }
        }

        return (key !== null && this.breakpoint.hasOwnProperty(key)) ? this.breakpoint[key] : df;
    }

    getBreakpointMin = (name: string): number | null => {
        if (!this.GRID_BREAKPOINTS.hasOwnProperty(name)) {
            return null;
        }

        const min = this.GRID_BREAKPOINTS[name];

        return min !== 0 ? min : null;
    }

    getBreakpointMax = (name: string): number | null => {
        if (!this.GRID_BREAKPOINTS.hasOwnProperty(name)) {
            return null;
        }

        const max = this.GRID_BREAKPOINTS[name];

        return max && max > 0 ? max - 0.02 : null
    }

    getBreakpointNext = (name: string): string | null => {
        const breakpointNames = Object.keys(this.GRID_BREAKPOINTS);
        const n = breakpointNames.findIndex(value => value === name);

        return n < breakpointNames.length ? breakpointNames[n + 1] : null
    }

    getMediaBreakpointUp = (name: string): string => {
        const min = this.getBreakpointMin(name);

        return min !== null ? `(min-width: ${min}px)` : '';
    }

    getMediaBreakpointDown = (name: string): string => {
        const max = this.getBreakpointMax(name);

        return max !== null ? `(max-width: ${max}px)` : '';
    }

    getMediaBreakpointOnly = (name: string): string => {
        const min = this.getBreakpointMin(name);
        const next = this.getBreakpointNext(name);
        const max = this.getBreakpointMax(next!);

        let media = '';

        if (min !== null && max !== null) {
            media = `(min-width: ${min}px) and (max-width: ${max}px)`;
        } else if (max === null) {
            media = this.getMediaBreakpointUp(name);
        } else if (min === null) {
            media = this.getMediaBreakpointDown(name);
        }

        return media;
    }

    isMinBreakpoint(point: TBreakPoint): boolean {
        return window.matchMedia(this.getMediaBreakpointUp(point)).matches;
    }
}

import { AxisDomain } from 'recharts'
export type CH_TYPES = {
    upperair: any,
    skewt: any,
    surface: any,
}

export type CHART_CONFIG = {
    [key: string]: {
        title: string,
        keys: Array<string>,
        axes: Array<{ type: any, dataKey?: any, style?: object, domain?: [AxisDomain, AxisDomain] }>
    }
}


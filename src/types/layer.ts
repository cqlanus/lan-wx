export type Layer = {
    name: string,
    arcgisId?: string, 
    id: string,
    max: number,
    interval: number,
    start: number,
}

export type LayerOptions = {
    url: string,
    layers: Array<Layer>,
    name: string,
    service: string,
    id: string,
    forecast: boolean
}

export type LAYER_MAPPING = {
    [key: string]: LayerOptions
}

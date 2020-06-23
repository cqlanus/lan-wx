export type Layer = {
    name: string,
    arcgisId?: string, 
    id: string
}

export type LayerOptions = {
    url: string,
    layers: Array<Layer>,
    name: string,
    service: string,
    id: string
}

export type LAYER_MAPPING = {
    [key: string]: LayerOptions
}

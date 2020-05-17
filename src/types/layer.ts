export type Layer = {
    name: string,
    id: string
}

export type LayerOptions = {
    url: string,
    layers: Array<Layer>,
    name: string,
    id: string
}

export type LAYER_MAPPING = {
    [key: string]: LayerOptions
}

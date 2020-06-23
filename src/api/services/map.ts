import qs from 'query-string'
import LAYERS from '../../data/layers'

export default class MapService {
    LEGEND_BASE = 'https://nowcoast.noaa.gov/LayerInfo'

    selectLayerUrl = ({ layerTypeId, layerId, time }: any): string => {
        const layer = LAYERS[layerTypeId]
        if (!layer) { return '' }
        const foundLayer = layer.layers.find(({ id: layId }) => layId === layerId)
        if (!foundLayer) { return '' }
        const queryParams = {
            request: 'GetMap',
            layers: foundLayer.id,
            format: 'png',
            transparent: 'true',
            crs: 'EPSG:3857',
            version: '1.3.0',
            width: '256',
            height: '256',
            styles: '',
            time,
            bbox: '{bbox-epsg-3857}',
        }
        const queryString = qs.stringify(queryParams)
        const url = `${layer.url}?${queryString}`
        return decodeURI(url)
    }

    buildLegendUrl = async ({ layerTypeId, layerId }: any) => {
        const layer = LAYERS[layerTypeId]
        if (!layer) { return '' }
        const foundLayer = layer.layers.find(({ id: layId }) => layId === layerId)
        if (!foundLayer) { return '' }
        const queryParams = {
            request: 'legend',
            service: layer.service,
            layers: foundLayer.arcgisId,
            format: 'json',
        }
        const queryString = qs.stringify(queryParams)
        const url = `${this.LEGEND_BASE}?${queryString}`
        const resp = await fetch(url)
        const data = await resp.json()
        console.log({ data })
        return data[0]
    }
}

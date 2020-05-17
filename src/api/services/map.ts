import qs from 'query-string'
import LAYERS from '../../data/layers'

export default class MapService {
    selectLayerUrl = ({ layerTypeId, layerId }: any): string => {
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
            bbox: '{bbox-epsg-3857}',
        }
        const queryString = qs.stringify(queryParams)
        const url = `${layer.url}?${queryString}`
        return decodeURI(url)
    }
}

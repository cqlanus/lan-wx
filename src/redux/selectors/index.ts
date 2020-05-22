import { RootState } from '../store'
import LAYERS from '../../data/layers'

export const selectLayerUrl = (state: RootState) => state.map.layerUrl
export const selectCoords = ( state: RootState ) => state.location.coords
export const selectCurrentWeather = (state: RootState) => state.weather.current

export const selectAllLayers = () => Object.values(LAYERS).reduce((fullList: Array<any>, layerType: any) => {
    const nextListChunk = layerType.layers.map(({ id, name }: any) => ({ layerTypeId: layerType.id, layerId: id, key: `${layerType.id}_${id}`, name: `${layerType.name}: ${name}` }))
    return [...fullList, ...nextListChunk ]
}, [])

import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLayer } from '../redux/slice/map'
import { selectAllLayers, selectMapData } from '../redux/selectors'
import Select from './Select'

type LayerListItem = { layerTypeId: string, layerId: string, key: string, name: string }
const LayerDropdown = () => {
    const dispatch = useDispatch()
    const { layerId, layerTypeId } = useSelector(selectMapData)
    const handleSelect = (e: any) => {
        const { value } = e.target
        const [ layerTypeId, layerId ] = value.split('_')
        dispatch(getLayer({ layerTypeId, layerId }))
    }
    const layers: Array<LayerListItem> = useMemo(selectAllLayers, [])
    const value = `${layerTypeId}_${layerId}`
    return (
        <Select id="" name="" value={value} onChange={handleSelect}>
            {layers.map((l: any) => (
                <option key={l.key} value={l.key} >{l.name}</option>
            ))}
        </Select>
    )
}

export default LayerDropdown

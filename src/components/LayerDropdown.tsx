import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { getLayer } from '../redux/slice/map'
import { selectAllLayers } from '../redux/selectors'

type LayerListItem = { layerTypeId: string, layerId: string, key: string, name: string }
const LayerDropdown = () => {
    const dispatch = useDispatch()
    const handleSelect = (e: any) => {
        const { value } = e.target
        const { layerTypeId, layerId } = JSON.parse(value)
        dispatch(getLayer({ layerTypeId, layerId }))
    }
    const layers: Array<LayerListItem> = useMemo(selectAllLayers, [])
    return (
        <select id="" name="" onChange={handleSelect}>
            { layers.map((l: any) => (
                <option key={l.key} value={JSON.stringify(l)} >{l.name}</option>
            )) }
        </select>
    )
}

export default LayerDropdown

import React, { useMemo, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { getLayer, setLayerId, setLayerType } from '../redux/slice/map'
import { selectLayerTypes, selectLayerIds, selectMapData } from '../redux/selectors'
import Select from './Select'

import type { Layer } from '../types/layer'

const Container = styled.div`
    display: flex;
    justify-content: space-around;
`

const Info = styled.div`
    font-size: 0.7rem;
    font-weight: bold;
`

const Flex = styled.div`
    flex: 1;
`

type LayerType = {
    id: string,
    name: string
}

const LayerDropdown = () => {
    const dispatch = useDispatch()
    const { layerId, layerTypeId } = useSelector(selectMapData)
    useEffect(() => {
        if (layerTypeId && layerId) {
            dispatch(getLayer({ layerTypeId, layerId }))
        }
    }, [layerTypeId, layerId, dispatch])

    const handleType = (e: any) => {
        const { value } = e.target
        dispatch(setLayerType(value))
    }
    const handleLayer = (e: any) => {
        const { value } = e.target
        dispatch(setLayerId(value))
    }
    const layerTypes: LayerType[] = useMemo(selectLayerTypes, [])
    const layerIds: Layer[] = useSelector(selectLayerIds)
    return (
        <Container>
            <Flex>
                <Info> {'Layer Type'} </Info>
                <Select value={layerTypeId} onChange={handleType}>
                    {layerTypes.map((l) => (
                        <option key={l.id} value={l.id} >{l.name}</option>
                    ))}
                </Select>    
            </Flex>
            <Flex>
                <Info> {'Layer'} </Info>
                <Select value={layerId} onChange={handleLayer}>
                    {layerIds.map((l) => (
                        <option key={l.id} value={l.id} >{l.name}</option>
                    ))}
                </Select>    
            </Flex>
            
        </Container>

    )
}

export default LayerDropdown

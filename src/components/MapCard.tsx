import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Layer, Source } from 'react-mapbox-gl'

import MapBox from './Map'
import LayerDropdown from './LayerDropdown'
import { getCurrentLocation } from '../redux/slice/location'
import { selectCoords, selectLayerUrl } from '../redux/selectors'

const Container = styled.div`
    background-color: white;
    border: 1px solid rgba(0,0,0,0.2);
    height: 100vh;
    min-height: 300px;
`

const MapCard = () => {
    const dispatch = useDispatch()
    const coords = useSelector(selectCoords)
    const layerUrl = useSelector(selectLayerUrl)

    useEffect(() => {
        dispatch(getCurrentLocation())

    }, [dispatch])
    const defaultStyle = "mapbox://styles/mapbox/streets-v11"
    const RASTER_SOURCE_OPTIONS = {
        "type": "raster",
        "tiles": [
            layerUrl,
        ],
        "tileSize": 512
    }
    const renderMap = () => {
        if (coords) {
            const { latitude = 41, longitude = -87 } = coords
            return (
                // eslint-disable-next-line
                <MapBox center={[longitude, latitude]} style={defaultStyle} containerStyle={{ height: '100%', width: '100%' }} >
                    <Source id="source_id" tileJsonSource={RASTER_SOURCE_OPTIONS} />
                    <Layer type="raster" id="layer_id" sourceId="source_id" />
                </MapBox>
            )
        }
    }

    return (
        <Container>
            <LayerDropdown/>
            {renderMap()}
        </Container>
    )
}

export default MapCard

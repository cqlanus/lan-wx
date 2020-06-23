/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Layer, Source, ZoomControl, ScaleControl } from 'react-mapbox-gl'

import MapBox from './Map'
import Card from './Card'
import LayerDropdown from './LayerDropdown'
import { selectCoords, selectLayerUrl, selectLegendUrl } from '../redux/selectors'

const Container = styled(Card)`
    background-color: white;
`

const MapCard = () => {
    const initialZoom: [number] = [7]
    const [zoom] = useState(initialZoom)
    const initialCenter: any = undefined
    const [ center, setCenter ] = useState(initialCenter)
    const coords = useSelector(selectCoords)
    const layerUrl = useSelector(selectLayerUrl)
    const legendUrl = useSelector(selectLegendUrl)

    useEffect(() => {
        if (coords) {
            const { longitude, latitude } = coords
            setCenter([longitude, latitude])
        }
    }, [coords])
    
    const defaultStyle = "mapbox://styles/mapbox/light-v10"
    const RASTER_SOURCE_OPTIONS = {
        "type": "raster",
        "tiles": [
            layerUrl,
        ],
        "tileSize": 512
    }
    const renderMap = () => {
        if (center) {
            return (
                <MapBox
                    center={center}
                    style={defaultStyle}
                    containerStyle={{ height: '40vh', width: '100%' }}
                    zoom={zoom}
                >
                    <Source id="source_id" tileJsonSource={RASTER_SOURCE_OPTIONS} />
                    <Layer paint={{ 'raster-opacity': 0.7 }} type="raster" id="layer_id" sourceId="source_id" />
                    <ZoomControl />
                    <ScaleControl />
                </MapBox>
            )
        }
    }

    const MapEl = renderMap()
    return (
        <Container>
            <LayerDropdown />
            { MapEl }
            { legendUrl && <img src={legendUrl} alt="" /> }
        </Container>
    )
}

export default MapCard

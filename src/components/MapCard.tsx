import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Layer, Source, ZoomControl, ScaleControl } from 'react-mapbox-gl'

import MapBox from './Map'
import Card from './Card'
import LayerDropdown from './LayerDropdown'
import { selectCoords, selectLayerUrl } from '../redux/selectors'

const Container = styled(Card)`
    background-color: white;
`

// TODO:
// * Create a settings screen that facilitates unit selection

const MapCard = () => {
    const coords = useSelector(selectCoords)
    const layerUrl = useSelector(selectLayerUrl)

    const defaultStyle = "mapbox://styles/mapbox/light-v10"
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
                <MapBox center={[longitude, latitude]} style={defaultStyle} containerStyle={{ height: '40vh', width: '100%' }} >
                    <Source id="source_id" tileJsonSource={RASTER_SOURCE_OPTIONS} />
                    <Layer paint={{ 'raster-opacity': 0.7 }} type="raster" id="layer_id" sourceId="source_id" />
                    <ZoomControl />
                    <ScaleControl />
                </MapBox>
            )
        }
    }

    return (
        <Container>
            <LayerDropdown />
            {renderMap()}
        </Container>
    )
}

export default MapCard

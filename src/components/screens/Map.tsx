/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import moment from 'moment'
import { Layer, Source, ZoomControl, ScaleControl } from 'react-mapbox-gl'

import MapBox from '../Map'
import Card from '../Card'
import LayerDropdown from '../LayerDropdown'
import Button from '../Button'
import { getLayer } from '../../redux/slice/map'
import { getCurrentLocation } from '../../redux/slice/location'
import { selectCoords, selectMapData } from '../../redux/selectors'

type ButtonType = { disabled?: boolean }

const getButtonColor = ({ disabled }: ButtonType) => ( disabled ? 'rgba(0,0,0,0.5)' : 'black' )
const getHoverState = ({ disabled }: ButtonType) => (
    !disabled ? '' : `
        cursor: not-allowed;
        :hover {
            font-weight: regular;
        }
    `
)
const Container = styled(Card)`
    background-color: white;
`

const ButtonGroup = styled.div`
    display: flex;
`

const BottomButton = styled(Button)`
    color: ${(p: ButtonType) => getButtonColor(p)};
    flex: 1;
    ${(p: ButtonType) => getHoverState(p)}
`

const InfoSection = styled.div`
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
`

const NOW_STEP = 0

const MapScreen = () => {
    const dispatch = useDispatch()
    const coords = useSelector(selectCoords)
    const { layerUrl, layerTypeId, layerId, time } = useSelector(selectMapData)
    const initialCenter: any = undefined
    const [ center, setCenter ] = useState(initialCenter)
    const [timeOffset, setTimeOffset] = useState(0)
    const initialZoom: [number] = [7]
    const [zoom] = useState(initialZoom)

    useEffect(() => {
        if (!coords) {
            dispatch(getCurrentLocation())
        } else if (!center) {
            const { longitude, latitude } = coords
            setCenter([longitude, latitude])
        } else {
            dispatch(getLayer({ layerTypeId, layerId, timeOffset }))
        }
    }, [center, coords, dispatch, layerId, layerTypeId, timeOffset])

    const inc = () => {
        setTimeOffset(timeOffset - 1)
    }

    const dec = () => {
        setTimeOffset(timeOffset + 1)
    }

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
                    containerStyle={{ height: '85vh', width: '100%' }}
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

    return (
        <Container>
            <InfoSection>{moment(time).format('MM.DD|hh:mma')}</InfoSection>
            <LayerDropdown />
            <ButtonGroup>
                <BottomButton onClick={dec}>{'<'}</BottomButton>
                <BottomButton onClick={() => setTimeOffset(NOW_STEP)}>{'now'}</BottomButton>
                <BottomButton disabled={timeOffset === 0} onClick={inc}>{'>'}</BottomButton>
            </ButtonGroup>
            {renderMap()}
        </Container>
    )
}

export default MapScreen

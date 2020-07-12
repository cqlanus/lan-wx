/* eslint-disable */
import React, { useState, useEffect, useMemo } from 'react'
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
import { selectCoords, selectMapData, selectLegendUrl, selectCurrentLayer } from '../../redux/selectors'

import getTheme from '../../themes'

type ButtonType = { disabled?: boolean }

const getButtonColor = ({ disabled }: ButtonType) => (disabled ? 'rgba(0,0,0,0.5)' : getTheme().fg)
const getHoverState = ({ disabled }: ButtonType) => (
    !disabled ? '' : `
        cursor: not-allowed;
        :hover {
            font-weight: regular;
        }
    `
)
const Container = styled(Card)`
    background-color: ${() => getTheme().bg};
    display: flex;
    flex-direction: column;
`

const Legend = styled.img`
    align-self: center;
`

const BottomContainer = styled.div`
    padding-top: 0.5rem;
    background-color: ${() => getTheme().bg};
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1111;
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
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
`

const NOW_STEP = 0

const MapScreen = () => {
    const dispatch = useDispatch()
    const coords = useSelector(selectCoords)
    const { layerUrl, layerTypeId, layerId, time } = useSelector(selectMapData)
    const legendUrl = useSelector(selectLegendUrl)
    const initialCenter: any = undefined
    const [center, setCenter] = useState(initialCenter)
    const [timeOffset, setTimeOffset] = useState(0)
    const initialZoom: [number] = [7]
    const [zoom] = useState(initialZoom)

    const currentLayer = useMemo(selectCurrentLayer(layerTypeId, layerId), [layerTypeId, layerId])
    const isDisabled = useMemo(() => {
        if (currentLayer) {
            const { max } = currentLayer
            return (timeOffset >= max)
        }
    }, [timeOffset, currentLayer])

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

    const handleInc = () => {
        if (currentLayer) {
            const { interval, max } = currentLayer
            if (timeOffset < max) {
                setTimeOffset(timeOffset + interval)
            } else {
                setTimeOffset(max)
            }
        }
    }

    const handleDec = () => {
        if (currentLayer) {
            const { interval, start } = currentLayer
            if (layerTypeId !== 'forecast' || timeOffset > start) {
                setTimeOffset(timeOffset - interval)
            } else {
                setTimeOffset(start)
            }
        }
    }

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
                    style={getTheme().map}
                    containerStyle={{ height: '80vh', width: '100%' }}
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
            {legendUrl && center && <Legend src={legendUrl} alt="" />}
            {renderMap()}
            <BottomContainer>
                <LayerDropdown />
                <ButtonGroup>
                    <BottomButton onClick={handleDec}>{'<'}</BottomButton>
                    <BottomButton onClick={() => setTimeOffset(NOW_STEP)}>{'now'}</BottomButton>
                    <BottomButton disabled={isDisabled}  onClick={handleInc}>{'>'}</BottomButton>
                </ButtonGroup>
            </BottomContainer>
        </Container>
    )
}

export default MapScreen

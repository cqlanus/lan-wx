import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import MapBox from './Map'
import { getCurrentLocation } from '../app/slice/location'
import { selectCoords } from '../app/selectors'

const Container = styled.div`
    background-color: white;
    border: 1px solid rgba(0,0,0,0.2);
    height: 100vh;
    min-height: 300px;
`

const MapCard = () => {
    const dispatch = useDispatch()
    const coords = useSelector(selectCoords)

    useEffect(() => {
        dispatch(getCurrentLocation())

    }, [dispatch])
    const defaultStyle = "mapbox://styles/mapbox/streets-v11"

    const renderMap = () => {
        if (coords) {
            const { latitude = 41, longitude = -87 } = coords
            return (
                <MapBox center={[longitude, latitude]} style={defaultStyle} containerStyle={{ height: '100%', width: '100%' }} />
            )
        }
    }

    return (
        <Container>
            { renderMap() }
        </Container>
    )
}

export default MapCard

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { getDetailedForecast } from '../redux/slice/forecast'
import { selectDetailedForecast, selectCoords } from '../redux/selectors'

const DetailedForecast = () =>  {
    const dispatch = useDispatch()
    const coords = useSelector(selectCoords)
    const detailedForecast = useSelector(selectDetailedForecast)
    useEffect(() => {
        dispatch(getDetailedForecast())
    }, [coords, dispatch])

    if (!detailedForecast) { return null }

    return (
        <div/>
    )
}

export default DetailedForecast

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {
    ComposedChart,
    Line,
    XAxis,
    YAxis,
    ResponsiveContainer
} from 'recharts'

import { getDetailedForecast } from '../redux/slice/forecast'
import { selectDetailedForecast, selectCoords } from '../redux/selectors'

const Container = styled.div`
    width: 100%;
    height: 25vh;
    margin-bottom: 1rem;
`
const Title = styled.h3``
const Subtitle = styled.h4``

const CHARTS = {
    temp: {
        title: "Temperature",
        keys: [{ name: 'temperature', type: Line }, { name: 'dewpoint', type: Line }]
    },
    percentages: {
        title: "Percentages",
        keys: [{ name: 'relativeHumidity', type: Line }, { name: 'skyCover', type: Line }, { name: 'probabilityOfPrecipitation', type: Line }]
    },
    wind: {
        title: "Wind",
        keys: [{ name: 'windSpeed', type: Line }, { name: 'windGust', type: Line }]
    }
}

const DetailedForecast = () => {
    const dispatch = useDispatch()
    const coords = useSelector(selectCoords)
    const detailedForecast = useSelector(selectDetailedForecast)
    useEffect(() => {
        dispatch(getDetailedForecast())
    }, [coords, dispatch])

    if (!detailedForecast) { return null }

    const dataFor = (key: string) => (d: any) => d[key] && d[key].value
    return (
        <div>
            <Title>Forecast Charts</Title>
            {
                Object.entries(CHARTS).map(([k, val]) => {
                    return (
                        <Container key={k}>
                            <Subtitle>{val.title}</Subtitle>
                            <ResponsiveContainer height="90%" width="100%">
                                <ComposedChart data={detailedForecast}>
                                    <XAxis />
                                    <YAxis />
                                    {
                                        val.keys.map(k => {
                                            const Element = k.type
                                            return <Element dot={false} connectNulls dataKey={dataFor(k.name)}/>
                                        })
                                    }
                                </ComposedChart>
                            </ResponsiveContainer>
                        </Container>
                    )
                })
            }
        </div>

    )
}

export default DetailedForecast

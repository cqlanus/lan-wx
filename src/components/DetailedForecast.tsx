import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import styled from 'styled-components'
import {
    ComposedChart,
    Line,
    XAxis,
    YAxis,
    Legend,
    ResponsiveContainer
} from 'recharts'

import { getDetailedForecast } from '../redux/slice/forecast'
import { selectDetailedForecast, selectCoords, selectDaysAhead } from '../redux/selectors'

const dataFor = (key: string) => (d: any) => d[key] && d[key].value

const PageContainer = styled.div`
    margin-bottom: 8rem;
`

const Container = styled.div`
    width: 100%;
    height: 25vh;
    margin-bottom: 1rem;
`

const Title = styled.h3``

const Subtitle = styled.h4``

type CHART_CONFIG = {
    [key: string]: {
        title: string,
        keys: Array<string>,
        axes: (num: number, length: number) => Array<{ type: any, dataKey?: any, style?: object }>
    }
}
const BASE_AXIS = { style: { fontSize: '0.6rem' } }
const formatTime = (daysAhead: number, d: string) => {
    const timeString = moment(d).format(daysAhead < 4 ? 'ha' : 'M/D')
    return timeString
}
const formatInterval = (daysAhead: number, length: number) => {
    return daysAhead < 4 ? (4 * daysAhead) : Math.round(length/daysAhead)
}
const BASE_X_AXIS = (daysAhead: number, length: number) => ({ ...BASE_AXIS, dataKey: 'time', tickFormatter: (d: string) => formatTime(daysAhead, d), interval: formatInterval(daysAhead, length) })
const DASH_PATTERNS = ['', '2 2', '5 5']
const baseElement = (key: string, idx: number) => ({ name: key, type: Line, dataKey: dataFor(key), stroke: 'rgba(0,0,0,0.7)', strokeWidth: '1.5', strokeDasharray: DASH_PATTERNS[idx] })

const CHARTS: CHART_CONFIG = {
    temp: {
        title: "Temperature",
        keys: ['temperature', 'dewpoint'],
        axes: (daysAhead: number, length: number) => [{ ...BASE_X_AXIS(daysAhead, length), type: XAxis }, { ...BASE_AXIS, type: YAxis }]
    },
    percentages: {
        title: "Percentages",
        keys: ['relativeHumidity', 'skyCover', 'probabilityOfPrecipitation'],
        axes: (daysAhead: number, length: number) => [{ ...BASE_X_AXIS(daysAhead, length), type: XAxis }, { ...BASE_AXIS, type: YAxis }]
    },
    wind: {
        title: "Wind",
        keys: ['windSpeed', 'windGust'],
        axes: (daysAhead: number, length: number) => [{ ...BASE_X_AXIS(daysAhead, length), type: XAxis }, { ...BASE_AXIS, type: YAxis }]
    },
    quants: {
        title: "Quants",
        keys: ['quantitativePrecipitation'],
        axes: (daysAhead: number, length: number) => [{ ...BASE_X_AXIS(daysAhead, length), type: XAxis }, { ...BASE_AXIS, type: YAxis }]
    }
}

const DetailedForecast = () => {
    const dispatch = useDispatch()
    const coords = useSelector(selectCoords)
    const detailedForecast = useSelector(selectDetailedForecast)
    const daysAhead = useSelector(selectDaysAhead)
    useEffect(() => {
        dispatch(getDetailedForecast())
    }, [coords, dispatch])

    if (!detailedForecast) { return null }
    const { length } = detailedForecast

    return (
        <PageContainer>
            <Title>Forecast Charts</Title>
            {
                Object.entries(CHARTS).map(([k, val]) => {
                    return (
                        <Container key={k}>
                            <Subtitle>{val.title}</Subtitle>
                            <ResponsiveContainer height="90%" width="100%">
                                <ComposedChart data={detailedForecast}>
                                    {
                                        val.axes(daysAhead, length).map(({ type: Axis, ...rest }, idx) => {
                                            return (<Axis key={idx} {...rest} />)
                                        })
                                    }
                                    {
                                        val.keys.map(baseElement)
                                            .map(({ type: ChartElement, name, ...rest }) =>
                                                <ChartElement key={name} dot={false} connectNulls dataKey={dataFor(name)} name={name} {...rest} />)
                                    }
                                    <Legend iconType="line" verticalAlign="top" />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </Container>
                    )
                })
            }
        </PageContainer>

    )
}

export default DetailedForecast

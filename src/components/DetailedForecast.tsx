import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import styled from 'styled-components'
import {
    XAxis,
    YAxis,
    Legend,
    Tooltip
} from 'recharts'

import ChartContainer, { BASE_AXIS, getBaseElement } from './ChartContainer'
import { TooltipProps } from './Tooltip'

import { getDetailedForecast } from '../redux/slice/forecast'
import { selectDetailedForecast, selectCoords, selectDaysAhead } from '../redux/selectors'

const dataFor = (key: string) => (d: any) => d[key] && d[key].value

// STYLED COMPONENTS
const PageContainer = styled.div`
    margin-bottom: 8rem;
`

const Title = styled.h3``

// CHART FORMATTERS
const formatTime = (daysAhead: number, d: string) => {
    const timeString = moment(d).format(daysAhead < 4 ? 'ha' : 'M/D')
    return timeString
}
const formatInterval = (daysAhead: number, length: number) => {
    return daysAhead < 4 ? (4 * daysAhead) : Math.round(length / daysAhead)
}

// CONFIG FOR CHART
type CHART_CONFIG = {
    [key: string]: {
        title: string,
        keys: Array<string>,
        axes: (num: number, length: number) => Array<{ type: any, dataKey?: any, style?: object }>
    }
}
const BASE_X_AXIS = (daysAhead: number, length: number) =>
    ({
        ...BASE_AXIS,
        mirror: false,
        dataKey: 'time',
        tickFormatter: (d: string) => formatTime(daysAhead, d),
        interval: formatInterval(daysAhead, length)
    })
const baseElement = getBaseElement(dataFor)

const CHARTS: CHART_CONFIG = {
    temp: {
        title: "Temperature",
        keys: ['temperature', 'dewpoint', 'apparentTemperature'],
        axes: (daysAhead: number, length: number) => [{ ...BASE_X_AXIS(daysAhead, length), type: XAxis }, { ...BASE_AXIS, type: YAxis, domain: ['dataMin - 10', 'auto'] }]
    },
    percentages: {
        title: "Percentages",
        keys: ['probabilityOfPrecipitation', 'relativeHumidity', 'skyCover'],
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
                        <ChartContainer
                            key={k}
                            title={val.title}
                            data={detailedForecast}>
                            <Tooltip {...TooltipProps} />
                            {
                                val.axes(daysAhead, length).map(({ type: Axis, ...rest }, idx) => {
                                    return (<Axis key={idx} {...rest} padding={{ left: 20 }} />)
                                })
                            }
                            {
                                val.keys.map(baseElement)
                                    .map(({ type: ChartElement, name, ...rest }) =>
                                        <ChartElement key={name} dot={false} connectNulls name={name} {...rest} />)
                            }
                            <Legend iconType="plainline" verticalAlign="top" iconSize={20} wrapperStyle={{ fontSize: '0.6rem' }} />
                        </ChartContainer>
                    )
                })
            }
        </PageContainer>

    )
}

export default DetailedForecast

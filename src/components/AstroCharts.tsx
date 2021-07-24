import React, { useEffect } from 'react'
import { compose } from 'ramda'
import { useDispatch, useSelector } from 'react-redux'
import {
    XAxis,
    YAxis,
    Legend,
    Tooltip
} from 'recharts'
import { format } from 'date-fns'

import { TooltipProps } from './Tooltip'
import ChartContainer, { BASE_AXIS, getBaseElement } from './ChartContainer'
import Container from './Container'
import type { CHART_CONFIG } from '../types/chart'

import getTheme from '../themes'
import { getDayLengths } from '../redux/slice/astronomy'
import { selectCoords, selectDayLengthTimeseries } from '../redux/selectors'
import { localFormattedDate } from '../utils/time'

const formatTime = (d: any) => {
    return format(new Date(d), 'mm/dd')
}

const getTimeDuration = (ms: number) => {
    const hours = Math.floor(ms / 3.6e6)
    const minutes = Math.floor((ms % 3.6e6) / 6e4)
    const seconds = Math.floor((ms % 6e4) / 1000)
    return { hours, minutes, seconds }
}

const durationToString = ({ hours, minutes, seconds }: any) => {
    return `${hours}:${minutes}:${seconds}`
}

const formatTimeDuration = compose(
    durationToString,
    getTimeDuration,
)

const dataFor = (key: string) => (d: any) => d[key]
const baseElement = getBaseElement(dataFor)

const BASE_X_AXIS = {
    ...BASE_AXIS,
    dataKey: 'date',
    tickFormatter: (d: any) => formatTime(d),
}
const BASE_Y_AXIS = {
    ...BASE_AXIS,
    tickFormatter: () => ""
}
const CHARTS: CHART_CONFIG = {
    dayLengths: {
        title: "Day Lengths",
        keys: ['days', 'nights', 'inverseDay'],
        axes: [
            { ...BASE_X_AXIS, type: XAxis },
            { ...BASE_Y_AXIS, type: YAxis }]
    },
}

const formatTooltip = (val: any, name: string) => {
    const hasDashes = /-/.test(name)
    let formattedName = ''
    if (hasDashes) {
        formattedName = name.split('-').map(w => w[0]).join('')
    } else {
        formattedName = name.replace(/[A-Z]/g, (x: any) => `_${x.toLowerCase()}`).split('_').map(w => w[0]).join('')
    }
    const displayVal = formatTimeDuration(val)
    return [displayVal, formattedName]
}

const AstroCharts = () => {
    const dispatch = useDispatch()
    const coords = useSelector(selectCoords)
    const dayLengths = useSelector(selectDayLengthTimeseries)
    useEffect(() => {
        dispatch(getDayLengths())
    }, [coords])

    if (!coords) { return null }

    return (
        <Container>
            {
                Object.entries(CHARTS).map(([k, val]) => {
                    return (
                        <ChartContainer
                            key={k}
                            title={val.title}
                            data={dayLengths}
                        >
                            <Tooltip {...TooltipProps(getTheme(), localFormattedDate, formatTooltip)} />
                            {
                                val.axes.map(({ type: Axis, style, ...rest }, idx) => {
                                    return <Axis key={idx} style={{ ...style, fill: getTheme().fg }} {...rest} />
                                })
                            }
                            {
                                val.keys.map(baseElement)
                                    .map(({ type: ChartElement, name, ...rest }) =>
                                        <ChartElement key={name} dot={false} connectNulls name={name} {...rest} />
                                    )
                            }
                            <Legend iconType="plainline" verticalAlign="top" iconSize={20} wrapperStyle={{ fontSize: '0.6rem' }} />
                        </ChartContainer>
                    )
                })
            }
        </Container>
    )
}

export default AstroCharts

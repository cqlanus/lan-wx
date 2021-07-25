import React, { useEffect } from 'react'
import { compose, } from 'ramda'
import { useDispatch, useSelector } from 'react-redux'
import {
    XAxis,
    YAxis,
    Legend,
    Tooltip,
    ReferenceLine
} from 'recharts'
import { format } from 'date-fns'

import { TooltipProps } from './Tooltip'
import ChartContainer, { BASE_AXIS, getBaseElement } from './ChartContainer'
import Container from './Container'
import type { CHART_CONFIG } from '../types/chart'

import getTheme from '../themes'
import { getDayLengths, getPositionTimeseries } from '../redux/slice/astronomy'
import { selectCoords, selectDayLengthTimeseries, selectPositionTimeseries } from '../redux/selectors'
import { localFormattedDate, localFormattedTime } from '../utils/time'

const formatDate = (d: any) => {
    return format(new Date(d), 'mm/dd')
}

const formatTime = (d: any) => {
    return format(new Date(d), 'ha')
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
const altData = (key: string) => (d: any) => d[key].alt
const baseElement = (findFn: (k: string) => any) => getBaseElement(findFn)

const BASE_X_AXIS = {
    ...BASE_AXIS,
    dataKey: 'date',
    mirror: false,
    tickFormatter: (d: any) => formatDate(d),
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

const BASE_X_AXIS_POS = {
    ...BASE_AXIS,
    mirror: false,
    dataKey: 'date',
    tickFormatter: (d: any) => formatTime(d),
}

const BASE_Y_AXIS_POS = {
    ...BASE_AXIS,
}

const POSITION_CHARTS: CHART_CONFIG = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'].reduce((acc, body) => {
    return {
        ...acc,
        [body]: {
            title: `${body} altitude`,
            keys: [body],
            axes: [
                { ...BASE_X_AXIS_POS, type: XAxis },
                { ...BASE_Y_AXIS_POS, type: YAxis }]
        }
    }
}, {})

const formatName = (name: string) => {
    const hasDashes = /-/.test(name)
    let formattedName = ''
    if (hasDashes) {
        formattedName = name.split('-').map(w => w[0]).join('')
    } else {
        formattedName = name.replace(/[A-Z]/g, (x: any) => `_${x.toLowerCase()}`).split('_').map(w => w[0]).join('')
    }
    return formattedName
}

const createFormatTooltip = (valFormatter: any, nameFormatter: any) => (val: any, name: string) => {
    return [valFormatter(val), nameFormatter(name)]
}

const formatTooltip = createFormatTooltip(formatTimeDuration, formatName)

const AstroCharts = () => {
    const dispatch = useDispatch()
    const coords = useSelector(selectCoords)
    const dayLengths = useSelector(selectDayLengthTimeseries)
    const positions = useSelector(selectPositionTimeseries)
    useEffect(() => {
        dispatch(getDayLengths())
        dispatch(getPositionTimeseries())
    }, [coords])

    if (!coords) { return null }

    type ChartsArgs = {
        charts: CHART_CONFIG,
        data: any[],
        findFn: (k: string) => any,
        tooltipTitleFn: any,
        tooltipLabelFn: any,
    }
    const renderCharts = ({ charts, data, findFn, tooltipTitleFn, tooltipLabelFn }: ChartsArgs ) => (
        <>
            {
                Object.entries(charts).map(([k, val]) => {
                    return (
                        <ChartContainer
                            key={k}
                            title={val.title}
                            data={data}
                        >
                            <Tooltip {...TooltipProps(getTheme(), tooltipTitleFn, tooltipLabelFn)} />
                            {
                                val.axes.map(({ type: Axis, style, ...rest }, idx) => {
                                    return <Axis key={idx} style={{ ...style, fill: getTheme().fg }} {...rest} />
                                })
                            }
                            {
                                val.keys.map(baseElement(findFn))
                                   .map(({ type: ChartElement, name, ...rest }) =>
                                       <ChartElement key={name} dot={false} connectNulls name={name} {...rest} />
                                   )
                            }
                            <ReferenceLine y={0} strokeWidth={3} />

                            <Legend iconType="plainline" verticalAlign="top" iconSize={20} wrapperStyle={{ fontSize: '0.6rem' }} />
                        </ChartContainer>
                    )
                })
            }
        </>
    )

    return (
        <Container>
            {renderCharts({
                charts: CHARTS, 
                data: dayLengths,
                findFn: dataFor,
                tooltipTitleFn: localFormattedDate,
                tooltipLabelFn: formatTooltip,
            })}
            {renderCharts({
                charts: POSITION_CHARTS,
                data: positions,
                findFn: altData,
                tooltipTitleFn: localFormattedTime,
                tooltipLabelFn: createFormatTooltip((v: number) => v.toFixed(2), () => 'alt'),
            })}
        </Container>
    )
}

export default AstroCharts

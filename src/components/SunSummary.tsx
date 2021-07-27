import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { compose, } from 'ramda'
import { format } from 'date-fns'
import {
    XAxis,
    YAxis,
} from 'recharts'

import Table from './Table'
import Charts from './Chartz'
import { BASE_AXIS, } from './ChartContainer'

import { getSunSummary, getDayLengths, } from '../redux/slice/astronomy'
import { selectCoords, selectDayLengthTimeseries, selectSunSummary } from '../redux/selectors'
import { localFormattedTime, localFormattedDate, formatDuration, formatTimeCompare } from '../utils/time'

import type { CHART_CONFIG } from '../types/chart'

import type {
    SunSummary as SunSummaryType,
    AstroDuration,
} from '../types/astronomy'

const formatDate = (d: any) => {
    return format(new Date(d), 'mm/dd')
}

const dataFor = (key: string) => (d: any) => d[key]


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

const riseSetStructure = [
    {
        Header: 'Rise',
        accessor: ({ times }: SunSummaryType) => localFormattedTime(times.sunrise),
        id: 'sunrise',
    },
    {
        Header: 'Solar Noon',
        accessor: ({ times }: SunSummaryType) => localFormattedTime(times.solarNoon),
        id: 'solarNoon',
    },
    {
        Header: 'Set',
        accessor: ({ times }: SunSummaryType) => localFormattedTime(times.sunset),
        id: 'sunset',
    },
]

const positionStructure = [
    {
        Header: 'Alt',
        accessor: ({ position }: SunSummaryType) => position.alt.toFixed(2),
        id: 'alt',
    },
    {
        Header: 'Az',
        accessor: ({ position }: SunSummaryType) => position.az.toFixed(2),
        id: 'az',
    },
    {
        Header: 'RA',
        accessor: ({ position }: SunSummaryType) => position.ra.toFixed(2),
        id: 'ra',
    },
    {
        Header: 'Dec',
        accessor: ({ position }: SunSummaryType) => position.dec.toFixed(2),
        id: 'dec',
    },
]

const lengthsStructure = [
    {
        accessor: 'title'
    },
    {
        Header: 'Length',
        accessor: (dur: AstroDuration) => formatDuration(dur),
        id: 'length'
    }
]

const comparedStructure = [
    {
        Header: 'Today is',
        accessor: (comp: AstroDuration & { title: string }) => formatTimeCompare(comp),
        id: 'todayIs'
    }
]

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

const SunSummary = () => {
    const dispatch = useDispatch()
    const coords = useSelector(selectCoords)
    const sunSummary = useSelector(selectSunSummary)
    const dayLengths = useSelector(selectDayLengthTimeseries)
    useEffect(() => {
        dispatch(getSunSummary())
        dispatch(getDayLengths())
    }, [dispatch, coords])

    const data = useMemo(() => ([sunSummary].filter(Boolean)), [sunSummary])
    const lengths = useMemo(() => {
        if (!sunSummary) { return [] }
        return Object.entries(sunSummary.lengths).reduce((acc: any, entry) => {
            const [title, val] = entry
            return [...acc, { title, ...val }]
        }, [])
    }, [sunSummary])

    const comparisons = useMemo(() => {
        if (!sunSummary) { return [] }
        return Object.entries(sunSummary.compared).reduce((acc: any, entry) => {
            const [title, val] = entry
            return [...acc, { title, ...val }]
        }, [])
    }, [sunSummary])

    const riseSetColumns = useMemo(() => riseSetStructure, [])
    const positionColumns = useMemo(() => positionStructure, [])

    if (!coords) { return null }

    return (
        <>
            <h3>Sun Summary</h3>
            <Table columns={riseSetColumns} data={data} />
            <Table columns={positionColumns} data={data} />
            <Table columns={lengthsStructure} data={lengths} />
            <Table columns={comparedStructure} data={comparisons} />
            <Charts
                charts={CHARTS}
                data={ dayLengths}
                findFn={ dataFor}
                tooltipTitleFn={ localFormattedDate}
                tooltipLabelFn={ formatTooltip}
            />
        </>
    )
}

export default SunSummary

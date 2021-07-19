import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Table from './Table'

import { getSunSummary } from '../redux/slice/astronomy'
import { selectCoords, selectSunSummary } from '../redux/selectors'
import { localFormattedTime, formatDuration, formatTimeCompare } from '../utils/time'

import type {
    SunSummary as SunSummaryType,
    AstroDuration,
} from '../types/astronomy'

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
        accessor: (comp: AstroDuration & {title: string}) => formatTimeCompare(comp),
        id: 'todayIs'
    }
]

const SunSummary = () => {
    const dispatch = useDispatch()
    const coords = useSelector(selectCoords)
    const sunSummary = useSelector(selectSunSummary)
    useEffect(() => {
        dispatch(getSunSummary())
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
            <h4>Times</h4>
            <Table columns={riseSetColumns} data={data} />
            <h4>Current Position</h4>
            <Table columns={positionColumns} data={data} />
            <h4>Lengths</h4>
            <Table columns={lengthsStructure} data={lengths} />
            <h4>Comparisons</h4>
            <Table columns={comparedStructure} data={comparisons} />
        </>
    )
}

export default SunSummary

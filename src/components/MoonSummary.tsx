import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Table from './Table'

import { getMoonSummary } from '../redux/slice/astronomy'
import { selectCoords, selectMoonSummary } from '../redux/selectors'
import { localFormattedTime, formatDuration, formatTimeCompare } from '../utils/time'

import type { 
    MoonSummary as MoonSummaryType,
    AstroDuration,

} from '../types/astronomy'

const riseSetStructure = [
    {
        Header: 'Rise',
        accessor: ({ times }: MoonSummaryType) => localFormattedTime(times.moonrise),
        id: 'moonrise',
    },
    {
        Header: 'Set',
        accessor: ({ times }: MoonSummaryType) => localFormattedTime(times.moonset),
        id: 'moonset',
    },
]

const positionStructure = [
    {
        Header: 'Alt',
        accessor: ({ position }: MoonSummaryType) => position.alt.toFixed(2),
        id: 'alt',
    },
    {
        Header: 'Az',
        accessor: ({ position }: MoonSummaryType) => position.az.toFixed(2),
        id: 'az',
    },
    {
        Header: 'RA',
        accessor: ({ position }: MoonSummaryType) => position.ra.toFixed(2),
        id: 'ra',
    },
    {
        Header: 'Dec',
        accessor: ({ position }: MoonSummaryType) => position.dec.toFixed(2),
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
        Header: 'Tonight is',
        accessor: (comp: AstroDuration & {title: string}) => formatTimeCompare(comp),
        id: 'tonightIs'
    }
]

const MoonSummary = () => {
    const dispatch = useDispatch()
    const coords = useSelector(selectCoords)
    const moonSummary = useSelector(selectMoonSummary)
    useEffect(() => {
        dispatch(getMoonSummary())
    }, [dispatch, coords])

    const data = useMemo(() => ([moonSummary].filter(Boolean)), [moonSummary])
    const lengths = useMemo(() => {
        if (!moonSummary) { return [] }
        return Object.entries(moonSummary.lengths).reduce((acc: any, entry) => {
            const [title, val] = entry
            return [...acc, { title, ...val }]
        }, [])
    }, [moonSummary])

    const comparisons = useMemo(() => {
        if (!moonSummary) { return [] }
        return Object.entries(moonSummary.compared).reduce((acc: any, entry) => {
            const [title, val] = entry
            return [...acc, { title, ...val }]
        }, [])
    }, [moonSummary])

    const riseSetColumns = useMemo(() => riseSetStructure, [])
    const positionColumns = useMemo(() => positionStructure, [])

    if (!coords) { return null }

    return (
        <>
            <h3>Moon Summary</h3>
            <h4>Times</h4>
            <Table columns={riseSetColumns} data={data} />
            <h4>Current Position</h4>
            <Table columns={positionColumns} data={data} />
            <h4>Lengths</h4>
            <Table columns={lengthsStructure} data={lengths} />
            <h4>Current Position</h4>
            <Table columns={comparedStructure} data={comparisons} />
        </>
    )
}

export default MoonSummary

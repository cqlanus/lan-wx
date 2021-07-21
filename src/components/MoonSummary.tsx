import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Table from './Table'
import Container from './Container'

import { getMoonSummary, getMoonPhases } from '../redux/slice/astronomy'
import {
    selectCoords,
    selectMoonSummary,
    selectCurrentPhaseData,
    selectNextPhases,
} from '../redux/selectors'
import {
    localFormattedTime,
    localFormattedDate,
    formatDuration,
    formatTimeCompare
} from '../utils/time'

import type {
    MoonSummary as MoonSummaryType,
    AstroDuration,

} from '../types/astronomy'

const nextPhasesStructure = [
    { accessor: 'name' },
    { accessor: 'icon' },
    { accessor: ({ date }: { date: string }) => localFormattedDate(date), id: 'date' }
]
const moonPhaseStructure = [
    {
        accessor: 'displayName'
    },
    {
        accessor: 'icon'
    },
    {
        accessor: 'percentIlluminated'
    },
    {
        accessor: 'value'
    }
]
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
        accessor: (comp: AstroDuration & { title: string }) => formatTimeCompare(comp),
        id: 'tonightIs'
    }
]

const MoonSummary = () => {
    const dispatch = useDispatch()
    const coords = useSelector(selectCoords)
    const moonSummary = useSelector(selectMoonSummary)
    const phaseData = useSelector(selectCurrentPhaseData)
    const nextPhases = useSelector(selectNextPhases)
    useEffect(() => {
        dispatch(getMoonSummary())
        dispatch(getMoonPhases())
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

    const currentPhase = useMemo(() => phaseData ? [phaseData] : [], [phaseData])

    if (!coords) { return null }

    return (
        <Container>
            <h3>Moon Summary</h3>
            <Table columns={moonPhaseStructure} data={currentPhase} showHeader={false} />
            <Table columns={riseSetStructure} data={data} />
            <Table columns={positionStructure} data={data} />
            <Table columns={lengthsStructure} data={lengths} />
            <Table columns={comparedStructure} data={comparisons} />
            <h4>Next Phases</h4>
            <Table columns={nextPhasesStructure} data={nextPhases} showHeader={false} />
        </Container>
    )
}

export default MoonSummary

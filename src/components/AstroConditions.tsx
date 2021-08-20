import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns'

import { selectCoords, selectCurrentAstroConditions, selectAstroForecast } from '../redux/selectors'
import { getCurrentAstroConditions, getAstroForecast } from '../redux/slice/astronomy'

import Table from './Table'
import Container from './Container'
import { convertUnits } from '../utils/units'
import { formatCloudLayers } from '../utils/weather'
import { CloudLayer } from '../types/weather'
import type { AstroTimepoint } from '../types/astronomy'

const GET_VAL_MAPPING: { [key: string]: any } = {
    dewpoint: ({ value }: any) => {
        const dp = convertUnits('degC', 'degF', value).toNumber('degF')
        return dp.toFixed(2) + '°'
    },
    moonPosition: ({ alt }: any) => `${alt.toFixed(2)}°`,
    cloudLayers: (layers: CloudLayer[]) => formatCloudLayers(layers, false),
    aqi: ({ value, units }: { value: string, units: string }) => `${value} ${units.toLowerCase()}`,
    darkness: ({ isNight, isNauticalTwilight }: { isNight: boolean, isNauticalTwilight: boolean }) =>
        isNight ? 'night'
            : isNauticalTwilight ? 'twilight'
                : 'light'

}

type Condition = { title: string, value: any, ratings: [string, number] }
const getValue = (condition: Condition) => {
    const { title, value } = condition
    const getValFn = GET_VAL_MAPPING[title]
    return getValFn ? getValFn(value) : ''
}

const RATING_VALUES: { [key: string]: number } = {
    excellent: 3,
    good: 2,
    ok: 1,
    notGood: 0,
}

const DISPLAY_TITLE: { [key: string]: string } = {
    cloudLayers: 'Cloud Layers',
    dewpoint: 'Dewpoint',
    aqi: 'AQI',
    darkness: 'Darkness',
    moonPosition: 'Moon Position',
    moonPhase: 'Moon Phase',
}

const DISPLAY_RATING: { [key: string]: string } = {
    excellent: 'Excellent',
    good: 'Good',
    ok: 'OK',
    notGood: 'Not Good',
}

const conditionStructure = [
    {
        Header: 'Category',
        accessor: ({ title }: Condition) => DISPLAY_TITLE[title] || title,
        id: 'title',
    },
    {
        Header: 'Value',
        accessor: (condition: Condition) => getValue(condition),
        id: 'value'
    },
    {
        Header: 'Rating',
        accessor: ({ ratings = ['', 0] }: Condition) => `${DISPLAY_RATING[ratings[0]] || ratings[0]} (${RATING_VALUES[ratings[0]]})`,
        id: 'rating'
    }
]

const forecastStructure = [
    {
        Header: 'Date',
        accessor: ({ date }: AstroTimepoint) => format(new Date(date), 'MM:dd HH:00'),
        id: 'date',
    },
    {
        Header: 'Clouds',
        accessor: 'cloudcover'
    },
    {
        Header: 'Transparency',
        accessor: 'transparency',
    },
    {
        Header: 'Seeing',
        accessor: 'seeing',
    }
]

const AstroConditions = () => {
    const dispatch = useDispatch()
    const coords = useSelector(selectCoords)
    const conditions = useSelector(selectCurrentAstroConditions)
    const forecast = useSelector(selectAstroForecast)
    useEffect(() => {
        dispatch(getCurrentAstroConditions())
        dispatch(getAstroForecast())
    }, [dispatch, coords])

    const data = useMemo(() => {
        if (!conditions) { return [] }
        return Object.entries(conditions || {}).reduce((acc: any, entry) => {
            const [key, value]: [string, any] = entry
            return [...acc, { title: key, ...value, }]
        }, [])
    }, [conditions])

    const forecastData = useMemo(() => forecast && forecast.dataseries, [forecast])
    if (!coords) { return null }

    return (
        <Container>
            {
                conditions && (
                    <>
                        <h3>Astro Conditions</h3>
                        <Table columns={conditionStructure} data={data} />
                    </>
                )
            }
            {forecast && (
                <>
                    <h3>Astro Forecast</h3>
                    <Table columns={forecastStructure} data={forecastData} />
                </>

            )}
        </Container>
    )
}

export default AstroConditions

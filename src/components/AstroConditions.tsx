import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectCoords, selectCurrentAstroConditions } from '../redux/selectors'
import { getCurrentAstroConditions } from '../redux/slice/astronomy'

import Table from './Table'
import Container from './Container'
import { convertUnits } from '../utils/units'
import { formatCloudLayers } from '../utils/weather'
import { CloudLayer } from '../types/weather'

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

type Condition = { title: string, value: any,  ratings: [string, number] }
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
        accessor: ({ ratings }: Condition) => `${DISPLAY_RATING[ratings[0]] || ratings[0]} (${RATING_VALUES[ratings[0]]})`,
        id: 'rating'
    }
]

const AstroConditions = () => {
    const dispatch = useDispatch()
    const coords = useSelector(selectCoords)
    const conditions = useSelector(selectCurrentAstroConditions)
    useEffect(() => {
        dispatch(getCurrentAstroConditions())
    }, [dispatch, coords])

    const data = useMemo(() => {
        if (!conditions) { return [] }
        return Object.entries(conditions || {}).reduce((acc: any, entry) => {
            const [key, value]: [string, any] = entry
            return [...acc, { title: key, ...value, }]
        }, [])
    }, [conditions])

    if (!coords || !conditions) { return null }

    return (
        <Container>
            <h3>Astro Conditions</h3>
            <Table columns={conditionStructure} data={data} />
        </Container>
    )
}

export default AstroConditions

import React, { useEffect } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import Card from './Card'
import { getCurrentWeather } from '../redux/slice/weather'
import { selectCoords, selectCurrentWeather } from '../redux/selectors'
import type { WeatherValue } from '../types/weather'

const Container = styled(Card)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 40vh;
`

const Title = styled.h3``

const Spacer = styled.div`
  margin-bottom: 1rem;
`

const DISPLAY_UNIT_MAP: any = {
    degF: '°F',
    degC: '°C',
    'degree_(angle)': '°',
    percent: '%',
    'm_s-1': 'm/s'
}

const DISPLAY_LABEL_MAP: any = {
    textDescription: 'Currently',
    temperature: 'Temperature',
    dewpoint: 'Dewpoint',
    relativeHumidity: 'Humidity',
    visibility: 'Visibility',
    barometricPressure: 'Pressure',
    windSpeed: 'Wind speed',
    windDirection: 'Wind direction',
}

const getDisplayLabel = (key: string) => {
    const displayLabel = DISPLAY_LABEL_MAP[key]
    return displayLabel || key
}
const degreesToCompass = (value: number) => {
    const val = Math.round(value/22.5)
    const compassVals = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
    const index = val % 16
    return (compassVals[index])
}

const getDisplayUnit = ({ value, unit }: WeatherValue, key?: string) => {
    if (key === 'windDirection') {
        return degreesToCompass(value)
    }

    const displayUnit = DISPLAY_UNIT_MAP[unit]
    return `${value} ${displayUnit || unit}`
}

const CURRENT_WX_STRUCTURE = {
    main: { textDescription: { unit: false }, temperature: { unit: true } },
    secondary: {
        wind: [{ display: 'Wind', key: 'windSpeed', unit: true }, { key: 'windDirection', unit: true, display: null }],
        air: [{ display: 'DP', key: 'dewpoint', unit: true }, { display: 'RH', key: 'relativeHumidity', unit: true }],
        pressure: [{ display: 'Pressure', key: 'barometricPressure', unit: true }],
        visibility: [{ display: 'Visibility', key: 'visibility', unit: true }]
    },
}

const Current = (p: any) => {
    const dispatch = useDispatch()
    const coords = useSelector(selectCoords)
    const currentWeather: any = useSelector(selectCurrentWeather)

    useEffect(() => {
        dispatch(getCurrentWeather())
    }, [dispatch, coords])

    if (!currentWeather) { return null }

    const { main, secondary } = CURRENT_WX_STRUCTURE
    const { timestamp } = currentWeather
    const renderMain = () => {
        return Object.entries(main).map(([k, { unit }]) => {
            const data = currentWeather[k]
            const display = unit ? `${getDisplayUnit(data)}` : data
            const label = getDisplayLabel(k)
            return <div key={k}>{label}: {display} </div>
        })
    }

    const renderSecondary = () => Object.entries(secondary).map(([ key, cat ]) => (
        <div key={key}>
            {
                cat.reduce((acc, { display, key }) => {
                    const label = display ? `${display}: ` : ''
                    const displayVal = `${label}${getDisplayUnit(currentWeather[key], key)}`
                    const initial = acc ? `${acc} | ` : ''
                    return `${initial}${displayVal}`
                }, '')
            }
        </div>
    ))

    const renderTime = () => {
        const formatted = moment(timestamp).format('D MMM HH:mma')
        return (
            <em>as of {formatted} </em>
        )
    }

    return (
        <Container>
            <Title>Current Conditions</Title>
            <Spacer>
                {renderTime()}
            </Spacer>
            <Spacer>
                {renderMain()}
            </Spacer>
            {renderSecondary()}

        </Container>
    )
}

export default Current

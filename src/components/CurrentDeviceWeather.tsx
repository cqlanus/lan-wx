import React from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import { selectCurrentDeviceWeather } from '../redux/selectors'
import { getDisplayUnit } from '../utils/units'
import emoji from '../data/emoji'

const Title = styled.h3`
    margin-bottom: 0.5rem;
`

const CatTitle = styled.h4`
    margin-bottom: 0.5rem;
`
const Data = styled.span`
    margin-bottom: 0.5rem;
`

const Info = styled.span`
    font-size: 0.7rem;
`


type DEV_WX_DATA = { display: string, key: string, unit: boolean }
type DEV_WX_STRUCT = {
    [key: string]: DEV_WX_DATA[]
}
const DEVICE_WEATHER_STRUCTURE: DEV_WX_STRUCT = {
    'Temp Outside': [
        { display: emoji.temperature, key: 'tempf', unit: true },
        { display: 'Feels', key: 'feelsLike', unit: true },
    ],
    'Humidity Outside': [
        { display: 'DP', key: 'dewPoint', unit: true },
        { display: 'Humidity', key: 'humidity', unit: true },
    ],
    'Wind': [
        { display: 'Wind', key: 'windspeedmph', unit: true },
        { display: '', key: 'winddir', unit: true },
    ],
    'Pressure': [
        { display: 'Pressure', key: 'baromrelin', unit: true },
    ],
    'Rain': [
        { display: `${emoji.rainDrop}rate`, key: 'hourlyrainin', unit: true },
        { display: `Day${emoji.rainDrop}`, key: 'dailyrainin', unit: true },
        { display: `Event${emoji.rainDrop}`, key: 'eventrainin', unit: true },
    ],
    'Temp Inside': [
        { display: emoji.temperature, key: 'tempinf', unit: true },
        { display: 'Feels', key: 'feelsLikein', unit: true },
    ],
    'Humidity Inside': [
        { display: 'DP', key: 'dewPointin', unit: true },
        { display: 'Humidity', key: 'humidityin', unit: true },
    ]
}

const CurrentDeviceWeather = () => {
    const currentWeather: any = useSelector(selectCurrentDeviceWeather)
    if (!currentWeather) { return null }
    const renderCurrent = (structure: DEV_WX_STRUCT) => Object.entries(structure).map(([key, cat]) => {
        return (
            <div key={key}>
                <CatTitle>{key}</CatTitle>
                <Data>
                    {
                        cat.reduce((acc: any, { display, key }: any) => {
                            const label = display ? `${display}: ` : ''
                            const displayVal = `${label}${getDisplayUnit(currentWeather[key], key)}`
                            const initial = acc ? `${acc} | ` : ''
                            return `${initial}${displayVal}`
                        }, '')
                    }
                </Data>
            </div>
        )
    })

    const date = moment(currentWeather.date).format('D MMM HH:mma')
    return (
        <div>
            <Title>PWS Current Conditions</Title>
            <Info>{`as of ${date}`}</Info>
            {renderCurrent(DEVICE_WEATHER_STRUCTURE)}
        </div>
    )
}

export default CurrentDeviceWeather

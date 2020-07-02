import React, { useEffect } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import { getDeviceInfo } from '../redux/slice/pws'
import { selectPwsDevices, selectCurrentDeviceWeather } from '../redux/selectors'
import { getDisplayUnit } from '../utils/units'
import emoji from '../data/emoji'

const Container = styled.div`
    padding: 0 1rem;
    margin-bottom: 4rem;
`

const Title = styled.h3`
    margin-bottom: 0.5rem;
`

const CatTitle = styled.h4`
    margin-bottom: 0.5rem;
`
const Data = styled.span`
    margin-bottom: 0.5rem;
`

const Info = styled.div`
    font-size: 0.7rem;
`

const Reload = styled.span`
    cursor: pointer;
    margin-left: 0.5rem;
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
        { display: `${emoji.rainDrop}Rate`, key: 'hourlyrainin', unit: true },
        { display: `Day${emoji.rainDrop}`, key: 'dailyrainin', unit: true },
        { display: `Event${emoji.rainDrop}`, key: 'eventrainin', unit: true },
        { display: `Week${emoji.rainDrop}`, key: 'weeklyrainin', unit: true },
        { display: `Month${emoji.rainDrop}`, key: 'monthlyrainin', unit: true },
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
    const dispatch = useDispatch()
    const devices = useSelector(selectPwsDevices)

    const handleGetWeather = () => {
        if (devices.length > 0) {
            const [device] = devices
            const { macAddress, apiKey } = device
            dispatch(getDeviceInfo(macAddress, apiKey))
        }
    }

    useEffect(() => {
        handleGetWeather()
    }, [dispatch, devices])


    const currentWeather: { data: any, info: any } | undefined = useSelector(selectCurrentDeviceWeather)

    if (!currentWeather) { return null }

    const { data, info } = currentWeather

    const renderInfo = () => {
        return (
            <div>
                <Title>{info.name} Current Conditions<Reload onClick={handleGetWeather}>{emoji.reload}</Reload></Title>
                <Info>{`as of ${date}`}</Info>
                <Info>{info.coords.address}</Info>
            </div>
        )
    }

    const renderCurrent = (structure: DEV_WX_STRUCT) => Object.entries(structure).map(([key, cat]) => {
        return (
            <div key={key}>
                <CatTitle>{key}</CatTitle>
                <Data>
                    {
                        cat.reduce((acc: any, { display, key }: any) => {
                            const label = display ? `${display}: ` : ''
                            const displayVal = `${label}${getDisplayUnit(data[key], key)}`
                            const initial = acc ? `${acc} | ` : ''
                            return `${initial}${displayVal}`
                        }, '')
                    }
                </Data>
            </div>
        )
    })

    const date = moment(data.date).format('D MMM HH:mma')
    return (
        <Container>
            {renderInfo()}
            {renderCurrent(DEVICE_WEATHER_STRUCTURE)}
        </Container>
    )
}

export default CurrentDeviceWeather

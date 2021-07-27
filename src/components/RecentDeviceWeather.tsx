import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import {
    XAxis,
    YAxis,
} from 'recharts'
import { useDispatch, useSelector } from 'react-redux'

import Loader from './Loader'
import Charts from './Chartz'
import { BASE_AXIS, } from './ChartContainer'

import { getDeviceWeather, setCurrentDevice } from '../redux/slice/pws'
import { selectDeviceWeather, selectPwsDevices, selectCurrentDevice } from '../redux/selectors'
import { CHART_CONFIG } from '../types/chart'

const Container = styled.div`
    margin-bottom: 6rem;
`

const dataFor = (key: string) => (d: any) => d[key] && d[key].value

const formatTime = (d: string) => {
    const timeString = moment(d).format('ha')
    return timeString
}

const BASE_X_AXIS = {
    ...BASE_AXIS,
    reversed: true,
    dataKey: 'date',
    tickFormatter: (d: string) => formatTime(d),
}

const PWS_CHARTS: CHART_CONFIG = {
    outsideTemp: {
        title: 'Outside Temperature',
        keys: ['tempf', 'dewPoint', 'feelsLike'],
        axes: [{ ...BASE_X_AXIS, type: XAxis }, { ...BASE_AXIS, type: YAxis, domain: ['dataMin - 10', 'auto'] }]
    },
    insideTemp: {
        title: 'Inside Temperature',
        keys: ['tempinf', 'feelsLikeIn'],
        axes: [{ ...BASE_X_AXIS, type: XAxis }, { ...BASE_AXIS, type: YAxis, domain: ['dataMin - 10', 'auto'] }]
    },
    humidity: {
        title: 'Humidity',
        keys: ['humidity', 'humidityin'],
        axes: [{ ...BASE_X_AXIS, type: XAxis }, { ...BASE_AXIS, type: YAxis, domain: ['dataMin - 10', 'auto'] }]
    },
    pressure: {
        title: 'Pressure',
        keys: ['baromrelin', /* 'baromabsin' */],
        axes: [{ ...BASE_X_AXIS, type: XAxis }, { ...BASE_AXIS, type: YAxis, domain: ['dataMin - 0.1', 'auto'] }]
    },
    windSpeed: {
        title: 'Wind Speed',
        keys: ['windspeedmph', 'windgustmph'],
        axes: [{ ...BASE_X_AXIS, type: XAxis }, { ...BASE_AXIS, type: YAxis, }]
    },
    windDir: {
        title: 'Wind Direction',
        keys: ['winddir', 'windgustdir'],
        axes: [{ ...BASE_X_AXIS, type: XAxis }, { ...BASE_AXIS, type: YAxis, }]
    },
    rain: {
        title: 'Rain',
        keys: ['dailyrainin', 'hourlyrainin', 'eventrainin'],
        axes: [{ ...BASE_X_AXIS, type: XAxis }, { ...BASE_AXIS, type: YAxis, }]
    },
}


const RecentDeviceWeather = () => {
    const dispatch = useDispatch()
    const devices = useSelector(selectPwsDevices)
    const currentDevice = useSelector(selectCurrentDevice)
    const device = useMemo(() => {
        if (devices.length > 0) {
            return devices.find(dev => dev.macAddress === currentDevice)
        }
    }, [devices, currentDevice])

    const handleGetWeather = () => {
        if (device) {
            const { macAddress, apiKey } = device
            dispatch(getDeviceWeather(macAddress, apiKey))
        } else {
            const macs = devices.map(d => d.macAddress).sort()
            const macAddress = macs[0]
            macAddress && dispatch(setCurrentDevice(macAddress))
        }
    }


    useEffect(() => {
        handleGetWeather()
    }, [dispatch, device, devices])

    const deviceWeather = useSelector(selectDeviceWeather)

    if (deviceWeather.length === 0) { return <Loader/> }

    return (
        <Container>
            <Charts
            charts={PWS_CHARTS}
            data={deviceWeather}
            findFn={dataFor}
            />
        </Container>
    )
}

export default RecentDeviceWeather

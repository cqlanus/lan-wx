import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import {
    XAxis,
    YAxis,
    Legend,
    Tooltip
} from 'recharts'
import { useDispatch, useSelector } from 'react-redux'

import ChartContainer, { BASE_AXIS, getBaseElement } from './ChartContainer'
import { TooltipProps } from './Tooltip'

import { getDeviceWeather, setCurrentDevice } from '../redux/slice/pws'
import { selectDeviceWeather, selectPwsDevices, selectCurrentDevice } from '../redux/selectors'
import { CHART_CONFIG } from '../types/chart'

const Container = styled.div`
    padding: 0 1rem;
    margin-bottom: 6rem;
`

const dataFor = (key: string) => (d: any) => d[key]

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
const baseElement = getBaseElement(dataFor)

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

    return (
        <Container>
            {
                Object.entries(PWS_CHARTS).map(([k, val]) => {
                    return (
                        <ChartContainer
                            key={k}
                            title={val.title}
                            data={deviceWeather}
                        >
                            <Tooltip {...TooltipProps} />
                            {
                                val.axes.map(({ type: Axis, ...rest }, idx) => {
                                    return <Axis key={idx} {...rest} />
                                })
                            }
                            {
                                val.keys.map(baseElement)
                                    .map(({ type: ChartElement, name, ...rest }) =>
                                        <ChartElement key={name} dot={false} connectNulls name={name} {...rest} />
                                    )
                            }
                            <Legend iconType="plainline" verticalAlign="top" iconSize={20} wrapperStyle={{ fontSize: '0.6rem' }} />
                        </ChartContainer>
                    )
                })
            }
        </Container>
    )
}

export default RecentDeviceWeather

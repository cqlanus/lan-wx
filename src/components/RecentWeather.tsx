import React, { useEffect } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { XAxis, YAxis, } from 'recharts'

import Loader from './Loader'
import Charts from './Chartz'
import { BASE_AXIS, } from './ChartContainer'

import { getRecentWeather } from '../redux/slice/weather'
import { selectCoords, selectRecentWeather } from '../redux/selectors'
import type { CHART_CONFIG } from '../types/chart'

const dataFor = (key: string) => (d: any) => d[key] && d[key].value

const formatTime = (d: string) => {
    const timeString = moment(d).format('ha')
    return timeString
}

const BASE_X_AXIS = {
    ...BASE_AXIS,
    reversed: true,
    dataKey: 'timestamp',
    tickFormatter: (d: string) => formatTime(d),
}
const CHARTS: CHART_CONFIG = {
    temp: {
        title: "Temperature",
        keys: ['temperature', 'dewpoint'],
        axes: [{ ...BASE_X_AXIS, type: XAxis }, { ...BASE_AXIS, type: YAxis }]
    },
    percentages: {
        title: "Percentages",
        keys: ['relativeHumidity',],
        axes: [{ ...BASE_X_AXIS, type: XAxis }, { ...BASE_AXIS, type: YAxis }]
    },
    pressure: {
        title: 'Pressure',
        keys: ['barometricPressure', 'seaLevelPressure'],
        axes: [{ ...BASE_X_AXIS, type: XAxis }, { ...BASE_AXIS, type: YAxis, domain: ['dataMin - 10', 'auto'] }]
    },
    wind: {
        title: "Wind",
        keys: ['windSpeed', 'windGust'],
        axes: [{ ...BASE_X_AXIS, type: XAxis }, { ...BASE_AXIS, type: YAxis }]
    },
    precip: {
        title: "Precipitation",
        keys: ['precipitationLastHour',],
        axes: [{ ...BASE_X_AXIS, type: XAxis }, { ...BASE_AXIS, type: YAxis }]
    }
}

const RecentWeather = () => {
    const dispatch = useDispatch()
    const recent = useSelector(selectRecentWeather)
    const coords = useSelector(selectCoords)

    useEffect(() => {
        dispatch(getRecentWeather())
    }, [dispatch, coords])

    if (!recent || recent.length === 0) { return <Loader /> }

    return (
        <div>
            <Charts
                charts={CHARTS}
                data={recent}
                findFn={dataFor}
            />
        </div>
    )
}

export default RecentWeather

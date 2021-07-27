import React, { useEffect } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { XAxis, YAxis } from 'recharts'

import Loader from './Loader'
import Charts from './Chartz'
import { BASE_AXIS, } from './ChartContainer'

import { getDailyForecast } from '../redux/slice/weather'
import { getNorms } from '../redux/slice/climate'
import { selectCoords, selectDepartures } from '../redux/selectors'

import type { CHART_CONFIG } from '../types/chart'

const dataFor = (key: string) => (d: any) => d[key] && d[key].value
const formatTime = (d: string) => {
    const timeString = moment(d).format('MM-DD')
    return timeString
}

const BASE_X_AXIS = {
    ...BASE_AXIS,
    dataKey: (d: { date: string }) => {
        const dateStr = `${d.date}-20`.replace(/-/g, '/')
        return dateStr
    },
    tickFormatter: (d: string) => formatTime(d),
}

const CHARTS: CHART_CONFIG = {
    temp: {
        title: "Temp HI",
        keys: ['forecastHI', 'normalHI'],
        axes: [{ ...BASE_X_AXIS, type: XAxis }, { ...BASE_AXIS, type: YAxis, domain: ['dataMin - 5', 'auto'] }]
    },
    percentages: {
        title: "Temp LO",
        keys: ['forecastLO', 'normalLO',],
        axes: [{ ...BASE_X_AXIS, type: XAxis }, { ...BASE_AXIS, type: YAxis, domain: ['dataMin - 5', 'auto'] }]
    },
    pressure: {
        title: 'Departures',
        keys: ['departureHI', 'departureLO'],
        axes: [{ ...BASE_X_AXIS, type: XAxis }, { ...BASE_AXIS, type: YAxis, domain: ['dataMin - 5', 'auto'] }]
    },
}


const Departures = () => {
    const dispatch = useDispatch()
    const coords = useSelector(selectCoords)
    const departures = useSelector(selectDepartures)
    useEffect(() => {
        dispatch(getDailyForecast())
        dispatch(getNorms())
    }, [dispatch, coords])

    if (departures.length === 0) { return <Loader/> }

    return (
        <div>
            <Charts
            charts={CHARTS}
            data={departures}
            findFn={dataFor}
            />
        </div>
    )
}

export default Departures

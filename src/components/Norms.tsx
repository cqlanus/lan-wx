import React, { useEffect } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {
    XAxis,
    YAxis,
    Legend,
    Tooltip
} from 'recharts'

import Loader from './Loader'
import ChartContainer, { BASE_AXIS, getBaseElement } from './ChartContainer'
import { TooltipProps } from './Tooltip'

import { getNorms } from '../redux/slice/climate'
import { selectCoords, selectNormsByMonth } from '../redux/selectors'
import getTheme from '../themes'
import type { CHART_CONFIG } from '../types/chart'

const dataFor = (key: string) => (d: any) => {
    if (d[key]) {
        const { value } = d[key]
        return value < -100 ? null : value
    }
}

const formatTime = (d: string) => {
    const timeString = moment(d).format('MM-DD')
    return timeString
}

const formatDate = (d: string) => `${d}-2020`.replace(/-/g, '/')

const BASE_X_AXIS = {
    ...BASE_AXIS,
    dataKey: (d: any) => {
        const dateStr = formatDate(d.DATE)
        const date = moment(dateStr).format('MM/DD/YYYY')
        return date
    },
    tickFormatter: (d: string) => formatTime(d),
    mirror: false,
}

// STYLED COMPONENTS
const PageContainer = styled.div`
    margin-bottom: 8rem;
`

const Title = styled.h3``

const baseElement = getBaseElement(dataFor)

const CHARTS: CHART_CONFIG = {
    temp: {
        title: 'Temperature Norms',
        keys: ['DLY-TMAX-NORMAL', 'DLY-TMIN-NORMAL', 'DLY-DUTR-NORMAL'],
        axes: [{ ...BASE_X_AXIS, type: XAxis }, { ...BASE_AXIS, type: YAxis }]
    },
    precip: {
        title: 'Precipitation Norms',
        keys: ['DLY-PRCP-25PCTL', 'DLY-PRCP-50PCTL', 'DLY-PRCP-75PCTL'],
        axes: [{ ...BASE_X_AXIS, type: XAxis }, { ...BASE_AXIS, type: YAxis }]
    },
    degreeDay: {
        title: 'Degree Days',
        keys: ['DLY-GRDD-TB5086', 'DLY-HTDD-NORMAL', 'DLY-CLDD-NORMAL'],
        axes: [{ ...BASE_X_AXIS, type: XAxis }, { ...BASE_AXIS, type: YAxis }]
    },
    snow: {
        title: 'Snow Norms',
        keys: ['DLY-SNOW-25PCTL', 'DLY-SNOW-50PCTL', 'DLY-SNOW-75PCTL'],
        axes: [{ ...BASE_X_AXIS, type: XAxis }, { ...BASE_AXIS, type: YAxis }]
    },
    precipProbs: {
        title: 'Precip Probabilities',
        keys: ['DLY-PRCP-PCTALL-GE001HI', 'DLY-PRCP-PCTALL-GE050HI', 'DLY-PRCP-PCTALL-GE100HI'],
        axes: [{ ...BASE_X_AXIS, type: XAxis }, { ...BASE_AXIS, type: YAxis }]
    },
    snowProbs: {
        title: 'Snow Probabilities',
        keys: ['DLY-SNOW-PCTALL-GE001TI', 'DLY-SNOW-PCTALL-GE010TI', 'DLY-SNOW-PCTALL-GE100TI'],
        axes: [{ ...BASE_X_AXIS, type: XAxis }, { ...BASE_AXIS, type: YAxis }]
    }
}

const Norms = () => {
    const dispatch = useDispatch()
    const coords = useSelector(selectCoords)
    const norms = useSelector(selectNormsByMonth)

    useEffect(() => {
        dispatch(getNorms())
    }, [dispatch, coords,])

    if (norms.length === 0) { return <Loader/> }

    return (
        <PageContainer>
            <Title>Climate Norms</Title>
            {
                Object.entries(CHARTS).map(([k, val]) => {
                    return (
                        <ChartContainer
                            key={k}
                            title={val.title}
                            data={norms}
                        >
                            <Tooltip {...TooltipProps(getTheme())} />
                            {
                                val.axes.map(({ type: Axis, style, ...rest }, idx) => {
                                    return <Axis key={idx} style={{ ...style, fill: getTheme().fg }} {...rest} />
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
        </PageContainer >
    )
}

export default Norms

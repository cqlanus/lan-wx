import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import styled from 'styled-components'
import {
    ComposedChart,
    Line,
    XAxis,
    YAxis,
    Legend,
    ResponsiveContainer,
    CartesianGrid,
    Tooltip,
} from 'recharts'
import { getNorms } from '../redux/slice/climate'
import { selectCoords, selectNorms } from '../redux/selectors'

const dataFor = (key: string) => (d: any) => {
    if (d[key]) {
        const { value } = d[key]
        return value < -100 ? null : value
    }
}

// STYLED COMPONENTS
const PageContainer = styled.div`
    margin-bottom: 8rem;
`

const Container = styled.div`
    width: 100%;
    height: 25vh;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px dashed black;

    &:last-child {
        border-bottom: none;
    }
`

const Title = styled.h3``

const Subtitle = styled.h4`
    margin: 0.5rem 0;
`

type CHART_CONFIG = {
    [key: string]: {
        title: string,
        keys: Array<string>,
        axes: Array<{ type: any, dataKey?: any, style?: object }>
    }
}

const BASE_AXIS = { style: { fontSize: '0.6rem' } }
const BASE_X_AXIS = { ...BASE_AXIS, dataKey: 'date' }
const DASH_PATTERNS = ['', '2 2', '5 5']
const baseElement = (key: string, idx: number) => ({ name: key, type: Line, dataKey: dataFor(key), stroke: 'rgba(0,0,0,0.7)', strokeWidth: '1.5', strokeDasharray: DASH_PATTERNS[idx] })

const CHARTS: CHART_CONFIG = {
    temp: {
        title: 'Temperature Norms',
        keys: ['DLY-TMAX-NORMAL', 'DLY-TMIN-NORMAL', 'DLY-DUTR-NORMAL'],
        axes: [{ ...BASE_X_AXIS, type: XAxis }, { ...BASE_AXIS, type: YAxis }]
    },
    precip: {
        title: 'Precipitation Norms',
        keys: [ 'DLY-PRCP-25PCTL', 'DLY-PRCP-50PCTL', 'DLY-PRCP-75PCTL'],
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
    const norms = useSelector(selectNorms)

    useEffect(() => {
        dispatch(getNorms())
    }, [dispatch, coords,])
    return (
        <PageContainer>
            <Title>Climate Norms</Title>
            {
                Object.entries(CHARTS).map(([k, val]) => {
                    return (
                        <Container key={k}>
                            <Subtitle>{val.title}</Subtitle>
                            <ResponsiveContainer height="90%" width="100%">
                                <ComposedChart data={norms}>
                                    <CartesianGrid />
                                    {
                                        val.axes.map(({ type: Axis, ...rest }, idx) => {
                                            return <Axis key={idx} {...rest} mirror />
                                        })
                                    }
                                    {
                                        val.keys.map(baseElement)
                                            .map(({ type: ChartElement, name, ...rest }) =>
                                                <ChartElement key={name} dot={false} connectNulls dataKey={dataFor(name)} name={name} {...rest} />
                                            )
                                    }

                                    <Legend iconType="plainline" verticalAlign="top" iconSize={20} wrapperStyle={{ fontSize: '0.6rem' }} />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </Container>
                    )
                })
            }
        </PageContainer >
    )
}

export default Norms

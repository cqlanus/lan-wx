import React from 'react'
import styled from 'styled-components'
import {
    ComposedChart,
    ResponsiveContainer,
    CartesianGrid,
    Line
} from 'recharts'
import getTheme from '../themes'

const Container = styled.div`
    width: 100%;
    height: 25vh;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px dashed ${() => getTheme().fg};

    &:last-child {
    border-bottom: none;
    }
`

const Subtitle = styled.h4`
    margin: 0.5rem 0;
`

type Props = {
    title: string,
    data: any[],
    children: any
}
const ChartContainer = ({ title, data, children }: Props) => {
    return (
        <Container>
            { title && <Subtitle>{title}</Subtitle> }
            <ResponsiveContainer height="90%" width="100%">
                <ComposedChart data={data}>
                    <CartesianGrid/>
                    {children}
                </ComposedChart>
            </ResponsiveContainer>
        </Container>

    )
}

export default ChartContainer

export const BASE_AXIS = { style: { fontSize: '0.6rem' }, mirror: true }
export const DASH_PATTERNS = ['', '2 2', '5 5']
export const getBaseElement = (findFn: (k: string) => any) => 
    (key: string, idx: number) => 
        ({ name: key, type: Line, dataKey: findFn(key), stroke: getTheme().line, strokeWidth: '1.5', strokeDasharray: DASH_PATTERNS[idx] })

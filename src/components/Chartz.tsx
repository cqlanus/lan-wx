import React from 'react'
import {
    Legend,
    Tooltip,
    ReferenceLine,
} from 'recharts'

import ChartContainer, { getBaseElement } from './ChartContainer'
import { TooltipProps } from './Tooltip'
import getTheme from '../themes'

import type { CHART_CONFIG } from '../types/chart'

const baseElement = (findFn: (k: string) => any) => getBaseElement(findFn)

type ChartsArgs = {
    charts: CHART_CONFIG,
    data: any[],
    findFn: (k: string) => any,
    tooltipTitleFn?: any,
    tooltipLabelFn?: any,
}
const Charts = ({
    charts,
    data,
    findFn,
    tooltipTitleFn,
    tooltipLabelFn,
}: ChartsArgs) => (
        <>
            {
                Object.entries(charts).map(([k, val]) => {
                    return (
                        <ChartContainer
                            key={k}
                            title={val.title}
                            data={data}
                        >
                            <Tooltip {...TooltipProps(getTheme(), tooltipTitleFn, tooltipLabelFn)} />
                            {
                                val.axes.map(({ type: Axis, style, ...rest }, idx) => {
                                    return <Axis key={idx} style={{ ...style, fill: getTheme().fg }} {...rest} />
                                })
                            }
                            {
                                val.keys.map(baseElement(findFn))
                                    .map(({ type: ChartElement, name, ...rest }) =>
                                        <ChartElement key={name} dot={false} connectNulls name={name} {...rest} />
                                    )
                            }
                            <ReferenceLine y={0} strokeWidth={3} />

                            <Legend iconType="plainline" verticalAlign="top" iconSize={20} wrapperStyle={{ fontSize: '0.6rem' }} />
                        </ChartContainer>
                    )
                })
            }
        </>
    )

export default Charts

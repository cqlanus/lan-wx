import React from 'react'
import moment from 'moment'
import { Tooltip as Tool } from 'recharts'

const formatTooltip = (val: any, name: string) => {
    const formattedValue = val > 1 ? Math.round(val) : val
    const hasDashes = /-/.test(name)
    let formattedName = ''
    if (hasDashes) {
        formattedName = name.split('-').map(w => w[0]).join('')
    } else {
        formattedName = name.replace(/[A-Z]/g, (x: any) => `_${x.toLowerCase()}`).split('_').map(w => w[0]).join('')
    }
    return [formattedValue, formattedName]
}
const formatTooltipLabel = (val: any) => {
    return moment(val).format('M/D|ha')
}

export const TooltipProps = {
    formatter: formatTooltip,
    labelFormatter: formatTooltipLabel,
    contentStyle: { fontSize: '0.6rem' }
}

const Tooltip = () => (
    <Tool
        formatter={formatTooltip}
        labelFormatter={formatTooltipLabel}
        contentStyle={{ fontSize: '0.6rem' }} />
)

export default Tooltip

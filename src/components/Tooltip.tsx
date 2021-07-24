import React from 'react'
import moment from 'moment'
import { Tooltip as Tool } from 'recharts'
import { displayUnit } from '../utils/units'
import getTheme from '../themes'
import { Theme } from '../types/theme'

const formatTooltip = (val: any, name: string, { payload }: any) => {
    const { unit } = payload[name] || {}
    const formattedValue = val > 1 ? Math.round(val) : val
    const hasDashes = /-/.test(name)
    let formattedName = ''
    if (hasDashes) {
        formattedName = name.split('-').map(w => w[0]).join('')
    } else {
        formattedName = name.replace(/[A-Z]/g, (x: any) => `_${x.toLowerCase()}`).split('_').map(w => w[0]).join('')
    }
    const disUnit = displayUnit(unit)
    const finalValue = `${formattedValue}${disUnit}`
    return [finalValue, formattedName]
}
const formatTooltipLabel = (val: any) => {
    return moment(val).format('M/D|ha')
}

export const TooltipProps = (theme: Theme, labelFormat?: any, formatter?: any) => ( {
    formatter: formatter || formatTooltip,
    labelFormatter: labelFormat || formatTooltipLabel,
    contentStyle: { fontSize: '0.6rem', backgroundColor: theme.bg  }
} )

const Tooltip = () => (
    <Tool
        formatter={formatTooltip}
        labelFormatter={formatTooltipLabel}
        contentStyle={{ fontSize: '0.6rem' }} />
)

export default Tooltip

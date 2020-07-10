import * as math from 'mathjs'
import type { WeatherValue } from '../types/weather'
import emoji from '../data/emoji'

math.createUnit('mb', '0.001 bar')
math.createUnit('inHg', '0.03386 bar')
math.createUnit('Wm2', 'W/m^2')

export const convertUnits = (fromUnit: string, toUnit: string, value: number) => {
    const unit = math.unit(value, fromUnit)
    return unit.to(toUnit)
}

const DISPLAY_UNIT_MAP: any = {
    degF: '°F',
    deg: '°',
    degC: '°C',
    'degree_(angle)': '°',
    percent: '%',
    'm_s-1': 'm/s',
    'mi/h': 'mph',
    'in': '"'
}

export const degreesToCompass = (value: number) => {
    const val = Math.round(value / 22.5)
    const compassVals = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
    const index = val % 16
    return (compassVals[index])
}

const degreesToCompassSimple = (value: number) => {
    const val = Math.round(value / 45)
    const compassVals = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW',]
    const index = val % 8
    return (compassVals[index])
}

export const displayUnit = (unit: string | undefined) => {
    if (unit) {
        return DISPLAY_UNIT_MAP[unit] || unit
    }
    return ''
}

export const getDisplayUnit = ({ value, unit }: WeatherValue, key?: string) => {
    const isWindDir = key && [ 'windDirection', 'winddir' ].includes(key)
    if (isWindDir) {
        const simple = degreesToCompassSimple(value)
        const arrow: { [key: string]: string } = emoji.arrow
        const icon = arrow[simple.toLowerCase()]
        return `${degreesToCompass(value)} ${icon}`
    }

    const isHumidity = key && [ 'humidity', 'humidityin' ].includes(key)
    if (isHumidity) {
        return `${value}%`
    }

    const displayUnit = DISPLAY_UNIT_MAP[unit]
    return `${value} ${displayUnit || unit}`
}


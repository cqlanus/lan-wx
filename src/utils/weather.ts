import { has, split } from 'ramda'
import { convertUnits } from './units'
import type { NWSValue, CurrentWeatherResponse } from '../types/weather'

const DEFAULT_UNITS: { [key: string]: [ string, string ] } = {
    elevation: ['ft', 'm'],
    temperature: ['degF', 'degC'],
    dewpoint: ['degF', 'degC'],
    barometricPressure: ['mb', 'Pa'],
    seaLevelPressure: ['mb', 'Pa'],
    windSpeed: ['mi/h', 'm/s'],
    visibility: ['mi', 'm'],
}

export const parseNwsValue = ({ value, unitCode }: NWSValue, key: string) => {
    // tslint:disable-next-line no-unused-vars
    const [_, unit] = split(':', unitCode)
    const convertableValue  = DEFAULT_UNITS[key]
    if (convertableValue && value) {
        const [ toUnit, fromUnit ] = convertableValue
        const convertedValue = convertUnits(fromUnit, toUnit, value)
        const rounded = parseFloat(convertedValue.toNumber(toUnit).toFixed(3))
        return { value: rounded, unit: toUnit }
    }
    value = value ? parseFloat(value.toFixed(3)) : value
    return { value, unit }
}

export const parseCurrentWeather = (current: CurrentWeatherResponse): any => {
    const parsed = Object.entries(current).reduce((final, [key, value]) => {
        const weatherValue = has('unitCode', value) ? parseNwsValue(value, key) : value
        return {
            ...final,
            [key]: weatherValue
        }
    }, {})
    return parsed
}

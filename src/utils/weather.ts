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
    windGust: ['mi/h', 'm/s'],
    visibility: ['mi', 'm'],
}

export const parseNwsValue = ({ value, unitCode }: NWSValue, key: string) => {
    // tslint:disable-next-line no-unused-vars
    const [_, unit] = split(':', unitCode)
    const convertableValue  = DEFAULT_UNITS[key]
    if (convertableValue && value) {
        const [ toUnit, fromUnit ] = convertableValue
        const convertedValue = convertUnits(fromUnit, toUnit, +value)
        const num = convertedValue.toNumber(toUnit)
        const rounded = parseFloat(num.toFixed(3))
        return { value: rounded, unit: toUnit }
    }
    value = value ? parseFloat(Number(value).toFixed(3)) : value
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

export const normalizeForecastUnits = (forecastItems: Array<CurrentWeatherResponse>) => {
    return forecastItems.map(parseCurrentWeather)
}

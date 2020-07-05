import { has, split } from 'ramda'
import { convertUnits } from './units'
import type { NWSValue, CurrentWeatherResponse, DeviceWeather } from '../types/weather'

type UNIT_STRUCTURE = { [key: string]: [string, string] }
const DEFAULT_UNITS: UNIT_STRUCTURE = {
    elevation: ['ft', 'm'],
    temperature: ['degF', 'degC'],
    apparentTemperature: ['degF', 'degC'],
    dewpoint: ['degF', 'degC'],
    barometricPressure: ['mb', 'Pa'],
    seaLevelPressure: ['mb', 'Pa'],
    windSpeed: ['mi/h', 'km/h'],
    windGust: ['mi/h', 'km/h'],
    visibility: ['mi', 'm'],
    windChill: ['degF', 'degC'],
    heatIndex: ['degF', 'degC'],
}

const DEFAULT_DEVICE_UNITS: UNIT_STRUCTURE = {
    baromrelin: ['mb', 'inHg'],
    baromabsin: ['mb', 'inHg'],
    tempinf: ['degF', 'degF'],
    tempf: ['degF', 'degF'],
    feelsLike: ['degF', 'degF'],
    feelsLikein: ['degF', 'degF'],
    // humidity: [ 'm', 'm' ],
    // humidityin: ['m', 'm'],
    winddir: ['deg', 'deg'],
    windgustmph: ['mi/h', 'mi/h'],
    windspeedmph: ['mi/h', 'mi/h'],
    maxdailygust: ['mi/h', 'mi/h'],
    dewPoint: ['degF', 'degF'],
    dewPointin: ['degF', 'degF'],
    hourlyrainin: ['in', 'in'],
    eventrainin: ['in', 'in'],
    dailyrainin: ['in', 'in'],
    weeklyrainin: ['in', 'in'],
    monthlyrainin: ['in', 'in'],
    totalrainin: ['in', 'in'],
    // solarradiation: ['Wm2', 'Wm2'],
    // uv: ['m', 'm'],
    // dateutc: ['m', 'm']
}

const normalizeUnits = (value: string | number, key: string, units: UNIT_STRUCTURE) => {
    if (typeof value === "string") { return value }

    const convertableValue = units[key]
    if (!convertableValue) { return { value, unit: null } }

    const [toUnit, fromUnit] = convertableValue
    const convertedValue = convertUnits(fromUnit, toUnit, +value)
    const num = convertedValue.toNumber(toUnit)
    const rounded = parseFloat(num.toFixed(3))
    return { value: rounded, unit: toUnit }
}

export const parseValue = ({ value, unitCode }: NWSValue, key: string, units: UNIT_STRUCTURE) => {
    // tslint:disable-next-line no-unused-vars
    const [_, unit] = split(':', unitCode)
    const convertableValue = units[key]
    if (convertableValue && value) {
        const [toUnit, fromUnit] = convertableValue
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
        const weatherValue = has('unitCode', value) ? parseValue(value, key, DEFAULT_UNITS) : value
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


export const parseDeviceWeather = (deviceWeather: DeviceWeather) => {
    const parsed = Object.entries(deviceWeather).reduce((final, [key, value]) => {
        const convertedValue = normalizeUnits(value, key, DEFAULT_DEVICE_UNITS)
        return {
            ...final,
            [key]: convertedValue
        }
    }, {})
    return parsed
}

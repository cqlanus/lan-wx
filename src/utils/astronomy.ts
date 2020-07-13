import { convertUnits, degreesToCompass } from './units'

type ConvertableUnit = [string, string]
type AstroUnits = {
    [key: string]: ConvertableUnit,
}
type AstroPosition = {
    azimuth: number,
    moon_azimuth: number,
    altitude: number,
    moon_altitude: number
}
type AstroData = {
    position: AstroPosition
}

type UnitValue = { value: string | number, unit: string }
type ReturnAstroData = {
    azimuth: UnitValue,
    moon_azimuth: UnitValue,
    altitude: UnitValue,
    moon_altitude: UnitValue
}

const ASTRO_UNITS: AstroUnits = {
    azimuth: ['deg', 'rad'],
    altitude: ['deg', 'rad'],
    moon_azimuth: ['deg', 'rad'],
    moon_altitude: ['deg', 'rad'],
}

export const parseAstronomyPosition = (astroData: AstroData) => {
    const { position } = astroData

    const parsed = Object.entries(position).reduce((final, [key, value]): ReturnAstroData => {
        const convertable = ASTRO_UNITS[key]
        if (convertable) {
            const [toUnit, fromUnit] = convertable
            const converted = convertUnits(fromUnit, toUnit, value)
            const num = converted.toNumber(toUnit)
            const rounded = parseFloat(num.toFixed(3))
            const finalVal = normalizeAzimuth(key, rounded)
            return {
                ...final,
                [key]: { value: finalVal, unit: toUnit }
            }
        }
        return final
    }, ({} as ReturnAstroData))
    return parsed
}

const correctForNegative = (angle: number) => angle < 0 ? angle + 360 : angle

const normalizeAzimuth = (key: string, value: number) => {
    const isAzi = key.toLowerCase().includes('azimuth')
    if (isAzi) {
        const corrected = correctForNegative(value)
        const northReferenced = (corrected + 180) % 360
        return degreesToCompass(northReferenced)
    }
    return value
}

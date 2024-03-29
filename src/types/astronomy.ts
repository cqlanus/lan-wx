import { CloudLayer, NWSValue } from "./weather"

export type SetRise = {
    set: string,
    rise: string,
    culm: {
        time: string,
        coords: {
            azimuth: number,
            altitude: number,
            ra: number,
            dec: number
        }
    }
}

export type BodyPosition = {
    ra: number,
    dec: number,
    alt: number,
    az: number
}

export type BodyTimes = {
    [key: string]: SetRise
}

export type BodyPositions = {
    [key: string]: BodyPosition
} & { date: string }

type AstroTimes = {
    solarNoon: Date,
    nadir: Date,
    sunrise: Date,
    sunset: Date,
    sunriseEnd: Date,
    sunriseStart: Date,
    dawn: Date,
    dusk: Date,
    nauticalDawn: Date,
    nauticalDusk: Date,
    nightEnd: Date,
    night: Date,
    goldenHourEnd: Date,
    goldenHour: Date,
    moonrise: Date,
    moonset: Date,
}

export type AstroDuration = {
    hours: number,
    minutes: number,
    seconds: number,
    compared?: "shorter" | "longer"
}

export type AstroTimeCompare = {
    tomorrow: AstroDuration,
    yesterday: AstroDuration,
}

export type SunSummary = {
    times: AstroTimes,
    position: BodyPosition,
    compared: AstroTimeCompare,
    lengths: { [key: string]: AstroDuration }
}

export type MoonSummary = {
    times: AstroTimes,
    position: BodyPosition,
    compared: AstroTimeCompare,
    lengths: { [key: string]: AstroDuration }
}

export type MoonPhase = {
    value: number,
    name: string,
    illumination: number,
}

export type NextQuarter = {
    quarter: number,
    date: string
}

export type MoonPhaseData = {
    date: string,
    phase: MoonPhase,
    nextQuarters: NextQuarter[]
}

export type DayLength = {
    date: string,
    times: AstroTimes,
}

export type AQI = {
    date: string,
    time: string,
    aqsid: string,
    sitename: string,
    gmtoffset: string,
    param: string,
    units: string,
    value: string,
    source: string
}

export type CurrentAstroConditions = {
    cloudLayers: CloudLayer[],
    aqi: AQI,
    dewpoint: NWSValue,
    isNauticalTwilight: boolean,
    isNight: boolean,
    moonPosition: BodyPosition
}

export type AstroTimepoint = {
    cloudcover: number,
    seeing: number,
    transparency: number,
    lifted_index: number,
    date: Date,
    timepoint: number,
}

export type AstroForecast = {
    date: Date,
    dataseries: AstroTimepoint[]
}

import { utcToZonedTime, format } from 'date-fns-tz'
import { getConfigVar, request } from '../../utils'
import type { Coords } from '../../types/location'
import {
    BodyTimes,
    BodyPositions,
    SunSummary,
    MoonSummary,
    MoonPhaseData,
    DayLength,
    CurrentAstroConditions,
} from '../../types/astronomy'
import { addDays } from 'date-fns'

export default class Astronomy {
    BASE = getConfigVar('LAN_WX_API')

    getSummary = async ({ latitude, longitude }: Coords): Promise<any> => {
        const url = `${this.BASE}/astronomy/summary?lat=${latitude}&lon=${longitude}`
        return await request(url)
    }

    getPositions = async ({ latitude, longitude }: Coords, date: Date): Promise<BodyPositions> => {
        const url = `${this.BASE}/astronomy/positions?lat=${latitude}&lon=${longitude}&date=${date}`
        return await request(url)
    }

    getTimes = async ({ latitude, longitude }: Coords): Promise<BodyTimes> => {
        const url = `${this.BASE}/astronomy/times?lat=${latitude}&lon=${longitude}`
        return await request(url)
    }

    getSunSummary = async ({ latitude, longitude }: Coords): Promise<SunSummary> => {
        const url = `${this.BASE}/astronomy/sun?lat=${latitude}&lon=${longitude}`
        return await request(url)
    }

    getMoonSummary = async ({ latitude, longitude }: Coords): Promise<MoonSummary> => {
        const url = `${this.BASE}/astronomy/moon?lat=${latitude}&lon=${longitude}`
        return await request(url)
    }

    getMoonPhases = async ({ latitude, longitude }: Coords): Promise<MoonPhaseData> => {
        const url = `${this.BASE}/astronomy/moonphase?lat=${latitude}&lon=${longitude}`
        return await request(url)
    }

    getDayLengths = async ({ latitude, longitude }: Coords): Promise<DayLength[]> => {
        const start = '2021-01-01'
        const end = '2021-12-31'
        const url = `${this.BASE}/astronomy/interval/daylengths?lat=${latitude}&lon=${longitude}&start=${start}&end=${end}`
        return await request(url)
    }

    getPositionTimeseries = async ({ latitude, longitude }: Coords): Promise<BodyPositions[]> => {
        const today = new Date()
        const start = format(today, 'yyyy-MM-dd')
        const end = format(addDays(today, 1), 'yyyy-MM-dd')
        const url = `${this.BASE}/astronomy/interval/positions?lat=${latitude}&lon=${longitude}&start=${start}&end=${end}`
        return await request(url)
    }

    getCurrentAstroConditions = async ({ latitude, longitude }: Coords): Promise<CurrentAstroConditions> => {
        const url = `${this.BASE}/astronomy/current?lat=${latitude}&lon=${longitude}`
        return await request(url)
    }

}

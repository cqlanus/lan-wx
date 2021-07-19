import { getConfigVar, request } from '../../utils'
import type { Coords } from '../../types/location'
import { BodyTimes, BodyPositions, SunSummary, MoonSummary } from '../../types/astronomy'

export default class Astronomy {
    BASE = getConfigVar('LAN_WX_API')

    getSummary = async ({ latitude, longitude }: Coords): Promise<any> => {
        const url = `${this.BASE}/astronomy/summary?lat=${latitude}&lon=${longitude}`
        return await request(url)
    }

    getPositions = async ({ latitude, longitude }: Coords): Promise<BodyPositions> => {
        const url = `${this.BASE}/astronomy/positions?lat=${latitude}&lon=${longitude}`
        return await request(url)
    }

    getMoonPhases = async ({ latitude, longitude }: Coords): Promise<any> => {
        const url = `${this.BASE}/astronomy/moonphase?lat=${latitude}&lon=${longitude}`
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
}

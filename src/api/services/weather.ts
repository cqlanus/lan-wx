import { getConfigVar } from '../../utils'
import { parseCurrentWeather } from '../../utils/weather'
import type { CurrentWeather } from '../../types/weather'
import type { Coords } from '../../types/location'

export default class Weather {
    BASE = getConfigVar('LAN_WX_API')
    getCurrentConditions = async ({ latitude, longitude }: any): Promise<CurrentWeather> => {
        const url = `${this.BASE}/current/${latitude}/${longitude}`
        const resp = await fetch(url)
        const data = await resp.json()
        const parsed = parseCurrentWeather(data)
        return parsed
    }

    getDailyForecast = async ({ latitude, longitude }: any): Promise<any> => {
        const url = `${this.BASE}/forecast/sevenday/${latitude}/${longitude}`
        const resp = await fetch(url)
        const data = await resp.json()
        return data
    }

    getUpperAirChart = async (isobar = '500', timeOfDay = 'morning'): Promise<any> => {
        const url = `${this.BASE}/charts/upperair/${isobar}/${timeOfDay}`
        const resp = await fetch(url)
        return await resp.json()
    }

    getSkewTChart = async ({ latitude, longitude }: any, timeOfDay = 'morning'): Promise<any> => {
        const url = `${this.BASE}/charts/sounding/${latitude}/${longitude}/${timeOfDay}`
        const resp = await fetch(url)
        return await resp.json()
    }

    getSurfaceChart = async (timeOfDay = '00', surfaceObservations = true): Promise<any> => {
        const queryString = surfaceObservations ? '' : '?fronts=1'
        const url = `${this.BASE}/charts/surface/${timeOfDay}${queryString}`
        const resp = await fetch(url)
        return await resp.json()
    }

    getForecastDiscussion = async ({ latitude, longitude }: Coords): Promise<any> => {
        const url = `${this.BASE}/forecast/discussion/${latitude}/${longitude}`
        const resp = await fetch(url)
        return await resp.json()
    }

    getDetailedForecast = async ({ latitude, longitude }: Coords): Promise<any> => {
        const url = `${this.BASE}/forecast/grid/${latitude}/${longitude}`
        const resp = await fetch(url)
        return await resp.json()
    }
}

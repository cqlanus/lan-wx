import { getConfigVar } from '../../utils'
import { parseCurrentWeather } from '../../utils/weather'
import type { CurrentWeather } from '../../types/weather'

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
}

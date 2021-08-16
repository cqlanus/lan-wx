import moment from 'moment'

import { getConfigVar, request } from '../../utils'
import { parseCurrentWeather } from '../../utils/weather'
// import sample_alert from '../../data/sample_alert.json'
import type { CurrentWeather } from '../../types/weather'
import type { Coords } from '../../types/location'

export default class Weather {
    BASE = getConfigVar('LAN_WX_API')
    getCurrentConditions = async ({ latitude, longitude }: Coords): Promise<CurrentWeather> => {
        const url = `${this.BASE}/current/${latitude}/${longitude}`
        const data = await request(url)
        const parsed = parseCurrentWeather(data)
        return parsed
    }

    getRecentConditions = async({ latitude, longitude }: Coords, limit: number | undefined): Promise<any[]> => {
        const url = `${this.BASE}/recent/${latitude}/${longitude}`
        const finalUrl = limit ? `${url}?limit=${limit}` : url
        const data = await request(finalUrl)
        const parsed = data.map((d: any) => d.properties).map(parseCurrentWeather)
        return parsed
    }

    getDailyForecast = async ({ latitude, longitude }: any): Promise<any> => {
        const url = `${this.BASE}/forecast/sevenday/${latitude}/${longitude}`
        return await request(url)
    }

    getUpperAirChart = async (isobar = '500', timeOfDay = 'morning'): Promise<any> => {
        const url = `${this.BASE}/charts/upperair/${isobar}/${timeOfDay}`
        return await request(url)
    }

    getSkewTChart = async ({ latitude, longitude }: any, date: string, timeOfDay = 'morning'): Promise<any> => {
        const url = `${this.BASE}/charts/sounding/${latitude}/${longitude}/${date}/${timeOfDay}`
        return await request(url)
    }

    getSurfaceChart = async (timeOfDay = '00', surfaceObservations = true): Promise<any> => {
        const queryString = surfaceObservations ? '' : '?fronts=1'
        const url = `${this.BASE}/charts/surface/${timeOfDay}${queryString}`
        return await request(url)
    }

    getForecastDiscussion = async ({ latitude, longitude }: Coords): Promise<any> => {
        const url = `${this.BASE}/forecast/discussion/${latitude}/${longitude}`
        return await request(url)
    }

    getDetailedForecast = async ({ latitude, longitude }: Coords): Promise<any> => {
        const url = `${this.BASE}/forecast/grid/${latitude}/${longitude}?parse=1`
        return await request(url)
    }

    getModelGuidance = async (model: string, product: string, forecastHour: string) => {
        const currentTime = moment().format()
        const url = `${this.BASE}/charts/model/${model}/${forecastHour}/${product}?currentTime=${currentTime}`
        return await request(url)
    }

    getAlerts = async (zoneId: string) => {
        // return Promise.resolve(sample_alert)
        const url = `${this.BASE}/alerts/${zoneId}`
        return await request(url)
    }
}

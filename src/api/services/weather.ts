import { getConfigVar } from '../../utils'
import { parseCurrentWeather } from '../../utils/weather'
import type { CurrentWeatherResponse } from '../../types/weather'

export default class Weather {
    BASE = getConfigVar('LAN_WX_API')
    getCurrentConditions = async ({ latitude, longitude }: any): Promise<CurrentWeatherResponse> => {
        const url = `${this.BASE}/current/${latitude}/${longitude}`
        const resp = await fetch(url)
        const data = await resp.json()
        const parsed = parseCurrentWeather(data)
        return parsed
    }
}

import { getConfigVar } from '../../utils'

export default class Weather {
    BASE = getConfigVar('LAN_WX_API')
    getCurrentConditions = async ({ latitude, longitude }: any): Promise<any> => {
        const url = `${this.BASE}/current/${latitude}/${longitude}`
        const resp = await fetch(url)
        const data = await resp.json()
        return data
    }
}

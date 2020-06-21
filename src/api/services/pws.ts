import { getConfigVar, request } from '../../utils'

export default class PWS {
    BASE = getConfigVar('LAN_WX_API')

    getDeviceWeather = async (macAddress: string, apiKey: string): Promise<any[]> => {
        const url = `${this.BASE}/pws/${macAddress}?apiKey=${apiKey}`
        const data = await request(url)
        return data
    }
}

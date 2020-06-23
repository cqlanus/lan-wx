import { getConfigVar, request } from '../../utils'
import { DeviceInfo } from '../../types/pws'

export default class PWS {
    BASE = getConfigVar('LAN_WX_API')

    getDeviceWeather = async (macAddress: string, apiKey: string): Promise<any[]> => {
        const url = `${this.BASE}/pws/${macAddress}?apiKey=${apiKey}`
        const data = await request(url)
        return data
    }

    getDeviceInfo = async (macAddress: string, apiKey: string): Promise<DeviceInfo> => {
        const url = `${this.BASE}/pws/info/${macAddress}?apiKey=${apiKey}`
        const data = await request(url)
        return data
    }

}

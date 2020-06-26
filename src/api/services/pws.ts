import { getConfigVar, request } from '../../utils'
import { DeviceInfo } from '../../types/pws'

export default class PWS {
    BASE = getConfigVar('LAN_WX_API')

    addDevice = async (macAddress: string, apiKey: string, userId: string): Promise<any> => {
        const url = `${this.BASE}/pws/`
        const body = { macAddress, apiKey, userId }
        const created = await request(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return created
    }

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

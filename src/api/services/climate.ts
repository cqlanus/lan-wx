import { getConfigVar, request } from '../../utils'
import type { Coords } from '../../types/location'

export default class Climate {
    BASE = getConfigVar('LAN_WX_API')

    getNorms = async ({ latitude, longitude }: Coords): Promise<any> => {
        const url = `${this.BASE}/norms/${latitude}/${longitude}`
        return await request(url)
    }

    getAlmanac = async ({ latitude, longitude }: Coords): Promise<any> => {
        const url = `${this.BASE}/almanac/${latitude}/${longitude}`
        return await request(url)
    }

    getAstronomy = async ({ latitude, longitude }: Coords): Promise<any> => {
        const url = `${this.BASE}/astronomy/summary?lat=${latitude}&lon=${longitude}`
        return await request(url)
    }
}

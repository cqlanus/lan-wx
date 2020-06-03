import { getConfigVar } from '../../utils'
import type { Coords } from '../../types/location'

export default class Climate {
    BASE = getConfigVar('LAN_WX_API')

    getNorms = async ({ latitude, longitude }: Coords): Promise<any> => {
        const url = `${this.BASE}/norms/${latitude}/${longitude}`
        const resp = await fetch(url)
        const data = await resp.json()
        return data
    }

    getAlmanac = async ({ latitude, longitude }: Coords): Promise<any> => {
        const url = `${this.BASE}/almanac/${latitude}/${longitude}`
        const resp = await fetch(url)
        const data = await resp.json()
        return data
    }

    getAstronomy = async ({ latitude, longitude }: Coords): Promise<any> => {
        const url = `${this.BASE}/astronomy/${latitude}/${longitude}`
        const resp = await fetch(url)
        const data = await resp.json()
        return data
    }
}

import { getConfigVar, request } from '../../utils'

export default class Station {
    BASE = getConfigVar('LAN_WX_API')

    get = async (icao: string) => {
        const url = `${this.BASE}/station/${icao}`
        const station = await request(url)
        return station
    }
}

import { getConfigVar, request } from '../../utils'
import type { Coords } from '../../types/location'

export default class Location {
    BASE = getConfigVar('LAN_WX_API')

    getLocation = (): Promise<{ coords: Coords }> => {
        const { geolocation } = navigator
        return new Promise((res, rej) => {
            return geolocation.getCurrentPosition(res, rej)
        })
    }

    geocode = async (location: string): Promise<Coords> => {
        const url = `${this.BASE}/location/geocode?q=${location}`
        return await request(url)
    }
}
